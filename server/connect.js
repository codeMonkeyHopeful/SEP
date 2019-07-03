const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/SEP', { logging: false });

module.exports = db;
