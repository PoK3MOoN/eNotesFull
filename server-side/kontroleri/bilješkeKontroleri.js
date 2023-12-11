const mongoose = require("mongoose");
const Biljeska = require("../modeli/bilješkaŠema");
const { catchAsync } = require("../alati/catchAsync");
const Korisnik = require("../modeli/korisnikŠema");
const AppError = require("../alati/appError");

exports.uzmiSveBilješke = catchAsync(async (req, res, next) => {
  // 1. Server uzima sve bilješke iz baze podataka
  const biljeske = await Biljeska.find();
  // 2. Json odgovor
  res.status(200).json({
    status: "success",
    biljeske,
  });
});

exports.uzmiBilješkeJednog = catchAsync(async (req, res, next) => {
  // 1. Server pronalazi korisnika
  const korisnik = req.user;
  if (!korisnik) return next(new AppError("Korisnik ne postoji", 404));
  // 2. Server uzima sve bilješke određenog korisnika
  const bilješke = await Biljeska.find({ korisnik: korisnik.id });
  // 3. Json odgovor
  res.status(201).json({
    status: "success",
    bilješke,
  });
});

exports.napraviBiljesku = catchAsync(async (req, res, next) => {
  // 1. Server uzima sve bilješke iz baze podataka
  const biljeska = await Biljeska.create({
    korisnik: req.user._id,
    naslov: req.body.naslov,
    sadržaj: req.body.sadržaj,
  });
  // 2. Json odgovor
  res.status(201).json({
    status: "success",
    biljeska,
  });
});

exports.uzmiJednuBilješku = catchAsync(async (req, res, next) => {
  console.log(req.user.ime);
  // 1. Server uzima odabranu bilješku
  const bilješka = await Biljeska.findOne({
    _id: req.params.id,
    korisnik: req.user.id,
  });
  if (!bilješka)
    return next(new AppError("Trazena biljeska nije pronadjena", 404));
  // 2. Json odgovor
  res.status(200).json({
    status: "success",
    bilješka,
  });
});

exports.ažurirajBilješku = catchAsync(async (req, res, next) => {
  // 1. Server uzima potrebnu bilješku i ažurira je
  const bilješka = await Biljeska.findOneAndUpdate(
    {
      _id: req.body.id,
      korisnik: req.user.id,
    },
    req.body,
    { new: true }
  );
  if (!bilješka) return next(new AppError("Bilješka ne postoji...", 404));
  // 2. Json odgovor
  res.status(200).json({
    status: "success",
    bilješka,
  });
});

exports.obrišiBilješku = catchAsync(async (req, res, next) => {
  // 1. Server uzima potrebnu bilješku i briše je
  await Biljeska.findOneAndDelete({
    _id: req.body.id,
    korisnik: req.user.id,
  });
  // 2. Json odgovor
  res.status(204).json({
    status: "success",
  });
});
