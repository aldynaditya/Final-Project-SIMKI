const { Op } = require('sequelize');
const Item = require('../../api/v1/item/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllItem = async (req) => {
    const result = await Item.findAll(req.body);

    return result;
};

const createItem = async (req) => {
    const {nama_item, kode_item, harga_satuan_item, stok } = req.body;
    const createdBy = req.user.name;

    const check = await Item.findOne({ where: { nama_item } });
    if (check) throw new BadRequestError('Item telah terdaftar');

    const result = await Item.create({
        nama_item: nama_item,
        kode_item: kode_item,
        harga_satuan_item: harga_satuan_item,
        stok: stok,
        createdBy
    });

    return result
};

const getOneItem = async (req) => {
    const { id } = req.params;
    const result = await Item.findOne({ where: {uuid: id} });

    if (!result) throw new NotFoundError(`Tidak ada Item dengan id :  ${id}`);

    return result;
};

const updateItem = async (req) => {
    const { id } = req.params;
    const { nama_item, kode_item, harga_satuan_item, stok } = req.body;

    const check = await Item.findOne({
        where: {
            nama_item,
            uuid: { [Op.ne]: id },
        },
    });

    if (check) throw new BadRequestError('Nama duplikat');
    
    const result = await Item.update(
        { nama_item, kode_item, harga_satuan_item, stok },
        { where: { uuid: id }}
    );

    if (!result) throw new NotFoundError(`Tidak ada Item dengan id :  ${id}`);
    
    return result;
};

const deleteItem = async (req) => {
    const { id } = req.params;

    const result = await Item.findOne({ where: {uuid: id} });

    if (!result) throw new NotFoundError(`Tidak ada Item dengan id :  ${id}`);

    await result.destroy();

    return result;
};

module.exports = {
    getAllItem,
    createItem,
    getOneItem,
    updateItem,
    deleteItem,
};
