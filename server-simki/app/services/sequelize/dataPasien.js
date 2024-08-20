const { Op } = require('sequelize');
const DataPasien = require('../../api/v1/dataPasien/model');
const { 
    BadRequestError, 
    NotFoundError 
} = require('../../errors');

const getAllDataPasien = async () => {
    const data = await DataPasien.findAll();

    const result = data.map(data => {
        return {
            id: data.uuid,
            nama_lengkap: data.nama_lengkap,
            nik: data.nik,
            tanggal_lahir: data.tanggal_lahir,
            jenis_kelamin: data.jenis_kelamin,
            alamat: data.alamat,
        };
    });

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

const getDataPasienbyId = async (req) => {
    const { id: uuid } = req.params;

    const result = await DataPasien.findOne({
        where: { uuid },
    });

    return result;
};

const getOneDataPasien = async (req) => {
    const { query } = req.params;

    const result = await DataPasien.findAll({
        where: {
            [Op.or]: [
                {
                    nama_lengkap: {
                        [Op.like]: `%${query}%`
                    }
                },
                {
                    nik: {
                        [Op.like]: `%${query}%`
                    }
                }
            ]
        }
    });

    if (!result) throw new NotFoundError(`Tidak ada DataPasien dengan nama/nik yang sesuai`);

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
    getDataPasienbyId,
    getOneDataPasien,
    deleteDataPasien,
};
