const sistemPretrage = (pretraga, naslovBilješke) => {
  // trening -> Trening
  // 1. Mala velika slova
  pretraga = pretraga.toLowerCase();
  naslovBilješke = naslovBilješke.toLowerCase();
  if (naslovBilješke.startsWith(pretraga)) {
    return true;
  }

  // 2. Različite riječi
  const riječi = naslovBilješke
    .split(" ")
    .filter((item) => item.startsWith(pretraga));
  if (riječi.length !== 0) return true;

  // 3. Spojen naslov
  naslovBilješke = naslovBilješke.split(" ").join("");
  if (naslovBilješke.startsWith(pretraga)) {
    return true;
  }
  // Ako je sve netačno, vrati false
  return false;
};

module.exports = sistemPretrage;
