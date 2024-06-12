const { Op } = require('sequelize');
const Schedule = require('../../api/v1/schedule/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllSchedule = async (req) => {
    const schedules = await Schedule.findAll({
        include: {
            model: UserKlinik,
            attributes: ['name'],
            where: { role: 'dokter' },
            required: true 
        }
    });

    const result = schedules.map(schedule => ({
        uuid: schedule.uuid,
        hari: schedule.hari,
        poli: schedule.poli,
        status: schedule.status,
        userklinikId: schedule.userklinikId,
        dokter: schedule.user_klinik.name
        }));
    console.log(result);
    return result;
};

const createSchedule = async (req) => {
    const { hari, poli, status, namaDokter } = req.body;
    const dokter = await UserKlinik.findOne({
        where: {
            name: namaDokter,
            role: 'dokter'
        }
    });
    if (!dokter) {
        throw new NotFoundError('Dokter tidak ditemukan');
    }

    const result = await Schedule.create({
        hari,
        poli,
        status,
        userklinikId: dokter.uuid
    });

    return result;
};

const updateSchedule = async (req) => {
    const { id } = req.params;
    const { status, hari } = req.body;

    const result = await Schedule.update(
        { status, hari },
        { where: { uuid: id } }
    );

    if (!result) throw new NotFoundError(`Tidak ada Schedule dengan id :  ${id}`);

    return result;
};

const deleteSchedule = async (req) => {
    const { id } = req.params;

    const result = await Schedule.findOne({ where: {uuid: id} });

    if (!result) throw new NotFoundError(`Tidak ada Schedule dengan id :  ${id}`);

    await result.destroy();

    return result;
};

module.exports = {
    getAllSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule
};
