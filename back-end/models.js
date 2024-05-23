const connection = require("./index");
const mongoose = require("mongoose");
const { Location, User } = require("./Database/schemas_models");
const { getRadius, getData } = require("./Database/apiCalls");
const { response } = require("./app");

exports.fetchSightsById = (id) => {
  return Location.find({ id: id })
    .lean()
    .then((response) => {
      if (response.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      const [sight] = response;
      return sight;
    });
};

exports.fetchAllUsers = () => {
  return User.find({})
    .lean()
    .then((response) => {
      return response;
    });
};

exports.fetchUserById = (username) => {
  return User.find({ username: username })
    .lean()
    .then((response) => {
      if (response.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      const [user] = response;
      return user;
    });
};

exports.saveNewUser = (newUser) => {
  const postUser = new User(newUser);
  return postUser
    .save()
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

exports.updateUser = (username, body) => {
  return User.find({ username: username })
    .exec()
    .then((response) => {
      if (response.length === 0) {
        return Promise.reject({ status: 404, msg: "not found" });
      }
      const [user] = response;
      if (body.avatar) {
        user.avatar = body.avatar;
      }
      if (body.settings) {
        user.settings = body.settings;
      }
      if (body.filters) {
        user.filters = body.filters;
      }

      return user.save();
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

exports.fetchAllSights = (lon, lat, radius, filters) => {
  return getRadius(lat, lon, radius)
    .then((polyCoords) => {
      let queryString = `[out:json];

      (
      `;

      if (
        Object.keys(filters.amenity).some((amenity) => {
          return filters.amenity[amenity];
        })
      ) {
        const amenityKeys = filters.amenity;

        const filteredAmenity = [];
        for (const keys in amenityKeys) {
          if (amenityKeys[keys]) {
            filteredAmenity.push(keys);
          } else continue;
        }

        queryString += `node[amenity ~ "${filteredAmenity.join(
          "|"
        )}"](poly: "${polyCoords}");
        `;
      }

      if (
        Object.keys(filters.historic).some((historic) => {
          return filters.historic[historic];
        })
      ) {
        const historicKeys = filters.historic;

        const filteredHistoric = [];
        for (const keys in historicKeys) {
          if (historicKeys[keys]) {
            filteredHistoric.push(keys);
          } else continue;
        }

        queryString += `node[historic ~ "${filteredHistoric.join(
          "|"
        )}"](poly: "${polyCoords}");
        `;
      }

      if (
        Object.keys(filters.leisure).some((leisure) => {
          return filters.leisure[leisure];
        })
      ) {
        const leisureKeys = filters.leisure;

        const filteredLeisure = [];
        for (const keys in leisureKeys) {
          if (leisureKeys[keys]) {
            filteredLeisure.push(keys);
          } else continue;
        }

        queryString += `node[leisure ~ "${filteredLeisure.join(
          "|"
        )}"](poly: "${polyCoords}");
        `;
      }

      if (
        Object.keys(filters.shop).some((shop) => {
          return filters.shop[shop];
        })
      ) {
        const shopKeys = filters.shop;

        const filteredShop = [];
        for (const keys in shopKeys) {
          if (shopKeys[keys]) {
            filteredShop.push(keys);
          } else continue;
        }

        queryString += `node[shop ~ "${filteredShop.join(
          "|"
        )}"](poly: "${polyCoords}");
        `;
      }

      if (
        Object.keys(filters.tourism).some((tourism) => {
          return filters.tourism[tourism];
        })
      ) {
        const tourismKeys = filters.tourism;

        const filteredTourism = [];
        for (const keys in tourismKeys) {
          if (tourismKeys[keys]) {
            filteredTourism.push(keys);
          } else continue;
        }

        queryString += `node[tourism ~ "${filteredTourism.join(
          "|"
        )}"](poly: "${polyCoords}");
        `;
      }

      queryString += `);
      out body;`;

      return getData(queryString);
    })
    .then((response) => {
      return response;
    });
};
