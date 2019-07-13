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

app.delete("/api/campuses", (req, res, next) => {
  Campus.destroy({ where: { id: req.body.id } }).then(res.end("Success"));
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
    campusId: req.body.campusId === "" ? null : req.body.campusId
  })
    .then(res.end("Success"))
    .catch(e => {
      console.log(e);
    });
});

app.delete("/api/students", function(req, res) {
  Student.destroy({ where: { id: req.body.id } })
    .then(res.end("Successful Delete"))
    .catch(e => console.log(e));
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
        description:
          "The Ohio State University, commonly referred to as Ohio State or OSU, is a large public research university in Columbus, Ohio. Founded in 1870 as a land-grant university and the ninth university in Ohio with the Morrill Act of 1862,[4] the university was originally known as the Ohio Agricultural and Mechanical College (Mech). The college began with a focus on training students in various agricultural and mechanical disciplines but it developed into a comprehensive university under the direction of then-Governor (later, President) Rutherford B. Hayes, and in 1878 the Ohio General Assembly passed a law changing the name to The Ohio State University.[5] It has since grown into the third-largest university campus in the United States.[6] Along with its main campus in Columbus, Ohio State also operates regional campuses in Lima, Mansfield, Marion, Newark, and Wooster.",
        mapLocation:
          "https://www.google.com/maps/place/The+Ohio+State+University/@40.0068404,-83.0328109,17z/data=!3m1!4b1!4m5!3m4!1s0x88388e8fdde8a7b3:0xab2cd8082156878f!8m2!3d40.0068363!4d-83.0306222"
      }),
      Campus.create({
        name: "Arizona State",
        imageURL:
          "https://ewscripps.brightspotcdn.com/dims4/default/d2e97df/2147483647/strip/true/crop/544x306+3+33/resize/1280x720!/quality/90/?url=https%3A%2F%2Fewscripps.brightspotcdn.com%2F45%2F3a%2Fcc5033e7460aacc84d3524245f8d%2Fblack-fork-0.jpg",
        address: "1 FakeAddress Lane",
        description:
          "Arizona State University (commonly referred to as ASU or Arizona State) is a public metropolitan research university[8] on five campuses across the Phoenix metropolitan area,[9] and four regional learning centers throughout Arizona.",
        mapLocation:
          "https://www.google.com/maps/place/Arizona+State+University+Downtown+Phoenix+Campus/@33.453543,-112.0753105,17z/data=!3m1!4b1!4m5!3m4!1s0x872b1218ffffffff:0xc03bc902403ff919!8m2!3d33.4535385!4d-112.0731218"
      }),
      Campus.create({
        name: "LSU",
        imageURL:
          "https://pbs.twimg.com/profile_images/382296603/lsu_logo2_400x400.jpg",
        address: "The south",
        description:
          "Louisiana State University (officially Louisiana State University and Agricultural and Mechanical College, commonly referred to as LSU) is a public research university in Baton Rouge, Louisiana.[8] The university was founded in 1853 in what is now known as Pineville, Louisiana, under the name Louisiana State Seminary of Learning & Military Academy. The current LSU main campus was dedicated in 1926, consists of more than 250 buildings constructed in the style of Italian Renaissance architect Andrea Palladio, and the main campus historic district occupies a 650-acre (2.6 km²) plateau on the banks of the Mississippi River.",
        mapLocation:
          "https://www.google.com/maps/place/Louisiana+State+University/@30.4132625,-91.182191,17z/data=!3m1!4b1!4m5!3m4!1s0x8626a723780e1ca3:0xcdb21f2e63145453!8m2!3d30.4132579!4d-91.1800023"
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
