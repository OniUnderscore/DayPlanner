exports.customError = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
  next(err);
};

exports.badRequest = (err, req, res, next) => {
  if (err.name === "CastError" || err.name === "ValidationError") {
    res.status(400).send({ msg: "bad request" });
  }
  next(err);
};

exports.newInternalError = (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: "Internal server error" });
  next();
};
