const Appointment = require('../../api/v1/appointment/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const EMRPasien = require('../../api/v1/emrPasien/model');
const Episode = require('../../api/v1/episode/model');
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

const getAllOrders = async () => {
    const order = await Transaksi.findAll({
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
                model: UserKlinik,
                as: 'user',
            }
        ]
    });

    const result = order.map(transaksi => {
        const episode = transaksi.episode;
        const emr = episode.emrPasien;
        const appointment = emr.appointment;
        const datapasien = appointment.datapasien;

        return{
            noInvoice: episode.invoiceNumber,
            tanggal: appointment.tanggal,
            noEMR: emr.noEMR,
            namaPasien: datapasien.nama_lengkap,
            penjamin: appointment.penjamin,
            metodeBayar: transaksi.metodeBayar,
            total: transaksi.total,
            petugas: transaksi.user.nama
        }
    });

    return result;
};

const getOrderDetails = async (req) => {
    const { id } = req.params;

    const transaksi = await Transaksi.findOne({ where: { uuid: id }});

    if (!transaksi) throw new NotFoundError('Transaction not found');

    const episodeId = transaksi.episodeId
    const ordersObat = await OrderObat.findAll({
        where: { episodeId },
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
            }
        ]
    });

    const ordersProsedur = await OrderProsedur.findAll({
        where: { episodeId },
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
            }
        ]
    });

    const result = {
        transaksi,
        ordersObat,
        ordersProsedur
    };

    return result;
};

// ini masih perlu perbaikan, karena klo ada dua macam order masih ga bisa jumlahin
const updateTransaction = async (req) => {
    const { id } = req.params;
    const { metodeBayar, diskon, keterangan } = req.body;

    const transaction = await Transaksi.findByPk(id);
    if (!transaction) throw new NotFoundError('Transaction not found');

    const totalAfterDiscount = transaction.total - (transaction.total * (diskon / 100));

    const transaksi = await Transaksi.update({
        metodeBayar,
        diskon,
        keterangan,
        total: totalAfterDiscount,
        status: 'Completed',
        userId: req.user.id
    }, {
        where: { uuid: id },
        returning: true
    });

    return transaksi;
};

module.exports = {
    getAllOrders,
    getOrderDetails,
    updateTransaction
}
