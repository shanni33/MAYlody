require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
// model schema
const Concert = require("./models/concert");
const User = require("./models/user");

const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.static("dist"));
app.use(passport.initialize());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET;

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

var corsOptions = {
  origin: "http://localhost:8080",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};

// connect to MongoDB
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((err) => {
    console.log("Connection Failed.");
    console.log(err);
  });
mongoose.Promise = global.Promise;

app.get("/", (req, res) => {
  res.send("Hello Express!");
});

// create an account
// app.post("/signup", function (req, res) {
//   let obj = req.body;
//   let user = new User(obj);

//   // save user with hashed password
//   User.register(user, obj.password, (err, user) => {
//     if (err) {
//       console.log(err);
//       res.json({
//         success: false,
//         message: "Username has been registered. Please check.",
//       });
//       res.redirect("/signup");
//     } else {
//       res.json({
//         success: true,
//         message: "Account has been created. You can login now.",
//       });
//     }
//   });
// });

// login
app.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    // console.log("hello", req.body);
    var token = jwt.sign(req.body, process.env.SECRET, { expiresIn: 3600 });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      token: token,
      status: "You are successful logged in!",
    });
  }
);

// query all concerts
app.get("/api/concerts", (req, res) => {
  Concert.find({})
    .then((concerts) => {
      concertsData = concerts;
      res.json(concerts);
    })
    .catch((err) => {
      res.json(err);
    });
});

// query one concert
app.get("/api/concerts/:id", (req, res) => {
  console.log(req.params.id);
  console.log(req.headers.authorization);
  Concert.find({ "properties.id": req.params.id })
    .then((concert) => {
      res.json(concert);
    })
    .catch((err) => {
      res.json(err);
    });
});

// update concert
app.patch(
  "/api/concerts/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let obj = req.body.content;
    Concert.findOneAndUpdate(
      { "properties.id": req.params.id },
      {
        $set: obj,
      },
      { new: true }
    )
      .then((concert) => res.json(concert))
      .catch((err) => res.json(err));
  }
);

// create concert
app.post(
  "/api/concerts",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let obj = req.body.content;
    query = Concert.findOne(
      {},
      {},
      {
        sort: { "properties.id": -1 },
      }
    );
    query.then(function (data) {
      let lastId = data.properties.id;
      console.log(lastId);
      obj.properties.id = lastId + 1;

      let concert = new Concert(obj);
      concert
        .save()
        .then((concert) => {
          res.json(concert);
        })
        .catch((err) => {
          res.json(err);
        });
    });
  }
);

app.listen(PORT, () => {
  console.log("Server is running");
});

module.exports = app;
