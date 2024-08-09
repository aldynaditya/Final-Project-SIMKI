const Appointment = require('../../api/v1/appointment/model');
const Schedule = require('../../api/v1/schedule/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const EMRPasien = require('../../api/v1/emrPasien/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const { 
    getDayOfWeek,
    generateNoEMR,
    validateTimeFormat,
} = require('../../utils');
const { 
    BadRequestError, 
    NotFoundError 
} = require('../../errors');

const getAllAppointment = async () => {
    const appointment = await Appointment.findAll({
        include: [
            {
                model: DataPasien,
                as: 'datapasien',
                attributes: ['nik', 'nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'gol_darah', 'kewarganegaraan', 'alamat']
            },
            {
                model: Schedule,
                as: 'schedule', 
                attributes: ['hari', 'poli'],
                include: {
                    model: UserKlinik,
                    attributes: ['nama'],
                    as: 'user_klinik'
                },
            },
        ]
    });

    const result = appointment.map(appointment => {
        const datapasien = appointment.datapasien;
        const schedule = appointment.schedule;

        return {
            id: appointment.uuid,
            nama_lengkap: datapasien.nama_lengkap,
            nama_dokter: schedule.user_klinik.nama,
            poli: schedule.poli,
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
    const { tanggal, keluhan, penjamin, dokter, poli, start_time, end_time, nik } = req.body;

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
                    nama: dokter,
                },
                attributes: ['nama'],
            },
        ],
    });

    if (!schedule) {
        throw new NotFoundError('Tidak ada Dokter yang tersedia pada tanggal itu');
    }

    const formattedStartTime = validateTimeFormat(start_time);
    const formattedEndTime = validateTimeFormat(end_time);

    if (formattedStartTime < schedule.start_time || formattedEndTime > schedule.end_time) {
        throw new Error('Waktu janji tidak sesuai dengan jadwal dokter');
    }

    const result = await Appointment.create({
        tanggal,
        keluhan,
        penjamin,
        pasienId: dataPasien.uuid,
        scheduleId: schedule.uuid,
        start_time: formattedStartTime,
        end_time: formattedEndTime
    });

    return result;
};

const updateAppointment = async (req) => {
    const { id } = req.params;
    const { status, keterangan } = req.body;

    const appointment = await Appointment.findOne({
        where: {
            uuid: id,
        },
    });

    if (!appointment) {
        throw new NotFoundError(`Tidak ada Appointment dengan id : ${id}`);
    }

    if (status === 'diterima') {
        let emrData;
        let noEMR;

        if (appointment.pasienId) {
            const existingEMR = await EMRPasien.findOne({
                where: {
                    pasienId: appointment.pasienId,
                },
            });

            if (existingEMR) {
                noEMR = existingEMR.noEMR;
            } else {
                noEMR = await generateNoEMR(); // Panggil generateNoEMR secara asynchronous
            }

            emrData = await EMRPasien.create({
                appointmentId: id,
                noEMR: noEMR,
                pasienId: appointment.pasienId,
            });
        } else {
            throw new BadRequestError('PasienId is not set in the appointment');
        }

        await Appointment.update(
            { status, keterangan },
            { where: { uuid: id }}
        );

        return emrData;
    } else {
        const result = await Appointment.update(
            { status, keterangan },
            { where: { uuid: id }}
        );
        
        return result;
    }
};

module.exports = {
    getAllAppointment,
    createAppointment,
    updateAppointment
};
