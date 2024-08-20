const { Op, Sequelize } = require('sequelize');
const EMRPasien = require('../../api/v1/emrPasien/model');
const Appointment = require('../../api/v1/appointment/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Episode = require('../../api/v1/episode/model');
const Schedule = require('../../api/v1/schedule/model');
const Transaksi = require('../../api/v1/transaksi/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const OrderObat = require('../../api/v1/orderObat/model');
const OrderProsedur = require('../../api/v1/orderProsedur/model');
const Obat = require('../../api/v1/obat/model');
const Item = require('../../api/v1/item/model');
const { 
    BadRequestError, 
    NotFoundError, 
    UnauthorizedError 
} = require('../../errors');
const { 
    generateInvoiceNumber 
} = require('../../utils');
const validTindakanValues = ['obat', 'prosedur', 'surat'];

const getQueue = async ( req ) => {
    const { role, nama } = req.user;
    const query = req.query;

    let whereClause = {};
    if (role === 'dokter') {
        whereClause = {
            '$appointment.schedule.user_klinik.nama$': nama,
            status: 'active',
            ...query,
        };
    } else if (role === 'perawat') {
        whereClause = { 
            ...query,
            status: 'active',
        };
    } else if (role === 'resepsionis') {
        whereClause = {
            ...query,
            status: 'active',
        };
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
            id: emr.uuid,
            noEMR: emr.noEMR,
            nama_pasien: appointment.datapasien.nama_lengkap,
            tanggal_lahir: appointment.datapasien.tanggal_lahir,
            jenis_kelamin: appointment.datapasien.jenis_kelamin,
            gol_darah: appointment.datapasien.gol_darah,
            pemeriksa: appointment.schedule.user_klinik.nama,
            poli: appointment.schedule.poli,
            status: emr.status
        };
    });

    return result;
};

const createVitalSignbyPerawat = async ( req ) => {
    const emrPasienId = req.params.id;
    const { alergi, riwayat_penyakit, subjective, TD, indeks, detak, suhu, napas, objective, assessment, plan } = req.body;

    const invoiceNumber = await generateInvoiceNumber(emrPasienId);

    const result = await Episode.create({
        emrPasienId,
        alergi,
        riwayat_penyakit,
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

const getVitalSignbyDoctor = async (req) => {
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

    const episode = emr.episode

    const result = {
        emrPasienId: emr.uuid,
        id: episode.uuid,
        alergi: episode.alergi,
        riwayat_penyakit: episode.riwayat_penyakit,
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

const updateEpisode = async ( req ) => {
    const { id } = req.params;
    const { riwayat_penyakit, subjective, objective, assessment, plan } = req.body;

    const previousEpisode = await Episode.findByPk(id);
    if (!previousEpisode) throw new NotFoundError('Previous episode not found');

    const result = await Episode.update({
            riwayat_penyakit,
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
    const { alergi, riwayat_penyakit, subjective, TD, indeks, detak, suhu, napas, objective, assessment, plan } = req.body;

    const invoiceNumber = await generateInvoiceNumber(emrPasienId);

    const result = await Episode.create({
        alergi,
        emrPasienId,
        riwayat_penyakit,
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

const finishOrder = async (req, res) => {
    const { id } = req.params;

    const [ordersObat, ordersProsedur] = await Promise.all([
        OrderObat.findAll({
            where: { episodeId: id },
            include: {
                model: Obat,
                as: 'dataobat',
            }
        }),
        OrderProsedur.findAll({
            where: { episodeId: id },
            include: {
                model: Item,
                as: 'dataitem',
            }
        })
    ]);

    const episode = await Episode.findOne({
        where: { uuid: id },
        include: {
            model: EMRPasien,
            as: 'emrpasien',
            include: {
                model: Appointment,
                as: 'appointment',
                include: {
                    model: Schedule,
                    as: 'schedule',
                    attributes: ['poli'],
                }
            }
        }
    });

    if (!episode) {
        throw new NotFoundError('Episode tidak ditemukan');
    }

    const poli = episode.emrpasien.appointment.schedule.poli;
    const tindakanArray = episode.tindakan;

    const keteranganItems = tindakanArray.filter(item => item !== 'none');
    const keterangan = keteranganItems.length > 0 ? keteranganItems.join(', ') : 'konsultasi';

    const total_order = [...ordersObat, ...ordersProsedur].reduce((acc, order) => acc + parseFloat(order.total), 0);

    const doctorFee = poli === 'Umum' ? 30000 : poli === 'Gigi' ? 50000 : 0;

    const total = total_order + doctorFee;

    const transaksi = await Transaksi.create({
        episodeId: id,
        total_order,
        total,
        keterangan,
        userKlinikId: req.user.id,
    });

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
        where: { 
            noEMR,
            status: 'finished'
        },
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
        const episode= emr.episode
        return {
            id: emr.uuid,
            tanggal: appointment.tanggal || ' ',
            pemeriksa: appointment.schedule.user_klinik.nama || ' ',
            subjective: episode.subjective || ' ',
            objective: episode.objective || ' ',
            assessment: episode.assessment || ' ',
            plan: episode.plan || ' ',
            tindakan: episode.tindakan || ' ',
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
    const episode = emr.episode;

    const result = {
        emrPasienId: emr.uuid,
        id: episode.uuid || ' ',
        noEMR: emr.noEMR || ' ',
        nama_pasien: appointment.datapasien.nama_lengkap || ' ',
        tanggal_lahir: appointment.datapasien.tanggal_lahir || ' ',
        jenis_kelamin: appointment.datapasien.jenis_kelamin || ' ',
        gol_darah: appointment.datapasien.gol_darah || ' ',
        alergi: episode.alergi || ' ',
        tanggal: appointment.tanggal || ' ',
        penjamin: appointment.penjamin || ' ',
        pemeriksa: appointment.schedule.user_klinik.nama || ' ',
        poli: appointment.schedule.poli || ' ',
        riwayat_penyakit: episode.riwayat_penyakit || ' ',
        subjective: episode.subjective || ' ',
        td: episode.TD || ' ',
        indeks: episode.indeks || ' ',
        detak: episode.detak || ' ',
        suhu: episode.suhu || ' ',
        napas: episode.napas || ' ',
        objective: episode.objective || ' ',
        assessment: episode.assessment || ' ',
        plan: episode.plan || ' ',
        tindakan: episode.tindakan || ' ',
    };

    return result;
};

const getDataEMRbyId = async (req) => {
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

    const result = {
        id: emr.uuid,
        noEMR: emr.noEMR,
        nama_pasien: appointment.datapasien.nama_lengkap,
        tanggal_lahir: appointment.datapasien.tanggal_lahir,
        jenis_kelamin: appointment.datapasien.jenis_kelamin,
        gol_darah: appointment.datapasien.gol_darah,
        tanggal: appointment.tanggal,
        penjamin: appointment.penjamin,
        pemeriksa: appointment.schedule.user_klinik.nama,
        poli: appointment.schedule.poli,
    };

    return result;
};

const getListALlEMRPasien = async (req) => {
    const distinctNoEMRList = await EMRPasien.findAll({
        attributes: [
            [Sequelize.fn('DISTINCT', Sequelize.col('noEMR')), 'noEMR']
        ]
    });

    const noEMRValues = distinctNoEMRList.map(item => item.noEMR);

    const emrPasienList = await Promise.all(
        noEMRValues.map(async (noEMR) => {
            return await EMRPasien.findOne({
                where: {
                    noEMR
                },
                order: [
                    ['createdAt', 'DESC']
                ],
                attributes: [
                    'uuid',
                    'noEMR',
                    'appointmentId',
                    'pasienId',
                    'status',
                    'finishedAt'
                ],
                include: [
                    {
                        model: Appointment,
                        as: 'appointment',
                        include: [
                            {
                                model: DataPasien,
                                as: 'datapasien',
                                attributes: ['nama_lengkap', 'tanggal_lahir', 'jenis_kelamin']
                            }
                        ]
                    }
                ]
            });
        })
    );

    const result = emrPasienList.map(emr => {
        const appointment = emr.appointment;
        const datapasien = appointment ? appointment.datapasien : null;
        return {
            id: emr.uuid,
            noEMR: emr.noEMR,
            appointmentId: emr.appointmentId,
            pasienId: emr.pasienId,
            status: emr.status,
            finishedAt: emr.finishedAt,
            nama_pasien: datapasien ? datapasien.nama_lengkap : null,
            tanggal_lahir: datapasien ? datapasien.tanggal_lahir : null,
            jenis_kelamin: datapasien ? datapasien.jenis_kelamin : null
        };
    });

    return result;
}

module.exports = {
    getQueue,
    getAllMedicalRecord,
    findOneMedicalRecord,
    createVitalSignbyPerawat,
    getVitalSignbyDoctor,
    updateEpisode,
    createEpisode,
    updateAction,
    finishOrder,
    getDataEMRbyId,
    getListALlEMRPasien
};
