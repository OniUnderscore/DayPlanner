const express = require("express");
const mongoose = require("mongoose");
const app = express();

function connection() {
  return mongoose
    .connect(
      "mongodb+srv://jsmilezz052:BnkJNB4pGloVf1o4@cluster0.iexwylq.mongodb.net/DayPlanner_DB?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log("Connection failed", err);
    });
}

module.exports = connection;
