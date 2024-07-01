const Pasien = require('../../api/v1/pasien/model');
const DataPasien = require('../../api/v1/dataPasien/model');
const Schedule = require('../../api/v1/schedule/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const Appointment = require('../../api/v1/appointment/model');
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} = require('../../errors');
const { 
    createTokenPasien, 
    createJWT,
    getDayOfWeek
} = require('../../utils');
const { otpMail } = require('../mail');

const signupPasien = async (req) => {
    const { nik, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, gol_darah, suku_bangsa, alamat, email, password } = req.body;

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
        result.suku_bangsa = suku_bangsa;
        result.alamat = alamat;
        result.email = email;
        result.password = password;
        result.otp = Math.floor(Math.random() * 9999);
        await result.save();
    } else {
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
            suku_bangsa,
            alamat,
            userId: result.uuid,
        });
    }

    await otpMail(email, result);

    delete result.dataValues.password;
    delete result.dataValues.otp;

    return result;
};

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

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    const result = await Pasien.findOne({ where: { email } });

    if (!result) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    if (result.status === 'tidak aktif') {
        throw new UnauthorizedError('Akun anda belum aktif');
    }

    const isPasswordCorrect = await result.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new UnauthorizedError('Invalid Credentials');
    }

    const token = createJWT({ payload: createTokenPasien(result) });

    return token;
};

const getpasienAppointments = async (req) => {
    const user = req.pasien;

    const result = await Appointment.findAll({
        include: [
            {
                model: DataPasien,
                as: 'datapasien',
                where: { userId: user.id }
            },
            {
                model: Schedule, // Include the Schedule model
                attributes: ['hari', 'poli'], // Specify the attributes you want to include
                include: {
                    model: UserKlinik,
                    attributes: ['name'], // Include doctor's name
                    as: 'user_klinik' // Use the alias for UserKlinik model
                },
            },
        ]
    });

    const formattedResult = result.map(appointment => {
        return {
            tanggal: appointment.tanggal,
            nama_dokter: appointment.schedule ? appointment.schedule.user_klinik.name : null,
            poli: appointment.schedule ? appointment.schedule.poli : null,
            keterangan: appointment.keterangan,
            penjamin: appointment.penjamin,
            status: appointment.status,

        };
    });

    return formattedResult;
};

const createAppointment = async (req, res) => {
    const { tanggal, keluhan, penjamin, dokter, poli } = req.body;
    const { id: pasienId } = req.pasien;
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
                    name: dokter,
                },
                attributes: ['name'],
            },
        ],
    });

    if (!schedule) throw new NotFoundError( 'Tidak ada Dokter yang tersedia pada tanggal itu' );

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
        scheduleId: schedule.uuid
    });

    return result;
};

const getDataPasien = async (req) => {
    const { id: pasienId } = req.pasien;

    const dataPasien = await DataPasien.findOne({
        where: { userId: pasienId }
    });

    if (!dataPasien) {
        throw new NotFoundError('Data Pasien tidak ditemukan');
    }

    return dataPasien;
};

const updateDataPasien = async (req) => {
    const { nik, nama_lengkap, tempat_lahir, tanggal_lahir, jenis_kelamin, gol_darah, suku_bangsa, alamat } = req.body;
    const { id: pasienId } = req.pasien;

    const [updatedRows] = await DataPasien.update(
        {
            nik,
            nama_lengkap,
            tempat_lahir,
            tanggal_lahir,
            jenis_kelamin,
            gol_darah,
            suku_bangsa,
            alamat,
        },
        { where: { userId: pasienId } }
    );

    if (updatedRows === 0) {
        throw new NotFoundError('Data Pasien tidak ditemukan');
    }

    const updatedDataPasien = await DataPasien.findOne({
        where: { userId: pasienId }
    });

    return updatedDataPasien;
};


module.exports = {
    signupPasien,
    activatePasien,
    signinPasien,
    getDataPasien,
    updateDataPasien,
    createAppointment,
    getpasienAppointments
};