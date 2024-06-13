const { Op } = require('sequelize');
const Appointment = require('../../api/v1/appointment/model');
const Schedule = require('../../api/v1/schedule/model');
const Pasien = require('../../api/v1/pasien/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const { getDayOfWeek } = require('../functionConvert');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllAppointment = async (req) => {
    const appointment = await Appointment.findAll({
        include: [
            {
                model: Pasien,
                attributes: { exclude: ['password', 'role', 'status', 'otp', 'createdAt', 'updatedAt'] },
                include: {
                    model: DataPasien,
                    attributes: ['nik', 'nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'gol_darah', 'suku_bangsa', 'alamat']
                }
            },
            {
                model: DataPasien,
                as: 'manualDataPasien', // Using alias to differentiate between online and manual registration
                attributes: ['nik', 'nama_lengkap', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'gol_darah', 'suku_bangsa', 'alamat']
            }
        ]
    });

    const result = appointment.map(appointment => {
        const pasienData = appointment.pasien ? appointment.pasien.data_pasien : null;
        const manualData = appointment.manualDataPasien || {};

        return {
            uuid: appointment.uuid,
            tanggal: appointment.tanggal,
            keluhan: appointment.keluhan,
            status: appointment.status,
            keterangan: appointment.keterangan,
            email: appointment.pasien ? appointment.pasien.email : null,
            nik: pasienData ? pasienData.nik : manualData.nik,
            nama_lengkap: pasienData ? pasienData.nama_lengkap : manualData.nama_lengkap,
            tempat_lahir: pasienData ? pasienData.tempat_lahir : manualData.tempat_lahir,
            tanggal_lahir: pasienData ? pasienData.tanggal_lahir : manualData.tanggal_lahir,
            jenis_kelamin: pasienData ? pasienData.jenis_kelamin : manualData.jenis_kelamin,
            gol_darah: pasienData ? pasienData.gol_darah : manualData.gol_darah,
            suku_bangsa: pasienData ? pasienData.suku_bangsa : manualData.suku_bangsa,
            alamat: pasienData ? pasienData.alamat : manualData.alamat,
        };
    });

    return result;
};

const createAppointment = async (req) => {
    const { tanggal, keluhan, ...dataPasienAttributes } = req.body;
    
    // Membuat data pasien baru
    const dataPasien = await DataPasien.create(dataPasienAttributes);

    // Menggunakan UUID dari data pasien baru sebagai pasienId
    const userId = dataPasien.uuid;

    // Mencari jadwal berdasarkan hari dari tanggal yang dimasukkan
    const dayOfWeek = getDayOfWeek(tanggal);
    const schedule = await Schedule.findOne({
        where: {
            hari: dayOfWeek,
            status: 'ada'
        }
    });

    if (!schedule) {
        throw new NotFoundError('Tidak ada Dokter yang tersedia pada tanggal itu');
    }
    // Membuat appointment baru dengan menggunakan data pasien yang baru dibuat
    const result = await Appointment.create({
        tanggal,
        keluhan,
        userId,
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
