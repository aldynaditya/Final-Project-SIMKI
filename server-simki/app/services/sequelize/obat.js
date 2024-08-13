const { Op } = require('sequelize');
const Obat = require('../../api/v1/obat/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const { 
    BadRequestError, 
    NotFoundError 
} = require('../../errors');

const getAllObat = async () => {
    const obat = await Obat.findAll({
        include: [{
            model: UserKlinik,
            as: 'user',
            attributes: ['nama']
        }]
    });

    const result = obat.map(obat => {
        return {
            id: obat.uuid,
            nama_obat: obat.nama_obat,
            kode_obat: obat.kode_obat,
            harga_obat: obat.harga_satuan_obat,
            jenis_obat: obat.satuan,
            stok_obat: obat.stok,
            createdBy: obat.user.nama
        };
    });

    return result;
};

const createObat = async (req) => {
    const {nama_obat, kode_obat, harga_satuan_obat, satuan, stok } = req.body;
    const userKlinikId = req.user.id;

    const check = await Obat.findOne({ where: { kode_obat } });
    if (check) throw new BadRequestError('Obat telah terdaftar');

    const result = await Obat.create({
        nama_obat: nama_obat,
        kode_obat: kode_obat,
        harga_satuan_obat: harga_satuan_obat,
        satuan: satuan,
        stok: stok,
        userKlinikId
    });

    return result
};

const getOneObat = async (req) => {
    const { id } = req.params;
    const result = await Obat.findOne({ where: {uuid: id} });

    if (!result) throw new NotFoundError(`Tidak ada Obat dengan id :  ${id}`);

    return result;
};

const searchObat = async (req) => {
    const { query } = req.params;
    const result = await Obat.findAll({
        where: {
            nama_obat: {
                [Op.like]: `%${query}%`
            },
            stok: {
                [Op.gt]: 0
            }
        },
        attributes: ['uuid', 'nama_obat', 'satuan']
    });

    if (!result.length) throw new NotFoundError(`Tidak ada Obat dengan nama yang mengandung: ${query}`);

    return result.map(obat => ({
        id: obat.uuid,
        nama_obat: `${obat.nama_obat} ${obat.satuan}`
    }));
};

const updateObat = async (req) => {
    const { id } = req.params;
    const { nama_obat, kode_obat, harga_satuan_obat, satuan, stok } = req.body;
    
    const result = await Obat.update(
        { nama_obat, kode_obat, harga_satuan_obat, satuan, stok },
        { where: { uuid: id }}
    );

    if (!result) throw new NotFoundError(`Tidak ada Obat dengan id :  ${id}`);
    
    return result;
};

const deleteObat = async (req) => {
    const { id } = req.params;

    const result = await Obat.findOne({ where: {uuid: id} });

    if (!result) throw new NotFoundError(`Tidak ada Obat dengan id :  ${id}`);

    await result.destroy();

    return result;
};

module.exports = {
    getAllObat,
    createObat,
    getOneObat,
    searchObat,
    updateObat,
    deleteObat,
};
