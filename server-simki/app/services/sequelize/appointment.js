const Appointment = require('../../api/v1/appointment/model');
const Schedule = require('../../api/v1/schedule/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const EMRPasien = require('../../api/v1/emrPasien/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const { getDayOfWeek } = require('../../utils/ConvertDatetoDay');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllAppointment = async (req) => {
    const appointment = await Appointment.findAll({
        include: [
            {
                model: DataPasien,
                as: 'datapasien',
                attributes: ['nik', 'nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'gol_darah', 'suku_bangsa', 'alamat']
            },
            {
                model: Schedule, 
                attributes: ['hari', 'poli'],
                include: {
                    model: UserKlinik,
                    attributes: ['name'],
                    as: 'user_klinik'
                },
            },
        ]
    });

    const result = appointment.map(appointment => {
        const pasienData = appointment.pasien ? appointment.pasien.data_pasien : null;
        const manualData = appointment.manualDataPasien || {};

        return {
            nama_lengkap: pasienData ? pasienData.nama_lengkap : manualData.nama_lengkap,
            nama_dokter: appointment.schedule ? appointment.schedule.user_klinik.name : null,
            poli: appointment.schedule ? appointment.schedule.poli : null,
            tanggal: appointment.tanggal,
            keluhan: appointment.keluhan,
            penjamin: appointment.penjamin,
            status: appointment.status,
            keterangan: appointment.keterangan,
        };
    });

    return result;
};

const createAppointment = async (req) => {
    const { dokter, poli, tanggal, keluhan, nik, penjamin } = req.body;

    let dataPasien = await DataPasien.findOne({
        where: { nik }
    });

    if (!dataPasien) {
        throw new BadRequestError('Tidak Ada Pasien yang terdaftar dengan NIK tersebut');
    }

    const dayOfWeek = getDayOfWeek(tanggal);
    const schedule = await Schedule.findOne({
        where: {
            hari: dayOfWeek,
            status: 'ada',
            poli
        },
        include: [
            {
                model: UserKlinik,
                as: 'user_klinik',
                where: {
                    name: dokter,
                },
                attributes: ['name'],
            },
        ],
    });

    if (!schedule) {
        throw new NotFoundError('Tidak ada Dokter yang tersedia pada tanggal itu');
    }

    const result = await Appointment.create({
        tanggal,
        keluhan,
        penjamin,
        pasienId: dataPasien.uuid,
        scheduleId: schedule.uuid
    });

    return result;
};

const updateAppointment = async (req) => {
    const { id } = req.params;
    const { status, keterangan } = req.body;

    const check = await Appointment.findOne({
        where: {
            uuid: id,
        },
    });
    
    if (!check) throw new NotFoundError(`Tidak ada Appointment dengan id :  ${id}`);
    
    // Jika status 'diterima', tambahkan data ke EMRPasien
    if (status === 'diterima') {
        await Appointment.update(
            { status, keterangan },
            { where: { uuid: id }}
        );
        const emrData = await EMRPasien.create({ appointmentId: id });
        return emrData;
    }

    // Jika status tidak 'diterima', update Appointment
    const result = await Appointment.update(
        { status, keterangan },
        { where: { uuid: id }}
    );

    return result;
};

module.exports = {
    getAllAppointment,
    createAppointment,
    updateAppointment
};
