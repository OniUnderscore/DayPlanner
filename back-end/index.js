const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { Location, User } = require("./seed.js");

function connection() {
  return mongoose
    .connect("mongodb://86.142.96.238:27017/DayPlanner")
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log("Connection failed", err);
    });
}

module.exports = connection;
