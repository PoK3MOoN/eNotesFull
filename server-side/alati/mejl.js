const nodemailer = require("nodemailer");

const pošaljiMejl = async (opcije) => {
  // 1. Napravi transporter
  console.log(
    process.env.MEJL_HOST,
    process.env.MEJL_PORT,
    process.env.MEJL_IME,
    process.env.MEJL_SIFRA
  );
  const transporter = nodemailer.createTransport({
    host: process.env.MEJL_HOST,
    port: process.env.MEJL_PORT,
    auth: {
      user: process.env.MEJL_IME,
      pass: process.env.MEJL_SIFRA,
    },
    // Za gmail ukljuci less secure app
  });
  console.log(opcije);
  // 2. Definiši mejl adresu
  const opcijeMejla = {
    from: "Petar Sudar <petarsudar2@enotes.com>",
    to: opcije.mejl,
    subject: opcije.predmet,
    text: opcije.poruka,
    html: `<div style="background-color: #087F5B; color: white; font-family: "sans-serif"><h1 style="padding-bottom: 6px">${opcije.predmet}</h1><p>${opcije.poruka}</p></div>`,
  };

  // 3. Pošalji mejl
  await transporter.sendMail(opcijeMejla);
};

module.exports = pošaljiMejl;
// module.exports = class Mejl {
//   constructor(korisnik, url) {
//     (this.to = korisnik.mejl),
//       (this.ime = korisnik.ime.split(" ")[0]),
//       (this.url = url),
//       (this.from = `Petar Sudar ${process.env.MEJL_OD}`);
//   }

//   createTransport() {
//     if (process.env.NODE_ENV === "production") {
//       return 1;
//     }

//     return nodemailer.createTransport({
//       host: process.env.EMAIL_HOST,
//       port: process.env.EMAIL_PORT,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }
//   async send(template, subject) {
//     // 1. Renderuj HTML templejt

//     // 2. Definiši opcije mejla
//     const opcijeMejla = {
//       from: this.from,
//       to: this.to,
//       subject,
//       text: "test",
//     };
//     // 3. Napravi transport i pošalji mejl
//     await this.createTransport().sendMail(opcijeMejla);
//   }
//   async sendWelcome() {
//     await this.send("welcome", "Dobrodošo u e-notes :D");
//   }
// };
