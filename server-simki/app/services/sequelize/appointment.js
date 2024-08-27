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
        where: { status: 'diproses'},
        include: [
            {
                model: DataPasien,
                as: 'datapasien',
            },
            {
                model: Schedule,
                as: 'schedule', 
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
        const startTime = schedule.start_time.slice(0, 5);
        const endTime = schedule.end_time.slice(0, 5);

        return {
            id: appointment.uuid,
            nama_lengkap: datapasien.nama_lengkap,
            nama_dokter: schedule.user_klinik.nama,
            poli: schedule.poli,
            tanggal: appointment.tanggal,
            jam: `${startTime}-${endTime}`,
            keluhan: appointment.keluhan,
            penjamin: appointment.penjamin,
            status: appointment.status,
            keterangan: appointment.keterangan,
        };
    });

    return result;
};

const getOneDataPasien = async (req) => {
    const { id: uuid } = req.params

    const appointment = await Appointment.findOne({
        where: { uuid }
    })

    if (!appointment) throw new NotFoundError('Data tidak ditemukan');

    const datapasien = await DataPasien.findOne({
        where: { uuid: appointment.pasienId}
    })

    return datapasien;
}

const createAppointment = async (req) => {
    const { id: uuid } = req.params
    const { tanggal, keluhan, penjamin, dokter, poli, start_time, end_time } = req.body;

    const appointmentDate = new Date(tanggal);

    let dataPasien = await DataPasien.findOne({
        where: { uuid }
    });

    if (!dataPasien) {
        throw new BadRequestError('Pasien Tidak terdaftar');
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

    const existingAppointments = await Appointment.findAll({
        where: {
            pasienId: dataPasien.uuid,
            tanggal: appointmentDate
        },
        include: {
            model: Schedule,
            as: 'schedule',
        }
    });

    const hasConflict = existingAppointments.some(appointment => {
        const existingStart = appointment.schedule.start_time;
        const existingEnd = appointment.schedule.end_time;

        return (formattedStartTime < existingEnd && formattedEndTime > existingStart);
    });

    if (hasConflict) {
        throw new Error('Ada janji temu yang bertabrakan dengan waktu yang dipilih');
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
                noEMR = await generateNoEMR();
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
    getOneDataPasien,
    createAppointment,
    updateAppointment
};
