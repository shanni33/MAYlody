const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// define a schema
const userSchema = new mongoose.Schema({
  name: String,
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);
module.exports = User;
