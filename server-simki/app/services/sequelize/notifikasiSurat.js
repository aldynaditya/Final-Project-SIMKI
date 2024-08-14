const EMRPasien = require('../../api/v1/emrPasien/model');
const Appointment = require('../../api/v1/appointment/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Episode = require('../../api/v1/episode/model');
const OrderSurat = require('../../api/v1/orderSurat/model');
const SuratSakit = require('../../api/v1/suratSakit/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const Schedule = require('../../api/v1/schedule/model');
const { 
    NotFoundError, 
} = require('../../errors');
const { getNextVersion } = require('../../utils');

const getAllSuratSakit = async (req) => {
    const nama = req.user.nama;

    const notifikasi = await OrderSurat.findAll({
        include: [
            {
                model: Episode,
                as: 'episode',
                include: {
                    model: EMRPasien,
                    as: 'emrpasien',
                    include: {
                        model: Appointment,
                        include: [
                            {
                                model: DataPasien,
                                as: 'datapasien',
                                attributes: ['nama_lengkap']
                            },
                            {
                                model: Schedule,
                                as: 'schedule',
                                include: {
                                    model: UserKlinik,
                                    as: 'user_klinik',
                                    where: {
                                        nama: nama
                                    }
                                }
                            }
                        ]
                    }
                }
            },
            {
                model: SuratSakit,
                as: 'suratsakit'
            }
        ]
    });

    const result = notifikasi
        .filter(notifikasi => notifikasi.suratsakit !== null)
        .map(notifikasi => {
            const emr = notifikasi.episode.emrpasien;
            const datapasien = emr.appointment.datapasien;
            const suratsakit = notifikasi.suratsakit;
            const userklinik = emr.appointment.schedule.user_klinik;

            return {
                id: notifikasi.uuid,
                noEMR: emr.noEMR,
                namaPasien: datapasien.nama_lengkap,
                versi_surat: notifikasi.versi_surat,
                tanggal: notifikasi.updatedAt,
                status: notifikasi.status,
                idsuratsakit: suratsakit.uuid,
                pemeriksa:userklinik.nama
            };
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
            { versi_surat, status: 'updated' }, 
            { where: { suratsakitId: suratSakit.uuid } });
    }
    
    await SuratSakit.update(updateData, { where: { uuid: suratSakit.uuid } });

    const updatedSuratSakit = await SuratSakit.findByPk(id);

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
