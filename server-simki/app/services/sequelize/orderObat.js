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
        status: 'in process',
        catatan,
        total: kuantitas * obat.harga_satuan_obat
    });

    await Obat.update({ stok: obat.stok - kuantitas }, { where: { uuid: obat.uuid } });

    return result;
};

const getAllOrderObatById = async (req) => {
    const { id } = req.params;

    const result = await OrderObat.findAll({
        where: { episodeId: id },
        include: [
            {
                model: Obat,
                as: 'dataobat'
            }
        ]
    });

    if (!result) throw new NotFoundError('Episode tidak ditemukan');

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

module.exports = {
    createOrderObat,
    getAllOrderObatById,
    deleteOrderObatById,
};