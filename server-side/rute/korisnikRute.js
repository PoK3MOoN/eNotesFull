const express = require("express");
const authKontroleri = require("../kontroleri/authKontroleri");
const korisnikKontroleri = require("../kontroleri/korisnikKontroleri");

const korisnikRuter = express.Router();

korisnikRuter.get("/uzmiSveKorisnike", korisnikKontroleri.uzmiSveKorisnike);
korisnikRuter.post("/jelUlogovan", authKontroleri.jelUlogovan);

korisnikRuter.post("/login", authKontroleri.login);
korisnikRuter.post("/registracija", korisnikKontroleri.registracija);

korisnikRuter.use(authKontroleri.zaštita);
korisnikRuter.get("/dohvatiKorisnika", korisnikKontroleri.dohvatiKorisnika);
korisnikRuter.get("/odjaviKorisnika", authKontroleri.odjaviKorisnika);

korisnikRuter.patch(
  "/azurirajKorisnika",
  authKontroleri.zaštita,
  korisnikKontroleri.ažurirajKorisnika
);

korisnikRuter.post(
  "/postaviSliku",
  korisnikKontroleri.postaviSliku,
  korisnikKontroleri.filterSlike
);

korisnikRuter.delete(
  "/obrisiKorisnika",
  authKontroleri.zaštita,
  korisnikKontroleri.obrišiKorisnika
);

module.exports = korisnikRuter;
