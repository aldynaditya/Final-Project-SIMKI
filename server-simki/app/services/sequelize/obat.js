const Obat = require('../../api/v1/obat/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllObat = async (req) => {
    const result = await Obat.findAll();

    return result;
};

const createObat = async (req) => {
    const {nama_obat, kode_obat, harga_satuan_obat, satuan, stok} = req.body;
    // Cari obat berdasarkan nama dan organizer
    // const check = await Obat.findOne({ where: { nama_obat, organizer: req.user.organizer } });
    // const check = await Obat.findOne
    // // Jika obat sudah ada, tampilkan error bad request
    // if (check) throw new BadRequestError('kategori nama duplikat');

    const result = await Obat.create({
        nama_obat: nama_obat,
        kode_obat: kode_obat,
        harga_satuan_obat: harga_satuan_obat,
        satuan: satuan,
        stok: stok,
    });

    return result;
};

const getOneObat = async (req) => {
    const { id } = req.params;

    const result = await Obat.findOne({ where: {uuid: id} });

    if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

    return result;
};

// const updateObat = async (req) => {
//     const { id } = req.params;
//     const { nama_obat, kode_obat, harga_satuan_obat, satuan, stok } = req.body;

//     // Cari obat berdasarkan nama dan organizer, kecuali id yang dikirim dari params
//     const check = await Obat.findOne({
//         where: { nama_obat, organizer: req.user.organizer, uuid: { $ne: id } },
//     });

//     // Jika obat sudah ada, tampilkan error bad request
//     if (check) throw new BadRequestError('kategori nama duplikat');

//     const result = await Obat.update(
//         { nama_obat, kode_obat, harga_satuan_obat, satuan, stok },
//         { where: { uuid: id } }
//     );

//     // Jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
//     if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

//     return result;
// };

// const deleteObat = async (req) => {
//     const { id } = req.params;

//     const result = await Obat.findOne({ where: { uuid: id, organizer: req.user.organizer } });

//     if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

//     await result.destroy();

//     return result;
// };

// const checkingObat = async (id) => {
//     const result = await Obat.findOne({ where: { uuid: id } });

//     if (!result) throw new NotFoundError(`Tidak ada Kategori dengan id :  ${id}`);

//     return result;
// };

module.exports = {
    getAllObat,
    createObat,
    getOneObat
    // updateObat,
    // deleteObat,
    // checkingObat,
};
