const EMRPasien = require('../../api/v1/emrPasien/model');
const Appointment = require('../../api/v1/appointment/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Episode = require('../../api/v1/episode/model');
const Schedule = require('../../api/v1/schedule/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
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

const getOrdersByInvoice = async (req, res) => {
    const { invoiceNumber } = req.params;

    // Check if any transaction already exists for the given invoiceNumber
    const existingTransaction = await Transaksi.findOne({ where: { invoiceNumber } });
    if (existingTransaction) throw new BadRequestError ('Orders already processed in a transaction.');

    // Fetch orders by invoiceNumber
    const orderObats = await OrderObat.findAll({ where: { invoiceNumber } });
    const orderProsedurs = await OrderProsedur.findAll({ where: { invoiceNumber } });
    const orderSurats = await OrderSurat.findAll({ where: { invoiceNumber } });

    if (orderObats.length === 0 && orderProsedurs.length === 0 && orderSurats.length === 0) throw new NotFoundError( 'No orders found for this invoice number.' );

    return ({
        orderObats,
        orderProsedurs,
        orderSurats
    });
};

const createTransaction = async (req) => {
    const { invoiceNumber } = req.params; 
    const { metodeBayar, diskon, keterangan } = req.body;

    const ordersObat = await OrderObat.findAll({
        where: { invoiceNumber },
        include: {
            model: Obat,
            as: 'dataobat',
        }
    });
    const ordersProsedur = await OrderProsedur.findAll({
        where: { invoiceNumber },
        include: { 
            model: Item,
            as: 'dataitem',
        }
    });
    const ordersSurat = await OrderSurat.findAll({ where: { invoiceNumber } });

    const totalObat = ordersObat.length ?ordersObat.reduce((sum, order) => sum + (order.kuantitas * order.harga_satuan_obat), 0) : 0;
    const totalProsedur = ordersProsedur.length ?ordersProsedur.reduce((sum, order) => sum + (order.kuantitas * order.harga_satuan_item), 0): 0;

    const total = totalObat + totalProsedur - diskon;

    const transaction = await Transaksi.create({
        invoiceNumber,
        metodeBayar,
        diskon,
        keterangan,
        total,
        status: 'in process',
        userId: req.user.id,
        orderobatId: ordersObat.length ? ordersObat[0].uuid : null,
        orderprosedurId: ordersProsedur.length ? ordersProsedur[0].uuid : null,
        ordersuratId: ordersSurat.length ? ordersSurat[0].uuid : null,
    });

    return transaction;
};

module.exports = {
    getOrdersByInvoice,
    createTransaction
}
