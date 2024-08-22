const Appointment = require('../../api/v1/appointment/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const EMRPasien = require('../../api/v1/emrPasien/model');
const Episode = require('../../api/v1/episode/model');
const Transaksi = require('../../api/v1/transaksi/model');
const OrderObat = require('../../api/v1/orderObat/model');
const OrderProsedur = require('../../api/v1/orderProsedur/model');
const Obat = require('../../api/v1/obat/model');
const Item = require('../../api/v1/item/model');
const { 
    NotFoundError, 
} = require('../../errors');
const { Op } = require('sequelize');

const getAllOrders = async () => {
    const order = await Transaksi.findAll({
        include: [
            {
                model: Episode,
                as: 'episode',
                include: {
                    model: EMRPasien,
                    as: 'emrpasien',
                    include: {
                        model: Appointment,
                        include: {
                            model: DataPasien,
                            as: 'datapasien',
                            attributes: ['nama_lengkap']
                        }
                    }
                }
            },
            {
                model: UserKlinik,
                as: 'user',
            }
        ]
    });

    const result = order.map(transaksi => {
        const episode = transaksi.episode;
        const emr = episode.emrpasien;
        const appointment = emr.appointment;
        const datapasien = appointment.datapasien;

        return{
            id: transaksi.uuid,
            noInvoice: episode.invoiceNumber,
            tanggal: appointment.tanggal,
            noEMR: emr.noEMR,
            namaPasien: datapasien.nama_lengkap,
            penjamin: appointment.penjamin,
            metodeBayar: transaksi.metode_bayar,
            status: transaksi.status,
            total: transaksi.total,
            petugas: transaksi.user.nama
        }
    });

    return result;
};

const getOrderDetails = async (req) => {
    const { id } = req.params;

    const transaksi = await Transaksi.findOne({ where: { uuid: id }});
    if (!transaksi) throw new NotFoundError('Transaksi tidak ditemukan');

    const episodeId = transaksi.episodeId;

    const [ordersObat, ordersProsedur] = await Promise.all([
        OrderObat.findAll({
            where: { episodeId },
            include: [
                {
                    model: Obat,
                    as: 'dataobat'
                }
            ]
        }),
        OrderProsedur.findAll({
            where: { episodeId },
            include: [
                {
                    model: Item,
                    as: 'dataitem'
                }
            ]
        })
    ]);

    const result = {
        transaksi: {
            uuid: transaksi.uuid,
            episodeId: transaksi.episodeId,
            total: transaksi.total,
            metodeBayar: transaksi.metodeBayar,
            status: transaksi.status,
            userKlinikId: transaksi.userKlinikId,
            createdAt: transaksi.createdAt
        },
        ordersObat: ordersObat.map(order => ({
            uuid: order.uuid,
            kuantitas: order.kuantitas,
            dosis: order.dosis,
            catatan: order.catatan,
            total: order.total,
            obat: {
                nama: order.dataobat.nama_obat,
                kode: order.dataobat.kode_obat
            }
        })),
        ordersProsedur: ordersProsedur.map(order => ({
            uuid: order.uuid,
            kuantitas: order.kuantitas,
            dosis: order.dosis,
            catatan: order.catatan,
            total: order.total,
            item: {
                nama: order.dataitem.nama_item,
                kode: order.dataitem.kode_item
            }
        }))
    };

    return result;
};

const updateTransaction = async (req) => {
    const { id } = req.params;
    const { metode_bayar, diskon, keterangan } = req.body;

    const transaction = await Transaksi.findByPk(id);
    if (!transaction) throw new NotFoundError('Transaksi tidak ditemukan');

    const totalAfterDiscount = transaction.total - (transaction.total * (diskon / 100));

    const transaksi = await Transaksi.update({
        metode_bayar,
        diskon,
        keterangan,
        total: totalAfterDiscount,
        status: 'Completed',
        userKlinikId: req.user.id
    }, {
        where: { uuid: id },
        returning: true
    });

    return transaksi;
};

const filterAllTransactionByPeriod = async (req) => {
    const { startDate, endDate } = req.query;

    const adjustedEndDate = new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000);

    const transaksi = await Transaksi.findAll({
        where: {
            createdAt: {
                [Op.between]: [new Date(startDate), adjustedEndDate]
            },
            status: 'Completed'
        },
        include: [
            {
                model: Episode,
                as: 'episode',
                include: {
                    model: EMRPasien,
                    as: 'emrpasien',
                    include: {
                        model: Appointment,
                        include: {
                            model: DataPasien,
                            as: 'datapasien',
                            attributes: ['nama_lengkap']
                        }
                    }
                }
            },
            {
                model: UserKlinik,
                as: 'user',
            }
        ]
    });

    if (transaksi.length === 0) {
        throw new NotFoundError('Tidak ada transaksi pada periode tersebut.');
    }

    const result = transaksi.map(transaksi => {
        const episode = transaksi.episode;
        const emr = episode.emrpasien;
        const appointment = emr.appointment;
        const datapasien = appointment.datapasien;

        return{
            id: transaksi.uuid,
            noInvoice: episode.invoiceNumber,
            tanggal: transaksi.createdAt,
            noEMR: emr.noEMR,
            namaPasien: datapasien.nama_lengkap,
            penjamin: appointment.penjamin,
            metodeBayar: transaksi.metodeBayar,
            total: transaksi.total,
            petugas: transaksi.user.nama
        }
    });

    return result;
};

module.exports = {
    getAllOrders,
    getOrderDetails,
    updateTransaction,
    filterAllTransactionByPeriod
}
