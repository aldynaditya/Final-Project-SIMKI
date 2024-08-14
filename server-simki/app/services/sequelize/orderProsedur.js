const Episode = require('../../api/v1/episode/model');
const OrderProsedur = require('../../api/v1/orderProsedur/model');
const Item = require('../../api/v1/item/model');
const { 
    BadRequestError, 
    NotFoundError,
} = require('../../errors');

const createOrderItem = async (req) => {
    const { id } = req.params;
    const { namaItem, kuantitas, dosis, catatan } = req.body;

    const episode = await Episode.findByPk(id);
    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    const itemRecord = await Item.findOne({ where: { nama_item: namaItem } });
    if (!itemRecord) throw new NotFoundError('Item tidak ditemukan');

    if (itemRecord.stok === 0) throw new BadRequestError('Stok item habis');
    if (kuantitas > itemRecord.stok) throw new BadRequestError('Stok item tidak mencukupi');

    const result = await OrderProsedur.create({
        episodeId: episode.uuid,
        itemId: itemRecord.uuid,
        kuantitas,
        dosis,
        catatan,
        total: kuantitas * itemRecord.harga_satuan_item
    });

    await Item.update({ stok: itemRecord.stok - kuantitas }, { where: { uuid: itemRecord.uuid } });

    return result;
};

const getAllOrderItemById = async (req) => {
    const { id } = req.params;

    const orders = await OrderProsedur.findAll({
        where: { episodeId: id },
        include: [
            {
                model: Item,
                as: 'dataitem'
            }
        ]
    });

    if (!orders) throw new NotFoundError('Episode tidak ditemukan');

    const result = orders.map(orders => {
        return {
            id: orders.uuid,
            itemId: orders.dataitem.uuid,
            nama_item: orders.dataitem.nama_item,
            kode_item: orders.dataitem.kode_item,
            satuan_item: orders.dataitem.satuan,
            harga_item: orders.dataitem.harga_satuan_item,
            kuantitas: orders.kuantitas,
            stok_item: orders.dataitem.stok,
            dosis: orders.dosis,
            catatan: orders.catatan,
            total: orders.total,
            status: orders.status,
        };
    });

    return result;
};

const deleteOrderItemById = async (req) => {
    const { id } = req.params;

    const order = await OrderProsedur.findByPk(id, {
        include: [
            {
                model: Item,
                as: 'dataitem'
            }
        ]
    });

    if (!order) throw new NotFoundError('item tidak ditemukan');

    const item = await Item.findByPk(order.itemId);
    if (!item) throw new NotFoundError('Item tidak ditemukan');

    await Item.update({ stok: item.stok + order.kuantitas }, { where: { uuid: item.uuid } });

    await order.destroy();

    return order;
};

module.exports = {
    createOrderItem,
    getAllOrderItemById,
    deleteOrderItemById,
};