const EMRPasien = require('../../api/v1/emrPasien/model');
const Appointment = require('../../api/v1/appointment/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Pasien = require('../../api/v1/pasien/model');
const Episode = require('../../api/v1/episode/model');
const Schedule = require('../../api/v1/schedule/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const { 
    BadRequestError, 
    NotFoundError, 
    UnauthorizedError 
} = require('../../errors');

const getAllEMRPasien = async (req, res, next) => {
    let emrPasienData;

    if (req.user.role === 'dokter') {
        emrPasienData = await EMRPasien.findAll({
            include: [
                {
                    model: Appointment,
                    include: [
                        {
                            model: Schedule,
                            include: {
                                model: UserKlinik,
                                as: 'user_klinik',
                                where: {
                                    name: req.user.name
                                }
                            }
                        },
                        {
                            model: Pasien,
                            attributes: { exclude: ['password', 'role', 'status', 'otp', 'createdAt', 'updatedAt'] },
                            include: {
                                model: DataPasien,
                            }
                        },
                        {
                            model: DataPasien,
                            as: 'manualDataPasien',
                        }
                    ]
                }
            ],
            where: {
                '$appointment.schedule.user_klinik.name$': req.user.name // Filter by doctor's name
            }
        });
    } else if (req.user.role === 'perawat') {
        emrPasienData = await EMRPasien.findAll({
            include: [
                {
                    model: Appointment,
                    include: [
                        {
                            model: Schedule,
                            include: {
                                model: UserKlinik,
                                as: 'user_klinik',
                            }
                        },
                        {
                            model: Pasien,
                            attributes: { exclude: ['password', 'role', 'status', 'otp', 'createdAt', 'updatedAt'] },
                            include: {
                                model: DataPasien,
                            }
                        },
                        {
                            model: DataPasien,
                            as: 'manualDataPasien',
                        }
                    ]
                }
            ]
        });
    }

    const result = emrPasienData.map(emr => {
        const appointment = emr.appointment;
        const pasien = appointment ? (appointment.pasien || appointment.manualDataPasien) : null;
        const dataPasien = pasien ? pasien.data_pasien : null;
        const manualData = appointment.manualDataPasien || {};

        return {
            noEMR: emr.noEMR,
            nama_pasien: dataPasien ? dataPasien.nama_lengkap : manualData.nama_lengkap,
            tanggal_lahir: dataPasien ? dataPasien.tanggal_lahir : manualData.tanggal_lahir,
            jenis_kelamin: dataPasien ? dataPasien.jenis_kelamin : manualData.jenis_kelamin,
            gol_darah: dataPasien ? dataPasien.gol_darah : manualData.gol_darah,
            pemeriksa: appointment.schedule ? appointment.schedule.user_klinik.name : null,
            poli: appointment.schedule ? appointment.schedule.poli : null
        };
    });

    return result;
};

module.exports = {
    getAllEMRPasien,
};
