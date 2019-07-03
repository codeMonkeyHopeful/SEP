const Sequelize = require('sequelize');
const Campus = require('./models/Campuses');
const Student = require('./models/Students');

Student.belongsTo(Campus);
Campus.hasMany(Student);

//seed
Campus.create({ name: 'test', imageURL: 'test', address: 'test', description: 'test' });

module.exports = { Campus, Student };
