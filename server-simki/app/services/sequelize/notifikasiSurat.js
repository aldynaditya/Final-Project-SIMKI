const EMRPasien = require('../../api/v1/emrPasien/model');
const Appointment = require('../../api/v1/appointment/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Episode = require('../../api/v1/episode/model');
const Schedule = require('../../api/v1/schedule/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const OrderSurat = require('../../api/v1/orderSurat/model');
const SuratSakit = require('../../api/v1/suratSakit/model');
const { 
    BadRequestError, 
    NotFoundError, 
    UnauthorizedError 
} = require('../../errors');
const { getNextVersion } = require('../../utils');

//ini mesti dibuat 2 satunya untuk diakses oleh doctor satunya untuk resepsionis
//difilter berdasarkan nilai pada atribut status untuk doctor 'in process', dan untuk resepsionis 'updated'
const getAllSuratSakit = async (req, res) => {
    const notifikasi = await OrderSurat.findAll({
        attributes: ['status','updatedAt'],
        include: [
            {
                model: Episode,
                as: 'episode',
                include: {
                    model: EMRPasien,
                    include: {
                        model: Appointment,
                        include: {
                            model: DataPasien,
                            as: 'datapasien',
                            attributes: ['nama_lengkap']
                        }
                    }
                }
            },
            {
                model: SuratSakit,
                as: 'suratsakit'
            }
        ]
    });

    const result = notifikasi.map(notifikasi => {
        const emr = notifikasi.episode.emrPasien;
        const datapasien = emr.appointment.datapasien;
        const suratsakit = notifikasi.suratsakit;

        return{
            noEMR: emr.noEMR,
            namaPasien: datapasien.nama_lengkap,
            tanggal: notifikasi.updatedAt,
            status: notifikasi.status,
            idsuratsakit: suratsakit.uuid
        }
    });

    return result;
};

const updateSuratSakit = async (req) => {
    const { id } = req.params;
    const { periode_start, periode_end } = req.body;

    const suratSakit = await SuratSakit.findByPk(id);
    if (!suratSakit) throw new NotFoundError('Surat Sakit tidak ditemukan');

    let updateData = {};
    let updateVersion = false;

    if (periode_start !== undefined && periode_start !== suratSakit.periode_start) {
        updateData.periode_start = periode_start;
        updateVersion = true;
    }

    if (periode_end !== undefined && periode_end !== suratSakit.periode_end) {
        updateData.periode_end = periode_end;
        updateVersion = true;
    }

    if (updateVersion) {
        const versi_surat = await getNextVersion(SuratSakit, 'suratsakitId', suratSakit.uuid);

        console.log('Versi Surat baru:', versi_surat)
        await OrderSurat.update(
            { versi_surat, status: 'in process' }, 
            { where: { suratsakitId: suratSakit.uuid } });
    }
    
    await SuratSakit.update(updateData, { where: { uuid: suratSakit.uuid } });

    const updatedSuratSakit = await SuratSakit.findByPk(id);

    // Ambil OrderSurat yang terkait dengan SuratSakit yang telah diperbarui
    const orderSurat = await OrderSurat.findOne({ where: { suratsakitId: suratSakit.uuid } });

    return { suratsakit: updatedSuratSakit, ordersurat: orderSurat };
};

const updateStatusbyDoctor = async (req) => {
    const { id } = req.params;

    const suratSakit = await SuratSakit.findByPk(id);
    if (!suratSakit) throw new NotFoundError('Surat Sakit tidak ditemukan');

    await OrderSurat.update({ status: 'updated' }, { where: { suratsakitId: suratSakit.uuid } });

    const updatedOrderSurat = await OrderSurat.findOne({
        where: { suratsakitId: suratSakit.uuid },
        attributes: ['status']
    });

    return updatedOrderSurat;
};

module.exports = {
    getAllSuratSakit,
    updateSuratSakit,
    updateStatusbyDoctor
}
