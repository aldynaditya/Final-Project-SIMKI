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
const { BadRequestError, NotFoundError, UnauthorizedError } = require('../../errors');

const createOrderObat = async (req) => {
    const { id } = req.params;
    const { obatItems } = req.body;

    const episode = await Episode.findByPk(id);
    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    let totalOrder = 0;
    const results = [];

    for (const item of obatItems) {
        const { namaObat, kuantitas, dosis, catatan } = item;

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

        totalOrder += result.total;
        results.push(result);
    }

    return { results, totalOrder };
};

const getOrderDetailInformation = async() => {

}

const getALlOrderObatbyFarmasi = async() => {
    const orderObat = await OrderObat.findAll({
        include: [
            {
                model: Episode,
                as: 'episode',
                include: {
                    model: EMRPasien,
                    include: {
                        model: Appointment,
                        include: [{
                            model: DataPasien,
                            as: 'datapasien',
                            attributes: ['nama_lengkap']
                        },
                        {
                            model: Schedule,
                            include: {
                                model: UserKlinik,
                                as: 'user_klinik',
                            }
                        }]
                    }
                }
            },
            {
                model: Obat,
                as: 'dataobat'
            }
        ]
    });

    const result = orderObat.map(orderobat => {
        const dataobat = orderobat.dataobat;
        const episode = orderobat.episode;
        const emr = episode.emr_pasien;
        const appointment = emr.appointment;
        const datapasien = appointment.datapasien;
        const schedule = appointment.schedule;
        
        return{
            noInvoice: episode.invoiceNumber,
            dateAndTime: orderobat.createdAt,
            noEMR: emr.noEMR,
            namaPasien: datapasien.nama_lengkap,
            namaDokter: schedule.user_klinik.name,
            poli: schedule.poli,
            obat: dataobat.nama_obat,
            kuantitas: orderobat.kuantitas,
            dosis: orderobat.dosis,
            catatan: orderobat.catatan,
            status: orderobat.status
        }
    });

    return result;
}

const createOrderItem = async (req) => {
    const { id } = req.params;
    const { itemItems } = req.body;

    const episode = await Episode.findByPk(id);
    if (!episode) throw new NotFoundError('Episode tidak ditemukan');

    let totalOrder = 0;
    const results = [];

    for (const item of itemItems) {
        const { namaItem, kuantitas, dosis, catatan } = item;

        const itemRecord = await Item.findOne({ where: { nama_item: namaItem } });
        if (!itemRecord) throw new NotFoundError('Item tidak ditemukan');

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

        totalOrder += result.total;
        results.push(result);
    }

    await Episode.update({ status: 'in process' }, { where: { uuid: episode.uuid } });

    return { results, totalOrder };
};

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
        userId: req.user.id
    });

    await OrderSurat.create({
        episodeId: episode.uuid,
        suratsakitId: result.uuid,
        status: 'confirm',
        jenisSurat: 'sakit',
        versiSurat: '1.0',
        total: 0
    });

    return result;
};

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
        keterangan
    });

    await OrderSurat.create({
        episodeId: episode.uuid,
        suratrujukanId: result.uuid,
        status: 'confirm',
        jenisSurat: 'rujukan',
        versiSurat: '1.0',
        total: 0 // Assuming there's no cost for this type of order
    });

    await Episode.update({ status: 'in process' }, { where: { uuid: episode.uuid } });

    return result;
};



module.exports = {
    createOrderObat,
    getALlOrderObatbyFarmasi,
    createOrderItem,
    createOrderSuratRujukan,
    createOrderSuratSakit,
};
