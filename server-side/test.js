const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const bilješkaRouter = require("./rute/bilješkeRute");
const korisnikRouter = require("./rute/korisnikRute");
const AppError = require("./alati/appError");
const greškaKontroleri = require("./kontroleri/greškaKontroleri");

const app = express();

app.use(express.static("public"));
// Middleware koji koristimo kada nam trebaju kolačići
app.use(cookieParser());

// CORS politika: podešavanja
const corsOptions = {
  origin: "https://najbolji-notes.netlify.app/", // Zbog ovoga mi nije radio program, ne koristi localhost!
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); // Use this after the variable declaration

app.options("*", cors());

// Linija koda (middleware) za paljenje servera
app.use(express.json());

// Nakon instalacije dotenva i njegovog uvoženja (linija br. 3), dodajemo putanju prema našem enviroment fajlu (config.env)
dotenv.config({ path: "./config.env" });

app.use(compression());

// Povezivanje našeg servera sa bazom podataka pomoću mongoosa
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
  useNewUrlParser: true,
});

// Pokrećemo server na port 5000
app.listen(5000, () => {});

// Middlewarovi za korištenje posebnih rutera (od korisnika i bilježaka)
app.use(bilješkaRouter);
app.use(korisnikRouter);
// U slučaju da ruta ne postoji:
app.all("*", (req, res, next) => {
  // const err = new Error(`Ne mogu pronaći ${req.originalUrl} na serveru`);
  // err.status = "fail";
  // err.statusKod = 404;

  next(new AppError(`Ne mogu pronaći ${req.originalUrl} na serveru`, 404));
});

app.use(greškaKontroleri);
