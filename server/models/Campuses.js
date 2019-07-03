const Sequelize = require('sequelize');
const db = require('../connect');

const Campus = db.define('campus', {
  name: {
    type: Sequelize.STRING,
  },
  imageURL: {
    type: Sequelize.STRING,
    defaulValue: 'image.jpg', //come back to this to make a real image
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: Sequelize.TEXT, //double check this
  },
});

module.exports = Campus;
