const sistemSortiranja = (bilješke, opcija, poredak) => {
  // PO DATUMU
  if (opcija === "Datum" && poredak) {
    return bilješke.sort(
      (a, b) => Date.parse(a.datumKreiranja) - Date.parse(b.datumKreiranja)
    );
  }
  if (opcija === "Datum" && !poredak) {
    return bilješke.sort(
      (a, b) => Date.parse(b.datumKreiranja) - Date.parse(a.datumKreiranja)
    );
  }
  // PO ABECEDI
  if (opcija === "Abc" && poredak) {
    return bilješke.sort((a, b) => a.naslov.localeCompare(b.naslov));
  }
  if (opcija === "Abc" && !poredak) {
    return bilješke.sort((a, b) => b.naslov.localeCompare(a.naslov));
  }
};

module.exports = sistemSortiranja;
