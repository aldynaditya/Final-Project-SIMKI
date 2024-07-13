const db = require('../../../../db/index');
const { DataTypes } = require('sequelize');
const EMRPasien = require('../../emrPasien/model');
const Question = require('../../kuisioner/question/model');

const Response = db.define('response', {
    answer: {
        type: DataTypes.ENUM,
        values: ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'],
        allowNull: false,
    },
    questionId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Question',
            key: 'id',
        },
    },
    emrpasienId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'response'
});

Response.belongsTo(Question, {
    foreignKey: 'questionId',
    as: 'question',
});
Question.hasMany(Response, {
    foreignKey: 'questionId',
    as: 'question',
});

Response.belongsTo(EMRPasien, { 
    as: 'emr', 
    foreignKey: 'emrpasienId', 
    targetKey: 'uuid' 
});

module.exports = Response;