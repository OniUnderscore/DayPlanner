const axios = require("axios");

const orsApi = axios.create({
  baseURL: "http://86.142.96.238:8082/ors",
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
