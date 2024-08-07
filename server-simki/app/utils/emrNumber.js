const { Op } = require('sequelize');
const EMRPasien = require('../api/v1/emrPasien/model');

const generateNoEMR = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '');

    const lastEMR = await EMRPasien.findOne({
        where: {
            noEMR: {
                [Op.like]: `EMR${formattedDate}%`
            }
        },
        order: [['createdAt', 'DESC']]
    });

    let nextNumber = '00001';

    if (lastEMR) {
        const lastNoEMR = lastEMR.noEMR;
        const lastNumber = parseInt(lastNoEMR.slice(-5));
        nextNumber = (lastNumber + 1).toString().padStart(5, '0');
    }

    const noEMR = `EMR${formattedDate}${nextNumber}`;
    return noEMR;
};

module.exports = {
    generateNoEMR
};
