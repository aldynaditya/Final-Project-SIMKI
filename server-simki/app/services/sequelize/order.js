const EMRPasien = require('../../api/v1/emrPasien/model');
const Appointment = require('../../api/v1/appointment/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Episode = require('../../api/v1/episode/model');
const Schedule = require('../../api/v1/schedule/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const OrderObat = require('../../api/v1/orderObat/model');
const Obat = require('../../api/v1/obat/model');
const { 
    BadRequestError, 
    NotFoundError,
} = require('../../errors');


const getOrderDetailInformation = async(req) => {
    const { id } = req.params;

    const episode = await Episode.findOne({
        include: [
            {
                model: EMRPasien,
                as: 'emrpasien',
                include:
                {
                    model: Appointment,
                    as: 'appointment',
                    include: [
                        {
                            model: DataPasien,
                            as: 'datapasien',
                        },
                        {
                            model: Schedule,
                            as: 'schedule',
                            include: {
                                model: UserKlinik,
                                as: 'user_klinik',
                            }
                        }
                    ]
                }
            }
        ],
        where: { uuid: id}
    });

    if (!episode) {
        throw new NotFoundError('Detail tidak ditemukan');
    }

    const emr = episode.emrpasien
    const detail = emr.appointment;
    const datapasien = detail.datapasien;

    const result = {
        id: episode.uuid,
        noEMR: emr.noEMR,
        tanggal: detail.tanggal,
        jam: episode.createdAt,
        pemeriksa: detail.schedule.user_klinik.nama,
        namaPasien: datapasien.nama_lengkap,
        nomorFaktur: episode.invoiceNumber,
        poli: detail.schedule.poli,
    };

    return result;
};

const getALlOrderObatbyFarmasi = async() => {
    const orderObat = await OrderObat.findAll({
        include: [
            {
                model: Episode,
                as: 'episode',
                include: {
                    model: EMRPasien,
                    as: 'emrpasien',
                    include: {
                        model: Appointment,
                        include: [{
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
        const emr = episode.emrpasien;
        const appointment = emr.appointment;
        const datapasien = appointment.datapasien;
        const schedule = appointment.schedule;
        
        return{
            id: orderobat.uuid,
            noInvoice: episode.invoiceNumber,
            dateAndTime: orderobat.createdAt,
            noEMR: emr.noEMR,
            namaPasien: datapasien.nama_lengkap,
            namaDokter: schedule.user_klinik.nama,
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

const updateOrderStatusbyFarmasi = async (req) =>{
    const { id } = req.params;

    const order = await OrderObat.findByPk(id);
    if (!order) throw new NotFoundError('Order not found');

    order.status = 'accepted';
    await order.save();
}

module.exports = {
    getALlOrderObatbyFarmasi,
    updateOrderStatusbyFarmasi,
    getOrderDetailInformation,
};
