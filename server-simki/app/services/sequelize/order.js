const EMRPasien = require('../../api/v1/emrPasien/model');
const Appointment = require('../../api/v1/appointment/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Episode = require('../../api/v1/episode/model');
const Schedule = require('../../api/v1/schedule/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const Transaksi = require('../../api/v1/transaksi/model');
const OrderObat = require('../../api/v1/orderObat/model');
const OrderProsedur = require('../../api/v1/orderProsedur/model');
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

const createOrderItem = async (req) => {
    const { id } = req.params;
    const { namaItem, kuantitas, dosis, catatan } = req.body;

    const episode = await Episode.findByPk(id);
    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    const item = await Item.findOne({ where: { nama_item: namaItem } });
    if (!item) throw new NotFoundError('Item tidak ditemukan');

    if (kuantitas > item.stok) throw new BadRequestError('Stok item tidak mencukupi');

    const result = await OrderProsedur.create({
        episodeId: episode.uuid,
        itemId: item.uuid, // Pastikan itemId diatur dengan item.uuid
        kuantitas,
        dosis,
        catatan,
    });

    await Item.update({ stok: item.stok - kuantitas }, { where: { uuid: item.uuid } });

    return result;
}

const createOrderSuratSakit = async (req) => {
    const { id } = req.params;
    const { umur, pekerjaan, diagnosis, periodeStart, periodeEnd } = req.body;

    const episode = await Episode.findByPk(id);
    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    const result = await SuratSakit.create({
        umur,
        pekerjaan,
        diagnosis,
        periodeStart,
        periodeEnd,
        userId: req.user.id, // Sesuaikan dengan logika aplikasi Anda
    });

    await OrderSurat.create({
        episodeId: episode.uuid,
        suratsakitId: result.uuid,
        jenisSurat: 'sakit', // Hardcode atau gunakan data dari req.body
        versiSurat: '1.0', // Contoh versi surat, sesuaikan dengan kebutuhan
    });

    return result;
}

const createOrderSuratRujukan = async (req) => {
    const { id } = req.params;
    const { tujuan, tempat_tujuan, diagnosis, tindakan, keterangan } = req.body;

    const episode = await Episode.findByPk(id);
    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    const result = await SuratRujukan.create({
        tujuan,
        tempat_tujuan,
        diagnosis,
        tindakan,
        keterangan,
    });

    await OrderSurat.create({
        episodeId: episode.uuid,
        suratrujukanId: result.uuid,
        jenisSurat: 'rujukan',
        versiSurat: '1.0',
    });

    return result;
}



module.exports = {
    createOrderObat,
    createOrderItem,
    createOrderSuratRujukan,
    createOrderSuratSakit
};