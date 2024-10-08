const { Op } = require('sequelize');
const Schedule = require('../../api/v1/schedule/model');
const UserKlinik = require('../../api/v1/userKlinik/model');
const Appointment = require('../../api/v1/appointment/model');
const { 
    BadRequestError, 
    NotFoundError } = require('../../errors');
const { 
    validateTimeFormat,
    timesOverlap
} = require('../../utils')

const getAllSchedule = async () => {
    const schedules = await Schedule.findAll({
        include: {
            model: UserKlinik,
            as: 'user_klinik',
            attributes: ['nama'],
            where: { role: 'dokter' },
            required: true 
        }
    });

    const result = schedules.map(schedule => {
        const startTime = schedule.start_time.slice(0, 5);  
        const endTime = schedule.end_time.slice(0, 5);

        return {
            id: schedule.uuid,
            hari: schedule.hari,
            poli: schedule.poli,
            jam: `${startTime}-${endTime}`,
            status: schedule.status,
            userKlinikId: schedule.userKlinikId,
            dokter: schedule.user_klinik.nama
        }
    });

    return result;
};

const getAllDoctor = async () => {
    const userklinik = await UserKlinik.findAll({
        where: {
            role: 'dokter'
        }
    });
    
    const result = userklinik.map(user => {
        return {
            id: user.uuid,
            nama: user.nama,
            role: user.role,
        };
    });
    
    return result;
};

const createSchedule = async (req) => {
    const { hari, poli, start_time, end_time, namaDokter } = req.body;

    const formattedStartTime = validateTimeFormat(start_time);
    const formattedEndTime = validateTimeFormat(end_time);

    const dokter = await UserKlinik.findOne({
        where: {
            nama: namaDokter,
            role: 'dokter'
        }
    });

    if (!dokter) throw new NotFoundError('Dokter tidak ditemukan');

    const existingSchedules = await Schedule.findAll({
        where: {
            hari,
            userKlinikId: dokter.uuid
        }
    });

    for (const schedule of existingSchedules) {
        if (timesOverlap(
            formattedStartTime, 
            formattedEndTime, 
            schedule.start_time, 
            schedule.end_time)
        ) {
            throw new BadRequestError('Jadwal bertabrakan dengan jadwal yang sudah ada untuk dokter ini pada hari yang sama');
        }
    }

    const result = await Schedule.create({
        hari,
        poli,
        status: 'ada',
        start_time: formattedStartTime,
        end_time: formattedEndTime,
        userKlinikId: dokter.uuid
    });

    return result;
};

const updateSchedule = async (req) => {
    const { id } = req.params;
    const { status, hari, start_time, end_time } = req.body;

    const formattedStartTime = validateTimeFormat(start_time);
    const formattedEndTime = validateTimeFormat(end_time);

    const existingSchedule = await Schedule.findOne({ where: { uuid: id } });
    
    if (!existingSchedule) throw new NotFoundError(`Tidak ada Schedule dengan id: ${id}`);

    const existingSchedules = await Schedule.findAll({
        where: {
            hari,
            userKlinikId: existingSchedule.userKlinikId,
            uuid: { [Op.ne]: id }
        }
    });

    for (const schedule of existingSchedules) {
        if (timesOverlap(formattedStartTime, formattedEndTime, schedule.start_time, schedule.end_time)) {
            throw new BadRequestError('Jadwal bertabrakan dengan jadwal yang sudah ada untuk dokter ini pada hari yang sama');
        }
    }

    const result = await Schedule.update(
        { status, hari, start_time: formattedStartTime, end_time: formattedEndTime },
        { where: { uuid: id } }
    );

    if (result[0] === 0) throw new NotFoundError(`Tidak ada Schedule dengan id: ${id}`);

    return result;
};

const deleteSchedule = async (req) => {
    const { id } = req.params;

    const result = await Schedule.findOne({ where: { uuid: id } });

    if (!result) throw new NotFoundError(`Tidak ada Schedule dengan id :  ${id}`);

    await Appointment.destroy({ where: { scheduleId: id } });

    await result.destroy();

    return result;
};


module.exports = {
    getAllSchedule,
    getAllDoctor,
    createSchedule,
    updateSchedule,
    deleteSchedule
};
