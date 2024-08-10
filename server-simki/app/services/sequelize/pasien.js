const Pasien = require('../../api/v1/pasien/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Schedule = require('../../api/v1/schedule/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const Appointment = require('../../api/v1/appointment/model');
const EMRPasien = require('../../api/v1/emrPasien/model');
const Episode = require('../../api/v1/episode/model');
const OrderObat = require('../../api/v1/orderObat/model');
const OrderProsedur = require('../../api/v1/orderProsedur/model');
const Obat = require('../../api/v1/obat/model');
const Item = require('../../api/v1/item/model');
const Response = require('../../api/v1/kuisioner/responses/model');
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} = require('../../errors');
const { 
    createTokenPasien,
    createTokenPassword,
    isTokenValid, 
    createJWT,
    getDayOfWeek,
    validateTimeFormat,
} = require('../../utils');
const { 
    otpMail 
} = require('../mail');

const signupPasien = async (req) => {
    const { nik, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, gol_darah, kewarganegaraan, alamat, email, password } = req.body;

    let result = await Pasien.findOne({
        where: { email, status: 'tidak aktif' }
    });

    if (result) {
        result.nik = nik;
        result.nama_lengkap = nama_lengkap;
        result.tempat_lahir = tempat_lahir;
        result.tanggal_lahir = tanggal_lahir;
        result.jenis_kelamin = jenis_kelamin;
        result.gol_darah = gol_darah;
        result.kewarganegaraan = kewarganegaraan;
        result.alamat = alamat;
        result.email = email;
        result.password = password;
        result.otp = Math.floor(Math.random() * 9999);
        await result.save();
    } else {
        try {
            result = await Pasien.create({
                email,
                password,
                otp: Math.floor(Math.random() * 9999),
            });

            await DataPasien.create({
                nik,
                nama_lengkap,
                tempat_lahir,
                tanggal_lahir,
                jenis_kelamin,
                gol_darah,
                kewarganegaraan,
                alamat,
                userId: result.uuid,
            });
        } catch (err) {
            if (result) {
                await result.destroy();
            }
            throw err;
        }
    }

    const data = { otp: result.otp };
    await otpMail(email, data, 'otp');

    delete result.dataValues.password;
    delete result.dataValues.otp;

    return result;
};

const resendOtp = async (req) => {
    const { email } = req.body;

    const pasien = await Pasien.findOne({
        where: { 
            email,
            status: 'tidak aktif' 
        }
    });
    if (!pasien) throw new NotFoundError('Partisipan tidak ditemukan')

    await pasien.generateAndSaveNewOtp();

    const data = { otp: pasien.otp };

    await otpMail(email, data, 'otp');

    return data;
}

const activatePasien = async (req) => {
    const { otp, email } = req.body;
    const check = await Pasien.findOne({
        where: { email }
    });

    if (!check) throw new NotFoundError('Partisipan belum terdaftar');

    if (check.otp !== otp) throw new BadRequestError('Kode otp salah');

    const result = await check.update({ status: 'aktif' });
    
    delete result.dataValues.password;
    delete result.dataValues.otp;

    return result;
};

const signinPasien = async (req) => {
    const { email, password } = req.body;

    if (!email || !password) throw new BadRequestError('Please provide email and password');
    

    const result = await Pasien.findOne({ where: { email } });

    if (!result) throw new UnauthorizedError('Invalid Credentials');

    if (result.status === 'tidak aktif') throw new UnauthorizedError('Akun anda belum aktif');

    const isPasswordCorrect = await result.comparePassword(password);

    if (!isPasswordCorrect) throw new UnauthorizedError('Invalid Credentials');

    const token = createJWT({ payload: createTokenPasien(result) });

    return { 
        token: token,
        role: result.role
    };
};

const sendResetPasswordEmail = async (req, res) => {
    const { email } = req.body;

    const user = await Pasien.findOne({ where: { email } });

    if (!user) throw new NotFoundError('Partisipan belum terdaftar');

    const token = createJWT({ payload: createTokenPassword(user) });

    const resetUrl = `http://localhost:3000/ganti-password?token=${token}`;

    const data = { resetUrl };

    await otpMail(email, data, 'reset-password');

    return { message: 'Password reset email sent', resetUrl };
};

const resetPassword = async (req) => {
    const { token, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) throw new BadRequestError('Password tidak cocok');

    let payload;
    try {
        payload = isTokenValid({ token });
    } catch (error) {
        throw new BadRequestError('Token tidak valid atau telah kedaluwarsa');
    }

    const { email } = payload;

    const user = await Pasien.findOne({ where: { email } });

    if (!user) throw new NotFoundError('Partisipan tidak ditemukan');

    user.password = newPassword;
    await user.save();

    return { message: 'Password berhasil diubah' };
};

const getpasienAppointments = async (req) => {
    const user = req.pasien;

    const result = await Appointment.findAll({
        include: [
            {
                model: DataPasien,
                as: 'datapasien',
                where: { userId: user.pasienId }
            },
            {
                model: Schedule,
                as: 'schedule',
                attributes: ['hari', 'poli', 'start_time', 'end_time'],
                include: {
                    model: UserKlinik,
                    attributes: ['nama'],
                    as: 'user_klinik'
                },
            },
        ]
    });

    const formattedResult = result.map(appointment => {
        const { schedule } = appointment;
        const startTime = schedule.start_time.slice(0, 5);
        const endTime = schedule.end_time.slice(0, 5);

        return {
            id: appointment.uuid,
            tanggal: appointment.tanggal,
            nama_dokter: schedule.user_klinik.nama,
            jam: `${startTime}-${endTime}`,
            poli: schedule.poli,
            keterangan: appointment.keterangan,
            penjamin: appointment.penjamin,
            status: appointment.status,
            dibuat: appointment.createdAt,
            diupdate: appointment.updatedAt
        };
    });

    return formattedResult;
};

const createAppointment = async (req) => {
    const { tanggal, keluhan, penjamin, dokter, poli, start_time, end_time } = req.body;
    const { pasienId } = req.pasien;
    
    const dayOfWeek = getDayOfWeek(tanggal);
    const schedule = await Schedule.findOne({
        where: {
            hari: dayOfWeek,
            status: 'ada',
            poli
        },
        include: [
            {
                model: UserKlinik,
                as: 'user_klinik',
                where: {
                    nama: dokter,
                },
                attributes: ['nama'],
            },
        ],
    });

    if (!schedule) throw new NotFoundError('Tidak ada Dokter yang tersedia pada tanggal itu');

    const formattedStartTime = validateTimeFormat(start_time);
    const formattedEndTime = validateTimeFormat(end_time);

    if (formattedStartTime < schedule.start_time || formattedEndTime > schedule.end_time) {
        throw new Error('Waktu janji tidak sesuai dengan jadwal dokter');
    }

    const dataPasien = await DataPasien.findOne({
        where: { userId: pasienId }
    });

    if (!dataPasien) throw new NotFoundError('Data Pasien tidak ditemukan');

    const result = await Appointment.create({
        tanggal,
        keluhan,
        penjamin,
        pasienId: dataPasien.uuid,
        dataPasienId: dataPasien.uuid,
        scheduleId: schedule.uuid,
        start_time: formattedStartTime,
        end_time: formattedEndTime
    });

    return result;
};

const getDataPasien = async (req) => {
    const { pasienId } = req.pasien;

    const dataPasien = await DataPasien.findOne({
        where: { userId: pasienId }
    });

    if (!dataPasien) throw new NotFoundError('Data Pasien tidak ditemukan');

    return dataPasien;
};

const updateDataPasien = async (req) => {
    const { nik, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, gol_darah, kewarganegaraan, alamat } = req.body;
    const { pasienId } = req.pasien;

    const [updatedRows] = await DataPasien.update(
        {
            nik,
            nama_lengkap,
            tempat_lahir,
            tanggal_lahir,
            jenis_kelamin,
            gol_darah,
            kewarganegaraan,
            alamat,
        },
        { where: { userId: pasienId } }
    );

    if (updatedRows === 0) throw new NotFoundError('Data Pasien tidak ditemukan');

    const updatedDataPasien = await DataPasien.findOne({
        where: { userId: pasienId }
    });

    return updatedDataPasien;
};

const getAllVisitHistory = async (req) =>  {
    const { role, pasienId } = req.pasien;
    const query = req.query;

    if (role !== 'pasien') throw new UnauthorizedError('Akses Ditolak');

    let whereClause = {
        '$EMRPasien.appointment.datapasien.pasien.uuid$': pasienId,
        ...query,
    };

    const history = await Episode.findAll({
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
                            include: {
                                model: Pasien
                            }
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
        where: whereClause
    });

    const result = history.map(episode => {
        const emr = episode.emrpasien
        const history = emr.appointment;
        
        return{
            id: episode.uuid,
            tanggal: history.tanggal,
            dokter: history.schedule.user_klinik.nama,
            poli: history.schedule.poli,
            keterangan: emr.status,
        }
    });

    return result;
};

const getDetailVisitHistory = async (req) =>  {
    const { role, pasienId } = req.pasien;
    const { id } = req.params;

    if (role !== 'pasien') throw new UnauthorizedError('Akses Ditolak');

    const whereClause = {
        uuid: id,
        '$EMRPasien.appointment.datapasien.pasien.uuid$': pasienId
    };

    const history = await Episode.findOne({
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
                            include: {
                                model: Pasien
                            }
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
        where: whereClause
    });

    if (!history) throw new NotFoundError('Detail tidak ditemukan');

    const episodeId = history.uuid;

    const [ordersObat, ordersProsedur] = await Promise.all([
        OrderObat.findAll({
            where: { episodeId },
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
                    model: Obat,
                    as: 'dataobat'
                }
            ]
        }),
        OrderProsedur.findAll({
            where: { episodeId },
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
                    model: Item,
                    as: 'dataitem'
                }
            ]
        })
    ]);

    const historyDetail = history.emrpasien.appointment;

    const result = {
        emrId: history.emrpasien.uuid,
        tanggal: historyDetail.tanggal,
        dokter: historyDetail.schedule.user_klinik.nama,
        poli: historyDetail.schedule.poli,
        diagnosis: history.assessment,
        orders: {
            obat: ordersObat.map(order => order.dataobat.nama_obat),
            prosedur: ordersProsedur.map(order => order.dataitem.nama_item),
        },
        tindakan: history.plan
    };

    return result;
};


const submitResponses = async (req) => {
    const { id } = req.params;
    const { responses } = req.body;

    const episode = await Episode.findOne({
        where: { uuid: id },
    });

    if (!episode) throw new NotFoundError('Detail tidak ditemukan');

    const emrpasienId = episode.emrPasienId;

    const validAnswers = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];

    const formattedResponses = responses.map(response => {
        if (!validAnswers.includes(response.answer)) {
            throw new Error(`Invalid answer value: ${response.answer}`);
        }
        return {
            ...response,
            answer: response.answer,
        };
    });

    const result = await Promise.all(
        formattedResponses.map(response =>
            Response.create({
                answer: response.answer,
                questionId: response.questionId,
                emrpasienId: emrpasienId,
            })
        )
    );

    return result;
};


module.exports = {
    signupPasien,
    resendOtp,
    activatePasien,
    signinPasien,
    sendResetPasswordEmail,
    resetPassword,
    getDataPasien,
    updateDataPasien,
    createAppointment,
    getpasienAppointments,
    getAllVisitHistory,
    getDetailVisitHistory,
    submitResponses
};