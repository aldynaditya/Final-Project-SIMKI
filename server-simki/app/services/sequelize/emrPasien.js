const EMRPasien = require('../../api/v1/emrPasien/model');
const Appointment = require('../../api/v1/appointment/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Schedule = require('../../api/v1/schedule/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../errors');

const getAllEMRPasien = async (req, res, next) => {
    let emrPasienData;

    if (req.user.role === 'dokter') {
        emrPasienData = await EMRPasien.findAll({
            include: {
                model: Appointment,
                include: {
                    model: Schedule,
                    include: {
                        model: UserKlinik,
                        as: 'user_klinik',
                        where: {
                            name: req.user.name
                        }
                    }
                }
            }
        });
    } else if (req.user.role === 'perawat') {
        emrPasienData = await EMRPasien.findAll();
    }

    return emrPasienData;
};

module.exports = {
    getAllEMRPasien,
};
