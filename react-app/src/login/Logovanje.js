import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { KontContext } from "../App";

const Logovanje = ({ log }) => {
  const navigate = useNavigate();

  const {
    ulogovan,
    ulogovanoIme,
    setUlogovan,
    setUlogovanoIme,
    malaSlika,
    setMalaSlika,
  } = useContext(KontContext);
  useEffect(() => {
    (async () => {
      const url = await fetch("https://e-notes-4mhk.onrender.com/jelUlogovan", {
        method: "GET",
        redirect: "follow",
        credentials: "include",
      });

      const res = await url.json();

      if (!res.korisnik) return;
      setUlogovan(true);

      setUlogovanoIme(
        res.korisnik.prezime
          ? `${res.korisnik.ime} ${res.korisnik.prezime}`
          : `${res.korisnik.ime}`
      );
      setMalaSlika(res.korisnik.slika);
    })();
    if (ulogovan) {
      navigate("/");
    }
  }, [ulogovan]);
  const [greska, setGreska] = useState("");

  const [mejl, setMejl] = useState("");
  const [šifra, setŠifra] = useState("");

  const promjenaMejla = function (e) {
    setMejl(e.target.value);
  };

  const promjenaSifre = function (e) {
    setŠifra(e.target.value);
  };

  const ulogujSeCB = async () => {
    const loginInfo = {
      mejl,
      šifra,
    };
    const url = await fetch("https://e-notes-4mhk.onrender.com/login", {
      method: "POST",
      redirect: "follow",
      credentials: "include", // Don't forget to specify this if you need cookies
      headers: {
        "Content-Type": "application/json",
      },
      body: await JSON.stringify(loginInfo),
    });

    const res = await url.json();
    if (res.status === "fail") {
      setGreska(res.message);
      return;
    }

    setUlogovan(true);
    setUlogovanoIme(
      res.korisnik.prezime
        ? `${res.korisnik.ime} ${res.korisnik.prezime}`
        : `${res.korisnik.ime}`
    );
    setMalaSlika(res.korisnik.slika);

    localStorage.setItem("ulogovan", "jeste");

    navigate("/");
  };

  return (
    <span className="flex flex-col gap-4 rounded-3xl mt-16 mx-auto z-50 ">
      <div className="relative w-[90vw] px-4 sm:px-12 sm:w-[30rem] md:w-[36rem] h-20 rounded-3xl">
        <input
          type="email"
          className="w-full h-full pl-8 text-xl sm:text-2xl placeholder:text-white text-white outline-none bg-transparent border-b-2 border-siva "
          placeholder="Unesi mejl"
          value={mejl}
          onChange={promjenaMejla.bind(Event)}
        ></input>
      </div>
      <div className="relative w-[90vw] px-4 sm:px-12 sm:w-[30rem] md:w-[36rem] h-20 rounded-3xl ">
        <input
          type="password"
          className="w-full h-full pl-8 text-xl sm:text-2xl placeholder:text-white text-white outline-none bg-transparent border-b-2 border-siva "
          placeholder="Unesi šifru"
          value={šifra}
          onChange={promjenaSifre.bind(Event)}
          onKeyDown={(Event) => {
            if (Event.key === "Enter") ulogujSeCB();
          }}
        ></input>
      </div>

      {!greska && <div className="h-4 sm:h-8 invisible"></div>}
      {greska && (
        <div className="h-4 sm:h-8 text-center font-bold text-red-600 ">
          {greska}
        </div>
      )}

      <span className="flex flex-col sm:flex-row gap-4 rounded-3xl z-50 w-[90vw] px-4 sm:px-12 sm:w-[30rem] md:w-[36rem] ">
        <Link
          to="/registracija"
          className="bg-siva w-full sm:w-[55%] h-16 sm:h-20 rounded-3xl font-bold text-xl sm:text-2xl centriraj"
        >
          Registruj se
        </Link>
        <button
          className="bg-tamno-zelena w-full sm:w-[45%] h-16 sm:h-20 rounded-3xl font-bold text-xl sm:text-2xl text-siva centriraj"
          onClick={ulogujSeCB}
        >
          Uloguj se
        </button>
      </span>
    </span>
  );
};

export default Logovanje;
