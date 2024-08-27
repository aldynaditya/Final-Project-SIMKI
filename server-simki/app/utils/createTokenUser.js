const createTokenUser = (user) => {
    return {
        nama: user.userKlinik.nama,
        userId: user.uuid,
        role: user.role,
        email: user.email,
    };
};

const createTokenPasien = (pasien) => {
    return {
        nama: pasien.nama_lengkap,
        pasienId: pasien.uuid,
        role: pasien.role,
        email: pasien.email,
    };
};

const createTokenPassword = (pasien) => {
    return {
        pasienId: pasien.uuid,
        email: pasien.email,
        password: pasien.password,
        role: pasien.role,
        status: pasien.status,
        otp: pasien.otp,
        createdAt: pasien.createdAt,
        updatedAt: pasien.updatedAt
    };
};

module.exports = { 
    createTokenUser, 
    createTokenPasien,
    createTokenPassword
};