import { Link } from "react-router-dom";
import Polje from "../registracija/Polje";
import { useEffect, useRef, useState, useContext } from "react";
import { KontContext } from "../App";
import PromjenaŠifre from "./PromjenaŠifre";

const UrediKorisnika = () => {
  const ref = useRef(null);

  const { setMalaSlika } = useContext(KontContext);

  const [slika, setSlika] = useState("");
  // const [promjenaImena, setPromjenaImena] = useState(false);

  const [ime, setIme] = useState("");
  const [promjenaImena, setPromjenaImena] = useState(false);

  const [prezime, setPrezime] = useState("");
  const [promjenaPrezimena, setPromjenaPrezimena] = useState(false);

  const [mejl, setMejl] = useState("");
  const [promjenaMejla, setPromjenaMejla] = useState(false);

  const [šifra, setŠifra] = useState("********");
  const [promjenaŠifre, setPromjenaŠifre] = useState(false);

  const postaviIme = (e) => {
    setPromjenaPrezimena(false);
    setPromjenaMejla(false);

    if (e.target)
      e.target.value.length <= 16
        ? setIme(e.target.value)
        : alert("Ime ne može sadržavati više od 16 znakova");

    if (e.key === "Enter") setPromjenaImena(false);
  };

  const postaviPrezime = (e) => {
    setPromjenaImena(false);
    setPromjenaMejla(false);

    if (e.target)
      e.target.value.length <= 16
        ? setPrezime(e.target.value)
        : alert("Prezime ne može sadržavati više od 16 znakova");

    if (e.key === "Enter") setPromjenaPrezimena(false);
  };

  const postaviMejl = (e) => {
    setPromjenaImena(false);
    setPromjenaPrezimena(false);

    if (e.target) setMejl(e.target.value);

    if (e.key === "Enter") setPromjenaMejla(false);
  };

  const postaviŠifru = (e) => {
    if (e.target) setŠifra(e.target.value);

    if (e.key === "Enter") setPromjenaŠifre(false);
  };

  const postaviSliku = async (e) => {
    const slika = e.target.files[0];
    if (slika.type.split("/")[0] !== "image") return;
    // Omogucava prijenos slike
    const formData = new FormData();
    formData.append("slika", slika);

    const url = await fetch("/postaviSliku", {
      method: "POST",
      credentials: "include",
      redirect: "follow",
      body: formData,
    });
    const res = await url.json();
    window.location.reload();
  };

  const promjenaŠifreCB = () => {
    setPromjenaŠifre(true);
  };

  useEffect(() => {
    (async () => {
      const url = await fetch("/dohvatiKorisnika", {
        credentials: "include",
        redirect: "follow",
      });
      const { korisnik } = await url.json();
      setIme(korisnik.ime);
      korisnik.prezime
        ? setPrezime(korisnik.prezime)
        : setPrezime("Dodaj prezime");
      setMejl(korisnik.mejl);
      setSlika(korisnik.slika);
      setMalaSlika(korisnik.slika);
    })();
  }, []);

  const sačuvajPodatkeCB = async () => {
    const podaci = {
      ime,
      prezime,
      mejl,
    };
    const url = await fetch("/azurirajKorisnika", {
      method: "POST",
      credentials: "include",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(podaci),
    });
    const res = await url.json();
    alert("Uspješno ažurirani podaci :D");
  };

  return (
    <div className="w-screen h-screen centriraj bg-tamno-zelena bg-opacity-60 md:bg-transparent overflow-hidden">
      <span className="grid px-32 py-12 md:bg-tamno-zelena rounded-3xl md:bg-opacity-70">
        {!promjenaŠifre && (
          <h1 className="text-3xl md:text-5xl text-siva font-bold tracking-wide mx-auto">
            Korisnički podaci
          </h1>
        )}
        {promjenaŠifre && (
          <h1 className="text-5xl text-siva font-bold tracking-wide mx-auto">
            Promjena šifre
          </h1>
        )}
        {!promjenaŠifre && (
          <span>
            <div className="flex flex-col rounded-3xl mt-8">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden hover:cursor-pointer group">
                {/* SLIKA */}
                <button className="top-1/2 w-full text-center absolute z-10 font-bold text-white -translate-y-1/2 md:hidden group-hover:block animacija">
                  DODAJ SLIKU
                </button>
                <input
                  type="file"
                  onChange={postaviSliku}
                  className="opacity-0 top-1/2 w-full text-center absolute z-10 font-bold text-white -translate-y-1/2 hidden group-hover:inline hover:cursor-pointer animacija"
                ></input>
                <img
                  alt="profilna"
                  className="h-full w-full scale-[1.13] translate-y-2 opacity-50 md:opacity-100 md:group-hover:opacity-50 animacija"
                  src={`/slike/${slika}`}
                ></img>
              </div>
              {/* IME */}
              {!promjenaImena && (
                <div
                  className="pl-4 flex items-center gap-4 h-20 w-full hover:cursor-pointer group border-b-2 border-white"
                  onClick={setPromjenaImena.bind(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                    class="w-10 md:w-12 h-10 md:h-12   flex align-middle justify-center group-hover:rotate-6 animacija"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <h1 className="text-xl md:text-2xl font-semibold text-white ">
                    {ime}
                  </h1>
                </div>
              )}
              {/* Uređivanje Imena*/}
              {promjenaImena && (
                <div className="pl-4 flex items-center gap-4 relative w-full h-20 border-b-2 border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                    class="w-10 md:w-12 h-10 md:h-12  flex align-middle justify-center hover:rotate-6 animacija cursor-pointer"
                    onClick={setIme.bind(Event)}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <input
                    ref={ref}
                    autoFocus
                    className="h-full w-72 text-white text-xl md:text-2xl font-semibold focus:border-0 bg-transparent border-none outline-none"
                    placeholder="Unesi naslov"
                    value={ime}
                    onChange={postaviIme.bind(Event)}
                    onKeyDown={postaviIme.bind(Event)}
                  ></input>
                </div>
              )}
              {/* PREZIME */}
              {!promjenaPrezimena && (
                <div
                  className="pl-4 flex items-center gap-4 h-20 w-full hover:cursor-pointer group border-b-2 border-white"
                  onClick={setPromjenaPrezimena.bind(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                    class="w-10 md:w-12 h-10 md:h-12  flex align-middle justify-center group-hover:rotate-6 animacija"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <h1 className="text-xl md:text-2xl font-semibold text-white ">
                    {prezime}
                  </h1>
                </div>
              )}
              {/* UREĐIVANJE PREZIMENA*/}
              {promjenaPrezimena && (
                <div className="pl-4 flex items-center gap-4 relative w-full h-20 border-b-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                    class="w-10 md:w-12 h-10 md:h-12  flex align-middle justify-center hover:rotate-6 animacija cursor-pointer"
                    onClick={setPrezime.bind(Event)}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <input
                    className="h-full w-72 text-white text-xl md:text-2xl font-semibold focus:border-0 bg-transparent border-none outline-none"
                    autoFocus
                    placeholder="Unesi naslov"
                    value={prezime}
                    onChange={postaviPrezime.bind(Event)}
                    onKeyDown={postaviPrezime.bind(Event)}
                  ></input>
                </div>
              )}
              {/* MEJL */}
              {!promjenaMejla && (
                <div
                  className="pl-4 flex items-center gap-4 h-20 w-full hover:cursor-pointer group border-b-2 border-white"
                  onClick={setPromjenaMejla.bind(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                    class="w-10 md:w-12 h-10 md:h-12  flex align-middle justify-center group-hover:rotate-6 animacija"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <h1 className="text-xl md:text-2xl font-semibold text-white w-72 overflow-hidden">
                    {mejl}
                  </h1>
                </div>
              )}
              {/* UREĐIVANJE MEJLA*/}
              {promjenaMejla && (
                <div className="pl-4 flex items-center gap-4 relative w-full h-20 border-b-2 border-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                    class="w-10 md:w-12 h-10 md:h-12  flex align-middle justify-center hover:rotate-6 animacija cursor-pointer"
                    onClick={setMejl.bind(Event)}
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <input
                    className="h-full w-72 text-white text-xl md:text-2xl font-semibold bg-transparent outline-0 "
                    autoFocus
                    placeholder="Unesi naslov"
                    value={mejl}
                    onChange={postaviMejl.bind(Event)}
                    onKeyDown={postaviMejl.bind(Event)}
                  ></input>
                </div>
              )}
              {/* ŠIFRA */}
              {!promjenaŠifre && (
                <div
                  onClick={promjenaŠifreCB}
                  className="pl-4 flex items-center gap-4 h-20 w-full hover:cursor-pointer group border-b-2 border-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                    class="w-10 md:w-12 h-10 md:h-12  flex align-middle justify-center group-hover:rotate-6 animacija"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  <h1 className="text-xl md:text-2xl font-semibold text-white ">
                    {šifra}
                  </h1>
                </div>
              )}

              <span className="flex flex-row gap-4 rounded-3xl mt-8">
                <Link
                  to="/"
                  className="bg-siva w-[40%] h-20 rounded-3xl font-bold text-xl md:text-2xl centriraj"
                >
                  Vrati se
                </Link>
                <button
                  className="bg-tamno-zelena w-[60%] h-20 rounded-3xl font-bold text-xl md:text-2xl text-siva centriraj"
                  onClick={sačuvajPodatkeCB}
                >
                  Sačuvaj
                </button>
              </span>
            </div>
          </span>
        )}
        {promjenaŠifre && <PromjenaŠifre setPromjenaŠifre={setPromjenaŠifre} />}
      </span>
    </div>
  );
};

export default UrediKorisnika;
