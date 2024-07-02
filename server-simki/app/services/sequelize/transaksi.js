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
const { generateInvoiceNumber } = require('../../utils');

const getAllOrders = async (req, res) => {
    const episodes = await Episode.findAll({
        where: { status: 'in process' },
        include: [
            // {
            //     model: DataPasien,
            //     attributes: ['nama_pasien']
            // },
            // {
            //     model: UserKlinik,
            //     attributes: ['nama_dokter']
            // }
        ],
        attributes: ['uuid', 'status']
    });

    const orders = episodes.map(episode => ({
        episodeId: episode.uuid,
        // namaPasien: episode.DataPasien.nama_pasien,
        status: episode.status
    }));

    return orders;
};

const getOrderDetails = async (req, res) => {
    const { id } = req.params;

    const episode = await Episode.findByPk(id, {
        include: [
            {
                model: OrderObat,
                include: [Obat]
            },
            {
                model: OrderProsedur,
                include: [Item]
            },
            {
                model: OrderSurat,
                include: [
                    { model: SuratSakit },
                    { model: SuratRujukan }
                ]
            },
            // {
            //     model: DataPasien,
            //     attributes: ['nama_pasien']
            // },
            // {
            //     model: UserKlinik,
            //     attributes: ['nama_dokter']
            // }
        ]
    });

    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    const orderDetails = {
        episodeId: episode.uuid,
        // namaPasien: episode.DataPasien.nama_pasien,
        // namaDokter: episode.UserKlinik.nama_dokter,
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

const createTransaction = async (req) => {
    const { id } = req.params;
    const { metodeBayar, diskon, keterangan, orderobatId,  } = req.body;

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

    if (!ordersObat.length && !ordersProsedur.length && !ordersSurat.length) {
        throw new NotFoundError('No orders found for the provided episodeId');
    }

    const invoiceNumber = await generateInvoiceNumber(id);

    // Calculate total cost from all orders
    let total = 0;
    ordersObat.forEach(order => total += parseFloat(order.total));
    ordersProsedur.forEach(order => total += parseFloat(order.total));
    ordersSurat.forEach(order => total += parseFloat(order.total));

    const totalAfterDiscount = total - (total * (diskon / 100));

    // Create transaction record
    const transaksi = await Transaksi.create({
        episodeId: id,
        metodeBayar,
        diskon,
        keterangan,
        total: totalAfterDiscount,
        invoiceNumber,
        orderobatId:ordersObat.uuid,
        orderprosedurId:ordersProsedur.uuid,
        ordersuratId:ordersSurat .uuid,
        userId: req.user.id
    });

    // Update episode status
    await Episode.update({ status: 'process by cashier' }, { where: { uuid: id } });

    return transaksi;
};

module.exports = {
    getAllOrders,
    getOrderDetails,
    createTransaction
}
