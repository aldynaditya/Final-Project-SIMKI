const createTokenUser = (user) => {
    return {
        name: user.name,
        userId: user.uuid,
        role: user.role,
        email: user.email,
        superuser: user.superuser,
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