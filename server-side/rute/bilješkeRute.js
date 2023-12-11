const express = require("express");
const bilješkeKontroleri = require("../kontroleri/bilješkeKontroleri");
const authKontroleri = require("../kontroleri/authKontroleri");

const bilješkaRouter = express.Router();

bilješkaRouter.get("/uzmiSveBiljeske", bilješkeKontroleri.uzmiSveBilješke);

bilješkaRouter.get(
  "/biljeskeJednog",
  authKontroleri.zaštita,
  bilješkeKontroleri.uzmiBilješkeJednog
);
bilješkaRouter.get(
  "/uzmiBiljesku/:id",
  authKontroleri.zaštita,
  bilješkeKontroleri.uzmiJednuBilješku
);
bilješkaRouter.post(
  "/napraviBiljesku",
  authKontroleri.zaštita,
  bilješkeKontroleri.napraviBiljesku
);
bilješkaRouter.patch(
  "/azurirajBiljesku",
  authKontroleri.zaštita,
  bilješkeKontroleri.ažurirajBilješku
);
bilješkaRouter.delete(
  "/obrisiBiljesku",
  authKontroleri.zaštita,
  bilješkeKontroleri.obrišiBilješku
);

module.exports = bilješkaRouter;
