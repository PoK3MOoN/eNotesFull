const { catchAsync } = require("../alati/catchAsync");
const Korisnik = require("../modeli/korisnikŠema");
const AppError = require("../alati/appError");
const multer = require("multer");
const sharp = require("sharp");

exports.uzmiSveKorisnike = catchAsync(async (req, res, next) => {
  const korisnici = await Korisnik.find({});
  res.status(200).json({
    status: "success",
    korisnici,
  });
});

exports.ažurirajKorisnika = catchAsync(async (req, res, next) => {
  // 1. Pronadji prijavljenog korisnika u bazi podataka
  const korisnik = await Korisnik.findById(req.user.id);
  if (!korisnik) return next(new AppError("Prvo se prijavite...", 401));
  // 2. Ažuriraj korisnika sa novim podacima
  const noviKorisnik = await korisnik.updateOne({
    ime: req.body.ime,
    prezime: req.body.prezime,
    mejl: req.body.mejl,
    šifra: req.body.šifra,
    slika: req.body.slika,
  });
  console.log(noviKorisnik);
  if (!res) return;
  res.status(200).json({
    status: "success",
    noviKorisnik,
  });
});

exports.registracija = catchAsync(async (req, res, next) => {
  // 1. Provjeri postoje li sva potrebna polja
  if (!req.body.ime || !req.body.mejl || !req.body.šifra)
    return next(new AppError("Unesi sve potrebne podatke!", 403));
  // // 2. Ako postoji korisnik sa istim mejlom, vrati grešku
  // const provjera = await Korisnik.find({ mejl: req.body.mejl });

  // if (provjera.length !== 0)
  //   return next(new AppError("Uneseni mejl već postoji!", 403));
  if (req.body.šifra.length < 8)
    return next(new AppError("Šifra mora biti duža", 411));

  const noviKorisnik = await Korisnik.create({
    ime: req.body.ime,
    prezime: req.body.prezime,
    mejl: req.body.mejl,
    šifra: req.body.šifra,
    slika: req.body.slika,
  });

  res.status(201).json({
    status: "success",
    noviKorisnik,
  });
});

exports.dohvatiKorisnika = catchAsync(async (req, res, next) => {
  const korisnik = await Korisnik.findById(req.user.id);
  if (!korisnik) return next(new AppError("Korisnik ne postoji...", 404));
  res.status(200).json({
    status: "success",
    korisnik,
  });
});

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Molimo postavite sliku...", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.filterSlike = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}.jpeg`;

  await sharp(req.file.buffer)
    .resize(700, 700)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`${__dirname}/../public/slike/${req.file.filename}`);

  req.body.slika = req.file.filename;
  await this.ažurirajKorisnika(req);

  next();
});

exports.postaviSliku = upload.single("slika");

exports.obrišiKorisnika = catchAsync(async (req, res, next) => {
  const korisnik = await Korisnik.findById(req.user.id).select("+šifra");
  if (!korisnik) return next(new AppError("Prijavite se prvo...", 401));
  if (!korisnik.usporediŠifre(req.body.šifra, korisnik.šifra))
    return next(new AppError("Šifra je neispravna...", 403));

  await Korisnik.deleteOne(korisnik);

  res.status(204).json({
    status: "success",
  });
});
