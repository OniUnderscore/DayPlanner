const express = require("express");
const mongoose = require("mongoose");
const app = express();

function connection() {
  return mongoose
    .connect("mongodb://86.142.96.238:27017/DayPlanner-test")
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log("Connection failed", err);
    });
}

module.exports = connection;
