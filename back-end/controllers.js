const {
  fetchSightsById,
  fetchAllUsers,
  fetchUserById,
  saveNewUser,
  updateUser,
  fetchAllSights,
  postRoutes,
  fetchUserRoutes,
  fetchRouteByID,
  updateRoute,
  removeRoute,
  updateSight
} = require("./models");

exports.getSightsById = (req, res, next) => {
  const { sights_id } = req.params;
  return fetchSightsById(sights_id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  return fetchAllUsers().then((response) => {
    res.status(200).send(response);
  });
};

exports.getUserById = (req, res, next) => {
  const { username } = req.params;
  return fetchUserById(username)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(next);
};

exports.postNewUser = (req, res, next) => {
  const { body } = req;
  return saveNewUser(body)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch(next);
};

exports.patchUser = (req, res, next) => {
  const { username } = req.params;
  const { body } = req;
  return updateUser(username, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(next);
};

exports.getSights = (req, res, next) => {
  const { username } = req.query;

  return fetchUserById(username)
    .then((user) => {
      const {
        settings: {
          searchRadius,
          location: { lon, lat },
        },
        filters,
      } = user;
      return fetchAllSights(lon, lat, searchRadius, filters);
    })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(next);
};

exports.postNewRoute = (req, res, next) => {
  const { username } = req.params;
  const { body } = req;

  return postRoutes(username, body).then((response) => {
    res.status(201).send(response);
  }).catch((err)=>{
    next(err)
  });
};

exports.getRoutes = (req,res,next) => {
    const { username} = req.params;

  return fetchUserRoutes(username).then((response)=>{
    res.status(200).send(response)
  })
}
exports.getRoutesByID = (req,res,next) => {
  const { id } = req.params

  return fetchRouteByID(id).then((response)=>{
    res.status(200).send(response)
  })
}

exports.patchRoute = (req, res, next) => {
  const {id} = req.params
  const {name} = req.body

  return updateRoute(id, name).then((response) => {
    res.status(201).send(response)
  })
  .catch(next)
}

exports.deleteRoute = (req, res, next) => {
  const {id} = req.params
  return removeRoute(id)
  .then(() => {
    res.status(204).send('')
  })
}

exports.patchSight = (req, res, next) => {
  const {sights_id} = req.params
  const {inc_rating} = req.body
  return updateSight(sights_id, inc_rating)
  .then((response) => {
    res.status(201).send(response)
  })
  .catch(next)
}
