const createTokenUser = (user) => {
    return {
        nama: user.nama,
        userId: user.uuid,
        role: user.role,
        email: user.email,
    };
};

const createTokenPasien = (pasien) => {
    return {
        name: pasien.nama_lengkap,
        pasienId: pasien.uuid,
        role: pasien.role,
        email: pasien.email,
    };
};

module.exports = { 
    createTokenUser, 
    createTokenPasien
};