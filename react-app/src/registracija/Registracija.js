import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LozinkaIkona from "../ikone/LozinkaIkona";
import Polje from "./Polje";

const Registracija = () => {
  const navigate = useNavigate();

  const [greska, setGreska] = useState("");

  const [ime, setIime] = useState("");
  const [prezime, setPrezime] = useState("");
  const [mejl, setMejl] = useState("");
  const [šifra, setŠifra] = useState("");
  const [potvrdiŠifru, setPotvrdiŠifru] = useState("");

  const postaviIme = function (e) {
    setIime(e.target.value);
  };

  const postaviPrezime = function (e) {
    setPrezime(e.target.value);
  };

  const postaviMejl = function (e) {
    setMejl(e.target.value);
  };

  const postaviŠifru = function (e) {
    setŠifra(e.target.value);
  };

  const postaviPotvrdiŠifru = function (e) {
    setPotvrdiŠifru(e.target.value);
  };

  const potvrdiRegistraciju = async function () {
    if (!ime || !mejl || !šifra || !potvrdiŠifru) {
      setGreska("Popuni sva polja!");
      return;
    }
    if (!šifra || šifra !== potvrdiŠifru) {
      setGreska("Šifre se ne podudaraju!");
      return;
    }

    const podaci = {
      ime,
      prezime,
      mejl,
      šifra,
      potvrdiŠifru,
    };

    const url = await fetch("https://e-notes-4mhk.onrender.com/registracija", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(podaci),
    });
    const res = await url.json();
    console.log(res);
    if (res?.poruka) {
      setGreska(res.poruka);
      return;
    }
    alert("Uspješno kreiran nalog, sada se prijavite...");
    navigate("/login");
  };
  return (
    <div className="w-screen h-screen centriraj overflow-hidden">
      <span className="flex flex-col gap-4 rounded-3xl mt-16 mx-auto z-50">
        <h1 className="text-5xl text-siva font-bold tracking-wide mx-auto">
          REGISTRACIJA
        </h1>
        <span>
          <div className="flex flex-col gap-4 rounded-3xl mt-8">
            {/* IME */}
            <Polje
              klase={
                "relative w-[90vw] px-4 sm:px-12 sm:w-[30rem] md:w-[36rem] h-20 rounded-3xl"
              }
              placeholder={"Unesi ime*"}
              vrijednost={ime}
              cb={postaviIme}
            ></Polje>

            {/* PREZIME */}
            <Polje
              klase={
                "relative w-[90vw] px-4 sm:px-12 sm:w-[30rem] md:w-[36rem] h-20 rounded-3xl"
              }
              placeholder={"Unesi prezime"}
              vrijednost={prezime}
              cb={postaviPrezime}
            ></Polje>

            {/* MEJL */}
            <Polje
              klase={
                "relative w-[90vw] px-4 sm:px-12 sm:w-[30rem] md:w-[36rem] h-20 rounded-3xl"
              }
              placeholder={"Unesi mejl*"}
              vrijednost={mejl}
              cb={postaviMejl}
            ></Polje>

            {/* ŠIFRA */}
            <Polje
              klase={
                "relative w-[90vw] px-4 sm:px-12 sm:w-[30rem] md:w-[36rem] h-20 rounded-3xl"
              }
              placeholder={"Unesi šifru*"}
              vrijednost={šifra}
              cb={postaviŠifru}
              tip={"password"}
            ></Polje>

            {/* POTVRDI ŠIFRU */}
            <Polje
              klase={
                "relative w-[90vw] px-4 sm:px-12 sm:w-[30rem] md:w-[36rem] h-20 rounded-3xl"
              }
              placeholder={"Potvrdi šifru*"}
              vrijednost={potvrdiŠifru}
              cb={postaviPotvrdiŠifru}
              tip={"password"}
            ></Polje>

            {!greska && <div className="h-8 invisible"></div>}
            {greska && (
              <div className="h-8 text-center font-bold text-red-600 ">
                {greska}
              </div>
            )}

            <span className="flex flex-col sm:flex-row gap-4 rounded-3xl z-50 w-[90vw] px-4 sm:px-12 sm:w-[30rem] md:w-[36rem]">
              <Link
                to="/login"
                className="bg-siva w-full sm:w-[55%] h-16 sm:h-20 rounded-3xl font-bold text-xl sm:text-2xl centriraj"
              >
                Vrati se
              </Link>
              <button
                className="bg-tamno-zelena w-full sm:w-[45%] h-16 sm:h-20 rounded-3xl font-bold text-xl sm:text-2xl text-siva centriraj"
                onClick={potvrdiRegistraciju}
              >
                Potvrdi
              </button>
            </span>
          </div>
        </span>
      </span>
    </div>
  );
};

export default Registracija;
