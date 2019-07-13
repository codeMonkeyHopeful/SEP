const Sequelize = require("sequelize");
const db = require("../connect");

const Student = db.define("student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    allowEmpty: false,
    validate: {}
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    allowEmpty: false,
    validate: {}
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    allowEmpty: false,
    validate: {
      isEmail: true
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaultValue: "https://picsum.photos/200"
  },
  gpa: {
    type: Sequelize.FLOAT,
    defaultValue: 4.0,
    validate: {
      min: 0.0,
      max: 4.0
    }
  }
});

module.exports = Student;
