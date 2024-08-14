const { Op } = require('sequelize');
const Item = require('../../api/v1/item/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const { 
    BadRequestError, 
    NotFoundError 
} = require('../../errors');

const getAllItem = async () => {
    const item = await Item.findAll({
        include: [{
            model: UserKlinik,
            as: 'user',
            attributes: ['nama']
        }]
    });

    const result = item.map(item => {
        return {
            id: item.uuid,
            nama_item: item.nama_item,
            kode_item: item.kode_item,
            harga_item: item.harga_satuan_item,
            satuan_item: item.satuan,
            stok_item: item.stok,
            createdBy: item.user.nama
        };
    });

    return result;
};

const createItem = async (req) => {
    const {nama_item, kode_item, harga_satuan_item, satuan, stok } = req.body;
    const userKlinikId = req.user.id;

    const check = await Item.findOne({ where: { nama_item } });
    if (check) throw new BadRequestError('Item telah terdaftar');

    const result = await Item.create({
        nama_item: nama_item,
        kode_item: kode_item,
        harga_satuan_item: harga_satuan_item,
        satuan: satuan,
        stok: stok,
        userKlinikId
    });

    return result
};

const searchItem = async (req) => {
    const { query } = req.params;
    const result = await Item.findAll({
        where: {
            nama_item: {
                [Op.like]: `%${query}%`
            },
            stok: {
                [Op.gt]: 0
            }
        },
        attributes: ['uuid', 'nama_item', 'satuan']
    });

    if (!result.length) throw new NotFoundError(`Tidak ada Item dengan nama yang mengandung: ${query}`);

    return result.map(item => ({
        id: item.uuid,
        nama_item: `${item.nama_item} ${item.satuan}`
    }));
};

const updateItem = async (req) => {
    const { id } = req.params;
    const { nama_item, kode_item, harga_satuan_item, satuan, stok } = req.body;
    
    const result = await Item.update(
        { nama_item, kode_item, harga_satuan_item, satuan, stok },
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
    searchItem,
    updateItem,
    deleteItem,
};
