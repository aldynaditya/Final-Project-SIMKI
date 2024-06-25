const EMRPasien = require('../../api/v1/emrPasien/model');
const Appointment = require('../../api/v1/appointment/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Episode = require('../../api/v1/episode/model');
const Schedule = require('../../api/v1/schedule/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const Transaksi = require('../../api/v1/transaksi/model');
const OrderObat = require('../../api/v1/orderObat/model');
const OrderProsedur = require('../../api/v1/orderObat/model');
const OrderSurat = require('../../api/v1/orderSurat/model');
const SuratSakit = require('../../api/v1/suratSakit/model');
const SuratRujukan = require('../../api/v1/suratRujukan/model');
const Obat = require('../../api/v1/obat/model');
const Item = require('../../api/v1/item/model');
const { 
    BadRequestError, 
    NotFoundError, 
    UnauthorizedError 
} = require('../../errors');

const createOrderObat = async (req) => {
    const { id } = req.params;
    const { namaObat, kuantitas, dosis, catatan } = req.body;

    const episode = await Episode.findByPk(id);
    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    const obat = await Obat.findOne({ where: { nama_obat: namaObat } });
    if (!obat) throw new NotFoundError('Obat tidak ditemukan' );

    if (obat.stok === 0) throw new BadRequestError('Stok obat habis');

    if (kuantitas > obat.stok) throw new BadRequestError('Stok obat tidak mencukupi');

    const result = await OrderObat.create({
        episodeId: episode.uuid,
        obatId: obat.uuid,
        kuantitas,
        dosis,
        catatan,
    });

    await Obat.update({ stok: obat.stok - kuantitas }, { where: { uuid: obat.uuid } });
    
    return result;
}

module.exports = {
    createOrderObat,
};