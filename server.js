const chalk = require("chalk");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const db = require("./server/connect");

const { Campus, Student } = require("./server/db");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "./build")));
app.use("/", morgan("dev"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/campuses", (req, res, next) => {
  Campus.findAll({}).then(campuses => {
    res.send(campuses);
  });
});

app.get("/api/campuses/:id", (req, res, next) => {
  Campus.findByPk(req.params.id, {
    include: [Student]
  })
    .then(campus => {
      res.send(campus);
    })
    .catch(e => {
      console.log(e);
    });
});

app.get("/api/students", (req, res, next) => {
  Student.findAll({}).then(students => {
    res.send(students);
  });
});

app.get("/api/students/:id", (req, res, next) => {
  Student.findByPk(req.params.id, {
    include: {
      model: Campus
    }
  })
    .then(student => {
      res.send(student);
    })
    .catch(e => {
      console.log(e);
    });
});

db.sync({ force: true })
  .then(() => {
    Promise.all([
      Campus.create({
        name: "OSU",
        imageURL: "https://picsum.photos/200",
        address: "100 High Street",
        description: "The greatest university in the world"
      }),
      Campus.create({
        name: "Arizona State",
        imageURL: "https://picsum.photos/200",
        address: "1 FakeAddress Lane",
        description: "Party hard"
      }),
      Campus.create({
        name: "LSU",
        imageURL: "https://picsum.photos/200",
        address: "The south",
        description: "Crawdads are yummy"
      }),
      Student.create({
        firstName: "Bruce",
        lastName: "Wayne",
        email: "bruce@gmail.com",
        imageURL: "https://picsum.photos/200",
        gpa: 2.3,
        campusId: 1
      }),
      Student.create({
        firstName: "Bruce",
        lastName: "Almighty",
        email: "bruce2@gmail.com",
        imageURL: "https://picsum.photos/200",
        gpa: 3.4,
        campusId: 2
      }),
      Student.create({
        firstName: "Marky",
        lastName: "Mark",
        email: "MrAwesome@gmail.com",
        imageURL: "https://picsum.photos/200",
        gpa: 1.2,
        campusId: 1
      }),
      Student.create({
        firstName: "Papa",
        lastName: "Smurf",
        email: "PapaSmurf@gmail.com",
        imageURL: "https://picsum.photos/200",
        gpa: 3.6,
        campusId: 3
      })
    ]);
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        chalk.green("Express server listening on PORT: "),
        chalk.cyan(PORT)
      );
    });
    console.log("synced, seeded, and listening");
  })
  .catch(e => console.log(e));

module.exports = db;
