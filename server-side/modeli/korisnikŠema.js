const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const korisnikŠema = new mongoose.Schema({
  ime: {
    type: String,
    required: [true, "Unesi ime obavezno!"],
  },
  prezime: {
    type: String,
  },
  mejl: {
    type: String,
    unique: true,
    required: [true, "Unesi mejl obavezno!"],
  },
  šifra: {
    type: String,
    minlength: 8,
    required: [true, "Unesi šifru obavezno!"],
    // select: false,
  },
  slika: {
    type: String,
    default: "obicna.png",
  },
});

korisnikŠema.methods.usporediŠifre = async function (
  šifraKandidat,
  pravaŠifra
) {
  return bcrypt.compare(šifraKandidat, pravaŠifra);
};

korisnikŠema.pre("save", async function (next) {
  // 1. Provjeri je li šifra modifikovana
  if (!this.isModified("šifra")) return next();
  // 2. Ako nije, šifra se enkriptuje
  this.šifra = await bcrypt.hash(this.šifra, 12);
});

const Korisnik = mongoose.model("korisnik", korisnikŠema);

module.exports = Korisnik;
