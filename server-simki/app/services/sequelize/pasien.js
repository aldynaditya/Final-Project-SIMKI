const Pasien = require('../../api/v1/pasien/model');
const Schedule = require('../../api/v1/schedule/model');
const Appointment = require('../../api/v1/appointment/model');
const {
    BadRequestError,
    NotFoundError,
    UnauthorizedError,
} = require('../../errors');
const { createTokenPasien, createJWT } = require('../../utils');
const { otpMail } = require('../mail');
const { getDayOfWeek } = require('../functionConvert');

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
            nik,
            nama_lengkap,
            tempat_lahir,
            tanggal_lahir,
            jenis_kelamin,
            gol_darah,
            suku_bangsa,
            alamat,
            email,
            password,
            otp: Math.floor(Math.random() * 9999),
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

const createAppointment = async (req, res) => {
    const { tanggal, keluhan } = req.body;
    const { id: pasienId } = req.pasien;
    const dayOfWeek = getDayOfWeek(tanggal);

    const schedule = await Schedule.findOne({
        where: {
            hari: dayOfWeek,
            status: 'ada'
        }
    });

    if (!schedule) throw new NotFoundError( 'No available doctor on the selected date.' );

    const result = await Appointment.create({
        tanggal,
        keluhan,
        pasienId,
        scheduleId: schedule.uuid
    });

    return result;
};

module.exports = {
    signupPasien,
    activatePasien,
    signinPasien,
    createAppointment
};