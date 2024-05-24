const { mongoose } = require("mongoose");
const locationsData = require("./Data/Test_data/location");
const userData = require("./Data/Test_data/user");
const connection = require("./index");
const { Location, User, Route } = require("./Database/schemas_models");
const {route} = require("./Data/Test_data/routes")

function seed() {
  return connection()
    .then(() => {
      Location.collection.drop();
    })
    .then(() => {
      return User.collection.drop();
    })
    .then(() => {
      return Route.collection.drop();
    })
    .then(() => {
      return Promise.all(
        locationsData.map((location) => {
          const newLocation = new Location(location);
          return newLocation.save();
        })
      );
    })
    .then(() => {
      return Promise.all(
        userData.map((user) => {
          const newUser = new User(user);
          return newUser.save();
        })
      );
    })
    .then(()=>{
      const newRoute = new Route(route);
      return newRoute.save();
    })
    .then(() => {
      mongoose.disconnect();
    });
}

module.exports = seed;
