const AppError = require("../alati/appError");

const pošaljiDevGrešku = (err, res) => {
  res.status(err.statusKod).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const pošaljiProdGrešku = (err, res) => {
  if (err.jelOperativan) {
    // Operativna greška, program nastavlja sa izvoditi
    res.status(err.statusKod).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // Programerska greška ili nešto drugo nepoznato
    console.error("GREŠKA", err);

    res.status(500).json({
      status: "error",
      message: "Tumbalega",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusKod = err.statusKod || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    pošaljiDevGrešku(err, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.code === 11000) err = new AppError("Uneseni mejl već postoji", 403);
    if (err.name === "CastError")
      err = new AppError(`Neispravan ${err.path}: ${err.value}`, 404);
    if (err.code === "ValidationError") {
      const greške = Object.values(err.errors).map((el) => el.message);
      return new AppError(`Neispravni podaci. ${greške.join(". ")}`, 404);
    }
    pošaljiProdGrešku(err, res);
  }
};
