const Sequelize = require("sequelize");
const Campus = require("./models/Campuses");
const Student = require("./models/Students");

Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = { Campus, Student };
