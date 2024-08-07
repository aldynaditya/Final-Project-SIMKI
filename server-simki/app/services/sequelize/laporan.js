const Laporan = require('../../api/v1/laporan/model');
const { 
    BadRequestError, 
    NotFoundError 
} = require('../../errors');


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
        userKlinikId: req.user.id
    });

    if (req.file) {
        newLaporan.file_path = req.file.path;
        await newLaporan.save();
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
    const { id } = req.params;
    const { status } = req.body;

    if (status !== 'accepted' && status !== 'rejected') {
        throw new BadRequestError( 'status harus "accepted" atau "rejected"' );
    }

    const laporan = await Laporan.findByPk(id);

    if (!laporan) {
        throw new NotFoundError( 'Laporan tidak ditemukan' );
    }

    laporan.status = status;
    await laporan.save();

    return laporan;
};

module.exports = {
    getAllLaporan,
    createLaporan,
    getAllLaporanByPimpinan,
    updateStatusLaporan
};
