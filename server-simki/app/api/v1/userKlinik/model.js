const db = require('../../../db/index');
const argon2 = require('argon2');
const { DataTypes } = require('sequelize');

const UserKlinik = db.define('user_klinik', {
    uuid:{
        type: DataTypes. STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Nama harus diisi' },
            len: {
                args: [3, 50],
                msg: 'Nama harus di antara 3 dan 50 karakter',
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: { msg: 'Email harus diisi' },
            isEmail: { msg: 'Format email tidak valid' },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Password harus diisi' },
            len: {
            args: [6],
            msg: 'Password harus memiliki minimal 6 karakter',
            },
        },
    },
    }, {
    timestamps: true,
    hooks: {
        beforeSave: async (user) => {
            if (user.changed('password')) {
            user.password = await argon2.hash(user.password);
            }
        },
    },
});
    
const Role = db.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});
    
const Permission = db.define('Permission', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});
    
const UserRole = db.define('UserRole', {});
    
const RolePermission = db.define('RolePermission', {});
    
UserKlinik.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(UserKlinik, { through: UserRole });
Role.belongsToMany(Permission, { through: RolePermission });
Permission.belongsToMany(Role, { through: RolePermission });
    
UserKlinik.prototype.comparePassword = async function (candidatePassword) {
    return await argon2.verify(this.password, candidatePassword);
    };
    
module.exports = { UserKlinik, Role, Permission, UserRole, RolePermission };