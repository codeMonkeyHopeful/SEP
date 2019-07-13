const Sequelize = require("sequelize");
const db = require("../connect");

const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageURL: {
    type: Sequelize.STRING,
    defaulValue: "https://picsum.photos/200"
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT
  },
  mapLocation: {
    type: Sequelize.TEXT
  }
});

module.exports = Campus;
