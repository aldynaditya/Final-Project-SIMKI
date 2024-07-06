const Obat = require('../../api/v1/obat/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllObat = async (req) => {
    const obat = await Obat.findAll({
        include: [{
            model: UserKlinik,
            as: 'user',
            attributes: ['nama']
        }]
    });

    const result = obat.map(obat => {
        return {
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
    const userId = req.user.id;

    const check = await Obat.findOne({ where: { kode_obat } });
    if (check) throw new BadRequestError('Obat telah terdaftar');

    const result = await Obat.create({
        nama_obat: nama_obat,
        kode_obat: kode_obat,
        harga_satuan_obat: harga_satuan_obat,
        satuan: satuan,
        stok: stok,
        userId
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
