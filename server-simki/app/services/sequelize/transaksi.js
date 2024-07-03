const Appointment = require('../../api/v1/appointment/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const Schedule = require('../../api/v1/schedule/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const EMRPasien = require('../../api/v1/emrPasien/model');
const Episode = require('../../api/v1/episode/model');
const Transaksi = require('../../api/v1/transaksi/model');
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

//masih bermasalah di get ini
const getAllOrders = async (req, res) => {
    const order = await Transaksi.findAll({
        include: [
            {
                model: OrderObat,
                as: 'orderobat',
                include: {
                    model: Episode,
                    as: 'episode',
                    include: {
                        model: EMRPasien,
                        include: {
                            model: Appointment,
                            include: {
                                model: DataPasien,
                                as: 'datapasien',
                                attributes: ['nama_lengkap']
                            }
                        }
                    }
                }
            },
            {
                model: OrderSurat,
                as: 'ordersurat',
                include: {
                    model: Episode,
                    as: 'episode',
                    include: {
                        model: EMRPasien,
                        include: {
                            model: Appointment,
                            include: {
                                model: DataPasien,
                                as: 'datapasien',
                                attributes: ['nama_lengkap']
                            }
                        }
                    }
                }
            },
            {
                model: OrderProsedur,
                as: 'orderprosedur',
                include: {
                    model: Episode,
                    as: 'episode',
                    include: {
                        model: EMRPasien,
                        include: {
                            model: Appointment,
                            include: {
                                model: DataPasien,
                                as: 'datapasien',
                                attributes: ['nama_lengkap']
                            }
                        }
                    }
                }
            },
        ]
    });
    const result = order.map(transaksi => {
        const orderObat = transaksi.orderobat.episode ? transaksi.orderobat.episode : null;
        const orderSurat = transaksi.ordersurat.episode ? transaksi.ordersurat.episode : null;
        const orderProsedur = transaksi.orderprosedur.episode ? transaksi.orderprosedur.episode : null;

        return {
            a: orderObat,
            noInvoice: orderObat?.invoiceNumber || orderSurat?.invoiceNumber || orderProsedur?.invoiceNumber || null,
            noEMR: orderObat?.emrpasien?.noEMR || orderSurat?.emrpasien?.noEMR || orderProsedur?.emrpasien?.noEMR || null,
            namaPasien: orderObat?.emrpasien?.appointment?.datapasien?.nama_lengkap ||
                orderSurat?.emrpasien?.appointment?.datapasien?.nama_lengkap ||
                orderProsedur?.emrpasien?.appointment?.datapasien?.nama_lengkap || null,
            Penjamin: orderObat?.emrpasien?.appointment?.penjamin ||
                orderSurat?.emrpasien?.appointment?.penjamin ||
                orderProsedur?.emrpasien?.appointment?.penjamin || null,
            Tanggal: orderObat?.emrpasien?.appointment?.tanggal ||
                orderSurat?.emrpasien?.appointment?.tanggal ||
                orderProsedur?.emrpasien?.appointment?.tanggal || null
        };
    });
    return result
};

//ini belum beres juga
const getOrderDetails = async (req, res) => {
    const { id } = req.params;

    // Ensure episodeId exists in each type of order
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
    const ordersSurat = await OrderSurat.findAll({
        where: { episodeId: id },
        include: [
            {
                model: SuratSakit,
                as: 'suratsakit',
            },
            {
                model: SuratRujukan,
                as: 'suratrujukan',
            },
        ]
    });

    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    const orderDetails = {
        episodeId: episode.uuid,
        namaPasien: episode.DataPasien.nama_pasien,
        namaDokter: episode.UserKlinik.nama_dokter,
        status: episode.status,
        orderObats: episode.OrderObats.map(order => ({
            namaObat: order.Obat.nama_obat,
            kuantitas: order.kuantitas,
            dosis: order.dosis,
            catatan: order.catatan,
            total: order.total
        })),
        orderProsedurs: episode.OrderProsedurs.map(order => ({
            namaItem: order.Item.nama_item,
            kuantitas: order.kuantitas,
            dosis: order.dosis,
            catatan: order.catatan,
            total: order.total
        })),
        orderSurats: episode.OrderSurats.map(order => ({
            jenisSurat: order.jenisSurat,
            versiSurat: order.versiSurat,
            total: order.total
        }))
    };

    return orderDetails;
};

const updateTransaction = async (req) => {
    const { id } = req.params;
    const { metodeBayar, diskon, keterangan } = req.body;

    // Ensure episodeId exists in each type of order
    const transaction = await Transaksi.findByPk(id);
    if (!transaction) throw new NotFoundError('Transaction not found');

    const totalAfterDiscount = transaction.total - (transaction.total * (diskon / 100));

    // Create transaction record
    const transaksi = await Transaksi.update({
        metodeBayar,
        diskon,
        keterangan,
        total: totalAfterDiscount,
        status: 'Completed',
        userId: req.user.id
    }, {
        where: { uuid: id },
        returning: true // To return the updated rows
    });

    return transaksi;
};

module.exports = {
    getAllOrders,
    // getOrderDetails,
    updateTransaction
}
