const { Op } = require('sequelize');
const Episode = require('../api/v1/episode/model');

const generateInvoiceNumber = async () => {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, ''); // Format: YYYYMMDD

    // Fetch the latest invoice number for today
    const lastEpisode = await Episode.findOne({
        where: {
            invoiceNumber: {
                [Op.like]: `INV${dateStr}%`
            }
        },
        order: [['createdAt', 'DESC']]
    });

    let newInvoiceNumber;
    if (lastEpisode) {
        // Extract the numeric part of the last invoice number
        const lastInvoiceNumber = lastEpisode.invoiceNumber;
        const lastIncrement = parseInt(lastInvoiceNumber.slice(-6), 10);
        const newIncrement = (lastIncrement + 1).toString().padStart(6, '0');
        newInvoiceNumber = `INV${dateStr}${newIncrement}`;
    } else {
        // No previous invoices for today, start with 000001
        newInvoiceNumber = `INV${dateStr}000001`;
    }

    return newInvoiceNumber;
};

module.exports = {
    generateInvoiceNumber
};