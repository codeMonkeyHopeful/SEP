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
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/campuses", (req, res, next) => {
  Campus.findAll({}).then(campuses => {
    res.send(campuses);
  });
});

app.post("/api/campuses", (req, res, next) => {
  Campus.create({
    name: req.body.name,
    imageURL:
      req.body.imageURL === ""
        ? "https://picsum.photos/200"
        : req.body.imageURL,
    address: req.body.address
  })
    .then(res.end("Success"))
    .catch(e => {
      console.log(e);
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

app.post("/api/students", (req, res, next) => {
  Student.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    campusId: req.body.campusId === "" ? 1 : req.body.campusId
  })
    .then(res.end("Success"))
    .catch(e => {
      console.log(e);
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
        imageURL:
          "https://cdn.vox-cdn.com/thumbor/j6zdpMvPpnIdKA6XbQf0sTDwcOY=/0x52:500x385/1200x800/filters:focal(0x52:500x385)/cdn.vox-cdn.com/uploads/chorus_image/image/7637953/-8440ec73343f6236.0.jpeg",
        address: "100 High Street",
        description: "The greatest university in the world"
      }),
      Campus.create({
        name: "Arizona State",
        imageURL:
          "https://ewscripps.brightspotcdn.com/dims4/default/d2e97df/2147483647/strip/true/crop/544x306+3+33/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F45%2F3a%2Fcc5033e7460aacc84d3524245f8d%2Fblack-fork-0.jpg",
        address: "1 FakeAddress Lane",
        description: "Party hard"
      }),
      Campus.create({
        name: "LSU",
        imageURL:
          "https://pbs.twimg.com/profile_images/382296603/lsu_logo2_400x400.jpg",
        address: "The south",
        description: "Crawdads are yummy"
      }),
      Student.create({
        firstName: "Bruce",
        lastName: "Wayne",
        email: "bruce@gmail.com",
        imageURL:
          "https://us.123rf.com/450wm/chutimakuanamon/chutimakuanamon1705/chutimakuanamon170500255/79121838-batman-retro-vintage-illustration.jpg?ver=6",
        gpa: 2.3,
        campusId: 1
      }),
      Student.create({
        firstName: "Bruce",
        lastName: "Almighty",
        email: "bruce2@gmail.com",
        imageURL:
          "https://images.ctfassets.net/7h71s48744nc/28837tV3kkYqkQGcgMwcCG/10573ee869616565294a08cc23403c98/bruce-almighty.jpg",
        gpa: 3.4,
        campusId: 2
      }),
      Student.create({
        firstName: "Marky",
        lastName: "Mark",
        email: "MrAwesome@gmail.com",
        imageURL:
          "https://cdn.extra.ie/wp-content/uploads/2018/07/03112455/Mark-Wahlberg-1068x623.jpg",
        gpa: 1.2,
        campusId: 1
      }),
      Student.create({
        firstName: "Papa",
        lastName: "Smurf",
        email: "PapaSmurf@gmail.com",
        imageURL:
          "https://static.comicvine.com/uploads/square_medium/0/77/4799004-le-grand-schtroumpf.jpg",
        gpa: 3.6,
        campusId: 1
      })
    ]).catch(e => console.log(e));
  })
  .catch(e => {
    console.log(e);
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
