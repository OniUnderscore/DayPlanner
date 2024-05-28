const axios = require("axios");

const orsApi = axios.create({
  baseURL: "https://api.openrouteservice.org",
  headers: {
    Authorization: "5b3ce3597851110001cf624840553bc790fb492d88e4c62ca229c625",
  },
});

const overpassApi = axios.create({
  baseURL: "https://overpass-api.de/api",
});

exports.getRadius = (lat, lon, radius) => {
  return orsApi
    .post("/v2/isochrones/foot-walking", {
      locations: [[lon, lat]],
      range: [radius],
      location_type: "start",
      range_type: "distance",
      smoothing: 15,
    })
    .then((response) => {
      const boundingPoly = response.data.features[0].geometry.coordinates[0];
      boundingPoly.map((coord) => {
        return coord.reverse();
      });
      const polyCoordString = boundingPoly.join(" ").split(",").join(" ");
      return polyCoordString;
    });
};

exports.getData = (queryString) => {
  return overpassApi
    .post("/interpreter", `data=${encodeURIComponent(queryString)}`)
    .then((response) => {
      return response.data.elements;
    });
};

exports.makeRoute = (coordinateArray) => {
  return orsApi
    .post("/v2/directions/foot-walking/geojson", {
      coordinates: coordinateArray,
    })
    .then((response) => {
      const lineCoords = response.data.features[0].geometry.coordinates;
      return lineCoords.map((coord) => {
        return { latitude: coord[1], longitude: coord[0] };
      });
    })
    .catch((err) => {
      if (err) return Promise.reject({ status: 400, msg: "bad request" });
    });
};
