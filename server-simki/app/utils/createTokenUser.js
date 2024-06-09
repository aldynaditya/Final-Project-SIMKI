const createTokenUser = (user) => {
    return {
        name: user.name,
        userId: user.uuid, // Menggunakan uuid sebagai userId
        role: user.role,
        email: user.email,
        superuser: user.superuser,
    };
};

const createTokenPasien = (pasien) => {
    return {
        name: pasien.nama_lengkap,
        pasienId: pasien.uuid, // Menggunakan uuid sebagai pasienId aaa
        role: pasien.role,
        email: pasien.email,
    };
};

module.exports = { 
    createTokenUser, 
    createTokenPasien
};