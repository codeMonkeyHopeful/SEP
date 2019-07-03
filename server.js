const chalk = require('chalk');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const db = require('./server/connect');
// const db = new Sequelize('postgres://localhost:5432/SEP', { logging: false });
// module.exports = db;
const { Campus, Student } = require('./server/db');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, './build')));
app.use('/', morgan('dev'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

db.sync({ force: true })
  .then(() => {
    Promise.all([
      Campus.create({ name: 'test', imageURL: 'test', address: 'test', description: 'test' }),
      Student.create({
        firstName: 'bruce',
        lastName: 'wayne',
        email: 'bruce@gmail.com',
        imageURL: 'null.jpg',
        gpa: 2.3,
      }),
    ]);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.green('Express server listening on PORT: '), chalk.cyan(PORT));
    });
    console.log('synced, seeded, and listening');
  })
  .catch(e => console.log(e));

module.exports = db;
