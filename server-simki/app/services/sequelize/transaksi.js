const Appointment = require('../../api/v1/appointment/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Schedule = require('../../api/v1/schedule/model');
const EMRPasien = require('../../api/v1/emrPasien/model');
const Episode = require('../../api/v1/episode/model');
const Transaksi = require('../../api/v1/transaksi/model');
const OrderObat = require('../../api/v1/orderObat/model');
const OrderProsedur = require('../../api/v1/orderProsedur/model');
const Obat = require('../../api/v1/obat/model');
const Item = require('../../api/v1/item/model');
const { 
    NotFoundError, 
} = require('../../errors');
const { Op } = require('sequelize');

const getAllOrders = async () => {
    const orders = await Transaksi.findAll({
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
                                attributes: ['nama_lengkap', 'alamat']
                            },
                            {
                                model: Schedule,
                                as: 'schedule',
                                include: {
                                    model: UserKlinik,
                                    as: 'user_klinik'
                                }
                            }
                        ]
                    }
                }
            },
            {
                model: UserKlinik,
                as: 'user',
            }
        ]
    });

    const result = await Promise.all(
        orders.map(async (transaksi) => {
            const episodeId = transaksi.episodeId;

            const [ordersObat, ordersProsedur] = await Promise.all([
                OrderObat.findAll({
                    where: { episodeId },
                    include: [
                        {
                            model: Obat,
                            as: 'dataobat'
                        }
                    ]
                }),
                OrderProsedur.findAll({
                    where: { episodeId },
                    include: [
                        {
                            model: Item,
                            as: 'dataitem'
                        }
                    ]
                })
            ]);

            return {
                id: transaksi.uuid,
                noInvoice: transaksi.episode.invoiceNumber,
                tanggaldaftar: transaksi.episode.emrpasien.appointment.tanggal,
                tanggalpembayaran: transaksi.updatedAt,
                tanggaldibuat: transaksi.episode.updatedAt,
                noEMR: transaksi.episode.emrpasien.noEMR,
                namaPasien: transaksi.episode.emrpasien.appointment.datapasien.nama_lengkap,
                alamatPasien: transaksi.episode.emrpasien.appointment.datapasien.alamat,
                penjamin: transaksi.episode.emrpasien.appointment.penjamin,
                metodeBayar: transaksi.metode_bayar,
                diskon: transaksi.diskon,
                status: transaksi.status,
                totalOrder: transaksi.total_order,
                total: transaksi.total,
                petugas: transaksi.user.nama,
                poli: transaksi.episode.emrpasien.appointment.schedule.poli,
                dokter: transaksi.episode.emrpasien.appointment.schedule.user_klinik.nama,
                ordersObat: ordersObat.map(order => ({
                    uuid: order.uuid,
                    kuantitas: order.kuantitas,
                    dosis: order.dosis,
                    catatan: order.catatan,
                    total: order.total,
                    namaobat: order.dataobat.nama_obat,
                    kodeobat: order.dataobat.kode_obat
                })),
                ordersProsedur: ordersProsedur.map(order => ({
                    uuid: order.uuid,
                    kuantitas: order.kuantitas,
                    dosis: order.dosis,
                    catatan: order.catatan,
                    total: order.total,
                    namaitem: order.dataitem.nama_item,
                    kodeitem: order.dataitem.kode_item
                }))
            };
        })
    );

    return result;
};

const updateTransaction = async (req) => {
    const { id } = req.params;
    const { metode_bayar, diskon, keterangan } = req.body;

    const transaction = await Transaksi.findByPk(id, {
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
                                attributes: ['nama_lengkap', 'alamat']
                            },
                            {
                                model: Schedule,
                                as: 'schedule',
                                include: {
                                    model: UserKlinik,
                                    as: 'user_klinik'
                                }
                            }
                        ]
                    }
                }
            }
        ]
    });

    if (!transaction) throw new NotFoundError('Transaksi tidak ditemukan');

    if (transaction.status === 'Completed') {
        throw new Error('Transaksi sudah selesai dan tidak dapat diubah');
    }

    const episodeId = transaction.episodeId;

    const totalAfterDiscount = transaction.total - (transaction.total * (diskon / 100));

    const transaksi = await Transaksi.update({
        metode_bayar,
        diskon,
        keterangan,
        total: totalAfterDiscount,
        status: 'Completed',
        userKlinikId: req.user.id
    }, {
        where: { uuid: id },
        returning: true
    });

    await OrderObat.update({
        status: 'paid',
    }, {
        where: { episodeId },
        returning: true
    });

    return transaksi;
};

const filterAllTransactionByPeriod = async (req) => {
    const { startDate, endDate } = req.query;

    const adjustedEndDate = new Date(new Date(endDate).getTime() + 24 * 60 * 60 * 1000);

    const transaksi = await Transaksi.findAll({
        where: {
            createdAt: {
                [Op.between]: [new Date(startDate), adjustedEndDate]
            },
            status: 'Completed'
        },
        include: [
            {
                model: Episode,
                as: 'episode',
                include: {
                    model: EMRPasien,
                    as: 'emrpasien',
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
                model: UserKlinik,
                as: 'user',
            }
        ]
    });

    if (transaksi.length === 0) {
        throw new NotFoundError('Tidak ada transaksi pada periode tersebut.');
    }

    const result = transaksi.map(transaksi => {
        const episode = transaksi.episode;
        const emr = episode.emrpasien;
        const appointment = emr.appointment;
        const datapasien = appointment.datapasien;

        return{
            id: transaksi.uuid,
            noInvoice: episode.invoiceNumber,
            tanggal: transaksi.createdAt,
            noEMR: emr.noEMR,
            namaPasien: datapasien.nama_lengkap,
            penjamin: appointment.penjamin,
            metodeBayar: transaksi.metode_bayar,
            total: transaksi.total,
            petugas: transaksi.user.nama
        }
    });

    return result;
};

module.exports = {
    getAllOrders,
    updateTransaction,
    filterAllTransactionByPeriod
}
