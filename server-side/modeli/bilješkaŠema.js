const mongoose = require("mongoose");

const biljeskaSchema = new mongoose.Schema({
  korisnik: {
    type: mongoose.Schema.ObjectId,
    ref: "korisnik",
    require: [true, "Korisnik je obavezan."],
  },
  naslov: {
    type: String,
    default: "Nova Bilješka",
  },
  sadržaj: {
    type: String,
  },
  datumKreiranja: {
    type: Date,
    default: Date.now(),
  },
});

const Biljeska = mongoose.model("bilješka", biljeskaSchema);

Biljeska.createCollection();

module.exports = Biljeska;
