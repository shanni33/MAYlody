const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config/db");
const Concert = require("./models/concert");
const PORT = process.env.PORT || 3000;

var corsOptions = {
  origin: "http://localhost:8080",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// connect to MongoDB
mongoose
  .connect(config.mongodb||process.env.MONGODB_URI, {
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

// query all concert
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

// update concert
app.patch("/api/concerts/:id", (req, res) => {
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
});

// create concert
app.post("/api/concerts", (req, res) => {
  let obj = req.body.content;

  query = Concert.findOne(
    {},
    {},
    {
      sort: { "properties.id": -1 },
      function(err, obj) {
        console.log(err);
      },
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
});

app.listen(PORT, () => {
  console.log("Server is running");
});

module.exports = app;
