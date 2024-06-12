const { Op } = require('sequelize');
const Appointment = require('../../api/v1/appointment/model');
const { BadRequestError, NotFoundError } = require('../../errors');

const getAllAppointment = async (req) => {
    const result = await Appointment.findAll(req.body);

    return result;
};

module.exports = {
    getAllAppointment
};
