const OrderSurat = require('../api/v1/orderSurat/model')

const getNextVersion = async (model, suratIdField, suratId) => {
    const latestOrder = await OrderSurat.findOne({
        where: { [suratIdField]: suratId },
        order: [['createdAt', 'DESC']]
    });

    if (!latestOrder) {
        return 'v1.0';
    }

    const lastVersion = latestOrder.versi_surat.split('v')[1].split('.')[0];
    const newVersionNumber = parseInt(lastVersion, 10) + 1;
    return `v${newVersionNumber}.0`;
};

module.exports = {
    getNextVersion
};