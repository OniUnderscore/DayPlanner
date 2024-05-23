const express = require("express");
const cors = require("cors");
const connection = require("./index");
const app = express();
const {
  getSightsById,
  getAllUsers,
  getUserById,
  postNewUser,
  patchUser,
  getSights,
} = require("./controllers");
const {
  customError,
  newInternalError,
  badRequest,
} = require("./error_handling");
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  return connection().finally(() => {
    next();
  });
});

app.use((req, res, next) => {
  res.on("finish", () => {
    return mongoose.disconnect();
  });
  next();
});
app.get("/api/sights", getSights);
app.get("/api/sights/:sights_id", getSightsById);
app.get("/api/users", getAllUsers);
app.get("/api/users/:username", getUserById);
app.post("/api/users", postNewUser);
app.patch("/api/users/:username", patchUser);

app.all("*", (req, res, next) => {
  res.status(404).send({ msg: "route does not exist" });
});

app.use(badRequest);
app.use(customError);
app.use(newInternalError);

module.exports = app;
