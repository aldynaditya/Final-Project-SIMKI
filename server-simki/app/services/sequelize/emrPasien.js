const EMRPasien = require('../../api/v1/emrPasien/model');
const Appointment = require('../../api/v1/appointment/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Episode = require('../../api/v1/episode/model');
const Schedule = require('../../api/v1/schedule/model');
const Transaksi = require('../../api/v1/transaksi/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const OrderObat = require('../../api/v1/orderObat/model');
const OrderProsedur = require('../../api/v1/orderProsedur/model');
const OrderSurat = require('../../api/v1/orderSurat/model');
const SuratSakit = require('../../api/v1/suratSakit/model');
const SuratRujukan = require('../../api/v1/suratRujukan/model');
const Obat = require('../../api/v1/obat/model');
const Item = require('../../api/v1/item/model');
const { 
    BadRequestError, 
    NotFoundError, 
    UnauthorizedError 
} = require('../../errors');
const { generateInvoiceNumber } = require('../../utils');
const validTindakanValues = ['obat', 'prosedur', 'surat'];

const getAllEMRPasien = async ( req ) => {
    const { role, nama } = req.user;
    const query = req.query;

    let whereClause = {};
    if (role === 'dokter') {
        whereClause = {
            '$appointment.schedule.user_klinik.nama$': nama,
            ...query,
        };
    } else if (role === 'perawat') {
        whereClause = { ...query };
    } else if (role === 'resepsionis') {
        whereClause = { ...query };
    } else {
        throw new UnauthorizedError('User role is not authorized to fetch EMRPasien.');
    }

    const emrPasienData = await EMRPasien.findAll({
        include: [
            {
                model: Appointment,
                as: 'appointment',
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
                            as: 'user_klinik',
                        }
                    }
                ]
            }
        ],
        where: whereClause
    });

    const result = emrPasienData.map(emr => {
        const appointment = emr.appointment;
        return {
            noEMR: emr.noEMR,
            nama_pasien: appointment.datapasien.nama_lengkap,
            tanggal_lahir: appointment.datapasien.tanggal_lahir,
            jenis_kelamin: appointment.datapasien.jenis_kelamin,
            gol_darah: appointment.datapasien.gol_darah,
            pemeriksa: appointment.schedule.user_klinik.nama,
            poli: appointment.schedule.poli
        };
    });

    return result;
};

const createVitalSignbyPerawat = async ( req ) => {
    const emrPasienId = req.params.id;
    const { riwayatPenyakit, subjective, TD, indeks, detak, suhu, napas, objective, assessment, plan } = req.body;

    const invoiceNumber = await generateInvoiceNumber(emrPasienId);

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
        invoiceNumber
    });

    return result;
}

const updateEpisode = async ( req ) => {
    const { id } = req.params;
    const { riwayatPenyakit, subjective, objective, assessment, plan } = req.body;

    const previousEpisode = await Episode.findByPk(id);
    if (!previousEpisode) throw new NotFoundError('Previous episode not found');

    const result = await Episode.update({
            riwayatPenyakit,
            subjective,
            objective,
            assessment,
            plan,
        },
        { where: { uuid: id } }
    );

    return result;
}

const createEpisode = async ( req ) => {
    const emrPasienId = req.params.id;
    const { riwayatPenyakit, subjective, TD, indeks, detak, suhu, napas, objective, assessment, plan } = req.body;

    const invoiceNumber = await generateInvoiceNumber(emrPasienId);

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
        invoiceNumber
    });

    return result;
}

const updateAction = async (req) => {
    const { id } = req.params;
    const { tindakan } = req.body;

    if (!Array.isArray(tindakan) || tindakan.some(item => !validTindakanValues.includes(item))) throw new BadRequestError(`the values is wrong`);

    const previousEpisode = await Episode.findByPk(id);
    if (!previousEpisode) throw new NotFoundError('Previous episode not found');

    const filteredTindakan = previousEpisode.tindakan.filter(item => item !== 'none');

    const updatedTindakan = [...new Set([...filteredTindakan, ...tindakan])];

    await previousEpisode.update({
        tindakan: updatedTindakan
    });

    return previousEpisode;
}

const finishOrder = async (req) => {
    const { id } = req.params;
    const ordersObat = await OrderObat.findAll({
        where: { episodeId: id },
        include: {
            model: Obat,
            as: 'dataobat',
        }
    });
    const ordersProsedur = await OrderProsedur.findAll({
        where: { episodeId: id },
        include: {
            model: Item,
            as: 'dataitem',
        }
    });

    if (!ordersObat.length && !ordersProsedur.length) {
        throw new NotFoundError('No orders found for the provided episodeId');
    }

    let total = 0;
    ordersObat.forEach(order => total += parseFloat(order.total));
    ordersProsedur.forEach(order => total += parseFloat(order.total));

    const transaksi = await Transaksi.create({
        episodeId: id,
        total,
        userId: req.user.id
    });

    const episode = await Episode.findOne({
        where: { uuid: id },
    });

    if (!episode) {
        throw new NotFoundError('episode tidak ditemukan');
    }

    const emrpasienId = episode.emrPasienId;

    await EMRPasien.update({ 
        status: 'finished',
        finishedAt: new Date(),
    }, { where: { uuid: emrpasienId } });

    return transaksi;
};

const getAllMedicalRecord = async (req) => {
    const { id: noEMR } = req.params;

    const emr = await EMRPasien.findAll({
        where: { noEMR },
        include: [
            {
                model: Appointment,
                as: 'appointment',
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
                            as: 'user_klinik',
                        }
                    }
                ]
            },
            {
                model: Episode
            }
        ],
    });

    if (emr.length === 0) {
        throw new NotFoundError(`Tidak ada rekam medis dengan noEMR: ${noEMR}`);
    }

    const result = emr.map(emr => {
        const appointment = emr.appointment;
        const episode= emr.episodes[0]
        return {
            tanggal: appointment.tanggal,
            pemeriksa: appointment.schedule.user_klinik.nama,
            subjective: episode.subjective,
            objective: episode.objective,
            assessment: episode.assessment,
            plan: episode.plan,
            tindakan: episode.tindakan,
        };
    });

    return result;
};

const findOneMedicalRecord = async (req) => {
    const { id: uuid } = req.params;

    const emr = await EMRPasien.findOne({
        where: { uuid },
        include: [
            {
                model: Appointment,
                as: 'appointment',
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
                            as: 'user_klinik',
                        }
                    }
                ]
            },
            {
                model: Episode
            }
        ],
    });

    if (!emr) {
        throw new NotFoundError(`Tidak ada rekam medis dengan uuid: ${uuid}`);
    }

    const appointment = emr.appointment;
    const episode = emr.episodes[0]; // Ambil episode pertama, bisa disesuaikan sesuai kebutuhan

    const result = {
        noEMR: emr.noEMR,
        nama_pasien: appointment.datapasien.nama_lengkap,
        tanggal_lahir: appointment.datapasien.tanggal_lahir,
        jenis_kelamin: appointment.datapasien.jenis_kelamin,
        gol_darah: appointment.datapasien.gol_darah,
        alergi: episode.alergi,
        tangga: appointment.tanggal,
        penjamin: appointment.penjamin,
        pemeriksa: appointment.schedule.user_klinik.nama,
        poli: appointment.schedule.poli,
        riwayatPenyakit: episode.riwayatpenyakit,
        subjective: episode.subjective,
        td: episode.TD,
        indeks: episode.indeks,
        detak: episode.detak,
        suhu: episode.suhu,
        napas: episode.napas,
        objective: episode.objective,
        assessment: episode.assessment,
        plan: episode.plan,
        tindakan: episode.tindakan,
    };

    return result;
};

module.exports = {
    getAllEMRPasien,
    getAllMedicalRecord,
    findOneMedicalRecord,
    createVitalSignbyPerawat,
    updateEpisode,
    createEpisode,
    updateAction,
    finishOrder
};
