const Laporan = require('../../api/v1/laporan/model');


const getAllLaporan = async () => {
    const result = await Laporan.findAll();

    return result;
};

const createLaporan = async (req, res) => {
    const { noLaporan, periode } = req.body;
    const existingLaporan = await Laporan.findOne({ where: { no_laporan: noLaporan }, order: [['createdAt', 'DESC']] });

    let version = 'v1.0';
    if (existingLaporan) {
        const currentVersion = parseFloat(existingLaporan.keterangan.split('v')[1]);
        version = `v${(currentVersion + 1.0).toFixed(1)}`;
    }

    const newLaporan = await Laporan.create({
        no_laporan: noLaporan,
        periode,
        keterangan: version,
        tanggal: new Date(),
        userId: req.user.id
    });

    // Save file info to the database
    if (req.file) {
        newLaporan.file_path = req.file.path; // Simpan path file
        await newLaporan.save(); // Simpan perubahan ke database
    }

    return newLaporan;
};

const getAllLaporanByPimpinan = async () => {
    const result = await Laporan.findAll({
        where: {status : 'in process'}
    });

    return result;
};

const updateStatusLaporan = async (req, res) => {
    const { id } = req.params; // Ambil ID laporan dari parameter URL
    const { status } = req.body; // Ambil status baru dari body

    if (status !== 'accepted' && status !== 'rejected') {
        return res.status(400).json({ message: 'Status must be accepted or rejected' });
    }

    const laporan = await Laporan.findByPk(id); // Mencari laporan berdasarkan ID

    if (!laporan) {
        return res.status(404).json({ message: 'Laporan not found' });
    }

    laporan.status = status; // Update status
    await laporan.save(); // Simpan perubahan

    return laporan;
};

module.exports = {
    getAllLaporan,
    createLaporan,
    getAllLaporanByPimpinan,
    updateStatusLaporan
};
