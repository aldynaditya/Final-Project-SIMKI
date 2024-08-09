const { Op } = require('sequelize');
const DataPasien = require('../../api/v1/dataPasien/model');
const { 
    BadRequestError, 
    NotFoundError 
} = require('../../errors');

const getAllDataPasien = async () => {
    const result = await DataPasien.findAll();

    return result;
};

const createDataPasien = async (req) => {
    const { nik, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, gol_darah, kewarganegaraan, alamat } = req.body;

    const check = await DataPasien.findOne({ where: { nik } });
    if (check) throw new BadRequestError('DataPasien dengan NIK tersebut sudah terdaftar');

    const result = await DataPasien.create({
        nik,
        nama_lengkap,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        gol_darah,
        kewarganegaraan,
        alamat
    });

    return result;
};



const getOneDataPasien = async (req) => {
    const { id } = req.params;
    const { name, nik } = req.body;

    const whereCondition = [];

    if (id) {
        whereCondition.push({ uuid: id });
    }

    if (name) {
        whereCondition.push({ nama_lengkap: { [Op.like]: `%${name}%` } });
    }

    if (nik) {
        whereCondition.push({ nik: { [Op.like]: `%${nik}%` } });
    }

    if (whereCondition.length === 0) {
        throw new Error('setidaknya sediakan 1 parameter pencarian');
    }

    const result = await DataPasien.findOne({
        where: {
            [Op.or]: whereCondition
        }
    });

    if (!result) throw new NotFoundError(`Tidak ada DataPasien dengan id/nama/nik yang sesuai`);

    return result;
};

const updateDataPasien = async (req) => {
    const { id } = req.params;
    const { nik, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, gol_darah, kewarganegaraan, alamat } = req.body;

    const check = await DataPasien.findOne({
        where: {
            nik,
            uuid: { [Op.ne]: id },
        },
    });

    if (check) throw new BadRequestError('NIK sudah terdaftar');

    const result = await DataPasien.update(
        { nik, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, gol_darah, kewarganegaraan, alamat },
        { where: { uuid: id }}
    );

    if (!result[0]) throw new NotFoundError(`Tidak ada DataPasien dengan id: ${id}`);

    return result;
};


const deleteDataPasien = async (req) => {
    const { id } = req.params;

    const result = await DataPasien.findOne({ where: {uuid: id} });

    if (!result) throw new NotFoundError(`Tidak ada DataPasien dengan id :  ${id}`);

    await result.destroy();

    return result;
};

module.exports = {
    getAllDataPasien,
    createDataPasien,
    getOneDataPasien,
    updateDataPasien,
    deleteDataPasien,
};
