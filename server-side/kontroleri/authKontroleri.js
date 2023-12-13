const AppError = require("../alati/appError");
const { catchAsync } = require("../alati/catchAsync");
const pošaljiMejl = require("../alati/mejl");
const Korisnik = require("../modeli/korisnikŠema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const kreirajToken = (korisnik, statusKod, req, res) => {
  // 1. Kreiranje tokena
  const id = korisnik._id;
  const token = jwt.sign({ id }, process.env.JWT_TAJNA, {
    expiresIn: process.env.JWT_ROK + "d",
  });
  // 2. Kreiranje kolačića
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + process.env.JWT_ROK * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  // 3. Json odgovor
  res.status(statusKod).json({
    status: "success",
    token,
    korisnik,
  });
};

exports.login = catchAsync(async (req, res, next) => {
  const { mejl, šifra } = req.body;
  // 1. Provjeri postoje li mejl i šifra
  if (!mejl || !šifra)
    return next(new AppError("Mejl ili šifra nisu unijeti.", 404));
  // 2. Provjeri postoji li korisnik i šifru
  const korisnik = await Korisnik.findOne({ mejl }).select("+šifra");
  if (!korisnik) return next(new AppError("Netačan mejl ili šifra", 404));
  const ispravniPodaci = await korisnik.usporediŠifre(šifra, korisnik.šifra);
  if (!ispravniPodaci) {
    return next(new AppError("Netačan mejl ili šifra", 404));
  }
  // 3. Ako je sve u redu, kreiraj token
  kreirajToken(korisnik, 200, req, res);
});

exports.zaštita = catchAsync(async (req, res, next) => {
  // 1. Uzmi token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.body.jwt) {
    token = req.body.jwt;
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) return next(new AppError("Prijavi se...", 404));
  // 2. Verifikacija
  console.log(req.body.jwt);
  console.log(token);
  const decoded = await jwt.verify(token, process.env.JWT_TAJNA);
  console.log(decoded);
  // 3. Provjeri postoji li korisnik
  const korisnik = await Korisnik.findById(decoded.id);
  if (!korisnik) return next(new AppError("Korisnik vise ne postoji...", 404));
  // 4. Daj pristup zaštićenoj ruti
  req.user = korisnik;
  next();
});

exports.jelUlogovan = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt || req.body.jwt) {
    // 1. Desifruj token
    const decoded = await jwt.verify(req.body.jwt, process.env.JWT_TAJNA);
    console.log(decoded);
    // 2. Ako postoji, vrati korisnika
    if (decoded) {
      const korisnik = await Korisnik.findById(decoded.id);
      res.status(200).json({
        status: "success",
        korisnik,
      });
    } else {
      res.status(404).json({
        status: "failed",
      });
    }
  }
});

exports.odjaviKorisnika = (req, res) => {
  console.log(123);
  res.cookie("jwt", "odjava", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
