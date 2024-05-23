const Pasien = require('../../api/v1/pasien/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getPasien = async(req, res) =>{
    const result = await Pasien.findAll();

    return result;
};

module.exports = {
    getPasien
}