const moment = require('moment');
const { Op } = require('sequelize');
const OrderObat = require('../api/v1/orderObat/model');
const OrderProsedur = require('../api/v1/orderProsedur/model');
const OrderSurat = require('../api/v1/orderSurat/model');

const generateInvoiceNumber = async (episodeId) => {
    const datePart = moment().format('YYYYMMDD');
    
    // Check if there are existing orders with an invoice number for the given episode
    const existingOrder = await OrderObat.findOne({ where: { episodeId, invoiceNumber: { [Op.like]: `INV${datePart}%` } } }) ||
    await OrderProsedur.findOne({ where: { episodeId, invoiceNumber: { [Op.like]: `INV${datePart}%` } } }) ||
    await OrderSurat.findOne({ where: { episodeId, invoiceNumber: { [Op.like]: `INV${datePart}%` } } });
    if (existingOrder) {
        return existingOrder.invoiceNumber;
    }

    // If no existing order, generate a new invoice number
    const lastOrder = await OrderObat.findOne({
        where: { invoiceNumber: { [Op.like]: `INV${datePart}%` } },
        order: [['createdAt', 'DESC']]
    }) ||
    await OrderProsedur.findOne({
        where: { invoiceNumber: { [Op.like]: `INV${datePart}%` } },
        order: [['createdAt', 'DESC']]
    }) ||
    await OrderSurat.findOne({
        where: { invoiceNumber: { [Op.like]: `INV${datePart}%` } },
        order: [['createdAt', 'DESC']]
    });

    let incrementPart = '001';
    if (lastOrder) {
        const lastIncrement = parseInt(lastOrder.invoiceNumber.slice(-3), 10);
        incrementPart = (lastIncrement + 1).toString().padStart(3, '0');
    }

    return `INV${datePart}${incrementPart}`;
};

module.exports = { generateInvoiceNumber }
