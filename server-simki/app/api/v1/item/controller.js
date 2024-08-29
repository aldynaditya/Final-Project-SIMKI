const { StatusCodes } = require('http-status-codes');
const { 
    getAllItem,
    createItem,
    updateItem,
    deleteItem,
    searchItem,
    getItembyId
} = require('../../../services/sequelize/item');

const index = async (req, res, next) => {
    try {
        const result = await getAllItem(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const one = async (req, res, next) => {
    try {
        const result = await getItembyId(req);

    res.status(StatusCodes.OK).json({
        data: result,
    });
    } catch (err) {
        next(err);
    }
};

const find = async (req, res, next) => {
    try {
        const result = await searchItem(req);
        
        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await createItem(req);
        
        res.status(StatusCodes.CREATED).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const result = await updateItem(req);

        res.status(StatusCodes.OK).json({
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

const destroy = async (req, res, next) => {
    try {
        const result = await deleteItem(req);

        res.status(StatusCodes.OK).json({
            data: 'Item berhasil terhapus',
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    index,
    one,
    find,
    update,
    destroy,
    create,
};
