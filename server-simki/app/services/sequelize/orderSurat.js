const Episode = require('../../api/v1/episode/model');
const OrderSurat = require('../../api/v1/orderSurat/model');
const SuratSakit = require('../../api/v1/suratSakit/model');
const SuratRujukan = require('../../api/v1/suratRujukan/model');
const { 
    BadRequestError, 
    NotFoundError,
} = require('../../errors');
const { getNextVersion } = require('../../utils');

const createOrderSuratSakit = async (req) => {
    const { id } = req.params;
    const { umur, pekerjaan, diagnosis, periode_start, periode_end } = req.body;

    const episode = await Episode.findByPk(id);
    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    const suratSakit = await SuratSakit.create({
        umur,
        pekerjaan,
        diagnosis,
        periode_start,
        periode_end,
        userKlinikId: req.user.id
    });

    const versi_surat = await getNextVersion(SuratSakit, 'suratsakitId', suratSakit.uuid);

    const orderSurat = await OrderSurat.create({
        episodeId: episode.uuid,
        suratSakitId: suratSakit.uuid,
        status: 'confirm',
        jenis_surat: 'sakit',
        versi_surat,
        total: 0
    });

    const ordersuratWithDetails = await OrderSurat.findByPk(orderSurat.uuid, {
        include: [
            { 
                model: SuratSakit, 
                as: 'suratsakit' 
            },
        ]
    });

    return {
        orderSurat: ordersuratWithDetails
    };
};

const createOrderSuratRujukan = async (req) => {
    const { id } = req.params;
    const { tujuan, tempat_tujuan, diagnosis, tindakan, keterangan } = req.body;

    const episode = await Episode.findByPk(id);
    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    const suratRujukan = await SuratRujukan.create({
        tujuan,
        tempat_tujuan,
        diagnosis,
        tindakan,
        keterangan
    });

    const orderSurat = await OrderSurat.create({
        episodeId: episode.uuid,
        suratRujukanId: suratRujukan.uuid,
        status: 'confirm',
        jenis_surat: 'rujukan',
        versi_surat: 'v1.0',
        total: 0
    });

    const ordersuratWithDetails = await OrderSurat.findByPk(orderSurat.uuid, {
        include: [
            { 
                model: SuratRujukan, 
                as: 'suratrujukan' 
            },
        ]
    });

    return {
        orderSurat: ordersuratWithDetails
    };
};

const getAllOrderSuratById = async (req) => {
    const { id } = req.params;

    const result = await OrderSurat.findAll({
        where: { episodeId: id },
        include: [
            {
                model: SuratSakit,
                as: 'suratsakit'
            },
            {
                model: SuratRujukan,
                as: 'suratrujukan'
            }
        ]
    });

    if (!result) throw new NotFoundError('Episode tidak ditemukan');

    return result;
};

const deleteOrderSuratById = async (req) => {
    const { id } = req.params;

    const order = await OrderSurat.findByPk(id);

    if (!order) throw new NotFoundError('Item tidak ditemukan');

    if (order.suratSakitId) {
        const suratSakit = await SuratSakit.findOne({ where: { uuid: order.suratSakitId } });
        if (suratSakit) await suratSakit.destroy();
    }

    if (order.suratRujukanId) {
        const suratRujukan = await SuratRujukan.findOne({ where: { uuid: order.suratRujukanId } });
        if (suratRujukan) await suratRujukan.destroy();
    }

    await order.destroy();

    return order;
};

module.exports = {
    createOrderSuratRujukan,
    createOrderSuratSakit,
    getAllOrderSuratById,
    deleteOrderSuratById,
};