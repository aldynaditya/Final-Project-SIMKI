export const getRolePath = (role) => {
    switch (role) {
        case 'dokter':
            return '/Dokter';
        case 'perawat':
            return '/Perawat';
        // Add more cases as needed
        default:
            return '/';
    }
};