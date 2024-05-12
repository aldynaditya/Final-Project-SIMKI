const Sequelize = require('sequelize');

const {urlDb} = require('../config');
const db = new Sequelize(urlDb);

module.exports = db;