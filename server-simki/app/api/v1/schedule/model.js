const db = require('../../../db/index');
const { DataTypes } = require('sequelize');
const UserKlinik = require('../userKlinik/model');

const Schedule = db.define('schedule', {
    uuid:{
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    hari: {
        type: DataTypes.ENUM( 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat' ),
        allowNull: false,
        validate: {
            isIn: {
                args: [[ 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat' ]],
                msg: 'Pilihan tidak valid',
            },
        },
    },
    poli: {
        type: DataTypes.ENUM( 'Umum', 'Gigi' ),
        allowNull: false,
        validate: {
            isIn: {
                args: [[ 'Umum', 'Gigi' ]],
                msg: 'Pilihan tidak valid',
            },
        },
    },
    status: {
        type: DataTypes.ENUM( 'ada', 'tidak ada' ),
        defaultValue: 'tidak ada',
    },
    userKlinikId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserKlinik,
            key: 'uuid'
        }
    },
}, {
    timestamps: true,
    tableName: 'schedule'
});

UserKlinik.hasMany(Schedule, { foreignKey: 'userKlinikId' });
Schedule.belongsTo(UserKlinik, { as: 'user_klinik', foreignKey: 'userKlinikId' });

module.exports = Schedule;