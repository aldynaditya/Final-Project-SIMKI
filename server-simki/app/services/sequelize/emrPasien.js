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

const getAllEMRPasien = async ( req ) => {
    const { role, name } = req.user;
    const query = req.query;

    let whereClause = {};
    if (role === 'dokter') {
        whereClause = {
            '$appointment.schedule.user_klinik.name$': name,
            ...query,
        };
    } else if (role === 'perawat') {
        whereClause = { ...query };
    } else {
        throw new UnauthorizedError('User role is not authorized to fetch EMRPasien.');
    }

    const emrPasienData = await EMRPasien.findAll({
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
        ],
        where: whereClause
    });

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

const createVitalSignbyPerawat = async ( req ) => {
    const emrPasienId = req.params.id;
    const { riwayatPenyakit, subjective, TD, indeks, detak, suhu, napas, objective, assessment, plan } = req.body;

    const result = await Episode.create({
        emrPasienId,
        riwayatPenyakit,
        subjective,
        TD,
        indeks,
        detak,
        suhu,
        napas,
        objective,
        assessment,
        plan,
    });

    return result;
}

const updateEpisode = async ( req ) => {
    const { id } = req.params;
    const { riwayatPenyakit, subjective, objective, assessment, plan } = req.body;

    const previousEpisode = await Episode.findByPk(id);
    if (!previousEpisode) {
        throw new Error('Previous episode not found');
    }

    const result = await Episode.update({
            riwayatPenyakit,
            subjective,
            objective,
            assessment,
            plan,
        },
        { where: { uuid: id } } // Atur kondisi where menggunakan uuid
    );

    return result;
}

const createEpisode = async ( req ) => {
    const emrPasienId = req.params.id;
    const { riwayatPenyakit, subjective, TD, indeks, detak, suhu, napas, objective, assessment, plan } = req.body;

    const result = await Episode.create({
        emrPasienId,
        riwayatPenyakit,
        subjective,
        TD,
        indeks,
        detak,
        suhu,
        napas,
        objective,
        assessment,
        plan,
    });

    return result;
}

const updateOrder = async ( req ) => {
    const { id } = req.params;
    const { tindakan } = req.body;

    const previousEpisode = await Episode.findByPk(id);
    if (!previousEpisode) {
        throw new Error('Previous episode not found');
    }

    const result = await Episode.update({
            tindakan
        },
        { where: { uuid: id } } // Atur kondisi where menggunakan uuid
    );

    return result;
}

module.exports = {
    getAllEMRPasien,
    createVitalSignbyPerawat,
    updateEpisode,
    createEpisode,
    updateOrder
};
