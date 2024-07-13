const db = require('../../../../db/index');
const { DataTypes } = require('sequelize');

const Question = db.define('question', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'question'
});

module.exports = Question;