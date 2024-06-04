const { Op } = require('sequelize');
const Obat = require('../../api/v1/obat/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllObat = async (req) => {
    const result = await Obat.findAll(req.body);

    return result;
};

const createObat = async (req) => {
    const {nama_obat, kode_obat, harga_satuan_obat, satuan, stok } = req.body;
    const superuser = req.user.superuser;
    const createdBy = req.user.name;

    const check = await Obat.findOne({ where: { nama_obat } });
    if (check) throw new BadRequestError('Obat telah terdaftar');

    const result = await Obat.create({
        nama_obat: nama_obat,
        kode_obat: kode_obat,
        harga_satuan_obat: harga_satuan_obat,
        satuan: satuan,
        stok: stok,
        superuser,
        createdBy
    });

    return result
};

const getOneObat = async (req) => {
    const { id } = req.params;
    const result = await Obat.findOne({ where: {uuid: id} });

    if (!result) throw new NotFoundError(`Tidak ada Obat dengan id :  ${id}`);

    return result;
};

const updateObat = async (req) => {
    const { id } = req.params;
    const { nama_obat, kode_obat, harga_satuan_obat, satuan, stok } = req.body;

    const check = await Obat.findOne({
        where: {
            nama_obat,
            uuid: { [Op.ne]: id },
        },
    });

    if (check) throw new BadRequestError('Nama duplikat');
    
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
    updateObat,
    deleteObat,
};
