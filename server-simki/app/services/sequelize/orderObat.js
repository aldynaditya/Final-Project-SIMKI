const Episode = require('../../api/v1/episode/model');
const OrderObat = require('../../api/v1/orderObat/model');
const Obat = require('../../api/v1/obat/model');
const { 
    BadRequestError, 
    NotFoundError,
} = require('../../errors');

const createOrderObat = async (req) => {
    const { id } = req.params;
    const { namaObat, kuantitas, dosis, catatan } = req.body;

    const episode = await Episode.findByPk(id);
    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    const obat = await Obat.findOne({ where: { nama_obat: namaObat } });
    if (!obat) throw new NotFoundError('Obat tidak ditemukan');

    if (obat.stok === 0) throw new BadRequestError('Stok obat habis');
    if (kuantitas > obat.stok) throw new BadRequestError('Stok obat tidak mencukupi');

    const result = await OrderObat.create({
        episodeId: episode.uuid,
        obatId: obat.uuid,
        kuantitas,
        dosis,
        status: 'none',
        catatan,
        total: kuantitas * obat.harga_satuan_obat
    });

    await Obat.update({ stok: obat.stok - kuantitas }, { where: { uuid: obat.uuid } });

    return result;
};

const getAllOrderObatById = async (req) => {
    const { id } = req.params;

    const orders = await OrderObat.findAll({
        where: { episodeId: id },
        include: [
            {
                model: Obat,
                as: 'dataobat'
            }
        ]
    });

    if (!orders) throw new NotFoundError('Episode tidak ditemukan');

    const result = orders.map(orders => {
        return {
            id: orders.uuid,
            obatId: orders.dataobat.uuid,
            nama_obat: orders.dataobat.nama_obat,
            kode_obat: orders.dataobat.kode_obat,
            satuan_obat: orders.dataobat.satuan,
            harga_obat: orders.dataobat.harga_satuan_obat,
            kuantitas: orders.kuantitas,
            stok_obat: orders.dataobat.stok,
            dosis: orders.dosis,
            catatan: orders.catatan,
            total: orders.total,
            status: orders.status,
        };
    });

    return result;
};

const deleteOrderObatById = async (req) => {
    const { id } = req.params;

    const order = await OrderObat.findByPk(id, {
        include: [
            {
                model: Obat,
                as: 'dataobat'
            }
        ]
    });

    if (!order) throw new NotFoundError('Obat tidak ditemukan');

    const obat = await Obat.findByPk(order.obatId);
    if (!obat) throw new NotFoundError('Obat tidak ditemukan');

    await Obat.update({ stok: obat.stok + order.kuantitas }, { where: { uuid: obat.uuid } });

    await order.destroy();

    return order;
};

const updateAllOrderObatStatusById = async (req) => {
    const { id } = req.params;

    const episode = await Episode.findByPk(id);
    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    const orders = await OrderObat.findAll({
        where: {
            episodeId: id, 
            status: 'none' 
            } 
        });
    if (orders.length === 0) throw new NotFoundError('Tidak ada order obat dengan status none untuk episode ini');

    await OrderObat.update({ 
        status: 'in process' 
    }, {
        where: {
            episodeId: id, 
            status: 'none' 
        } 
    });

    return orders;
};


module.exports = {
    createOrderObat,
    getAllOrderObatById,
    deleteOrderObatById,
    updateAllOrderObatStatusById,
};