import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const PromjenaŠifre = ({ setPromjenaŠifre }) => {
  const [staraŠifra, setStaraŠifra] = useState("");
  const [novaŠifra, setNovaŠifra] = useState("");
  const [potvrdaNoveŠifre, setPotvrdaNoveŠifre] = useState("");

  const navigate = useNavigate();

  const promjenaŠifreCB = () => {
    setPromjenaŠifre(false);
  };

  const postaviStaruŠifru = (e) => {
    if (e.target) setStaraŠifra(e.target.value);
  };
  const postaviNovuŠifru = (e) => {
    if (e.target) setNovaŠifra(e.target.value);
  };
  const postaviPotvrduNoveŠifre = (e) => {
    if (e.target) setPotvrdaNoveŠifre(e.target.value);
  };

  const sačuvajPodatkeCB = async () => {
    if (novaŠifra !== potvrdaNoveŠifre) {
      alert("Šifre se moraju poklapati!");
      return;
    }
    if (staraŠifra === novaŠifra) {
      alert("Nova šifra je ista kao stara!");
      return;
    }
    const podaci = {
      šifra: staraŠifra,
      novaŠifra: novaŠifra,
    };

    const url = await fetch("https://e-notes-4mhk.onrender.com/promjenaSifre", {
      method: "PATCH",
      credentials: "include",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(podaci),
    });

    const res = await url.json();
    alert("Uspješno ažurirani podaci :D");
    navigate("/");
  };

  return (
    <span className="grid">
      <span>
        <div className="flex flex-col gap-4 rounded-3xl mt-8">
          {/* STARA ŠIFRA*/}
          <div className="pl-4 flex items-center gap-4 relative w-full h-20 border-b-2 border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-12 h-12 flex align-middle justify-center hover:rotate-6 animacija cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <input
              className="h-full text-white text-2xl font-semibold focus:border-0 bg-transparent border-none outline-none placeholder:text-white"
              placeholder="Unesi staru šifru"
              value={staraŠifra}
              onChange={postaviStaruŠifru.bind(Event)}
              onKeyDown={postaviStaruŠifru.bind(Event)}
              type="password"
            ></input>
          </div>

          {/* NOVA ŠIFRA */}
          <div className="pl-4 flex items-center gap-4 relative w-full h-20 border-b-2 border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-12 h-12 flex align-middle justify-center hover:rotate-6 animacija cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <input
              className="h-full text-white text-2xl font-semibold focus:border-0 bg-transparent border-none outline-none placeholder:text-white"
              placeholder="Unesi novu šifru"
              value={novaŠifra}
              onChange={postaviNovuŠifru.bind(Event)}
              onKeyDown={postaviNovuŠifru.bind(Event)}
              type="password"
            ></input>
          </div>

          {/* POTVRDA NOVE ŠIFRE*/}
          <div className="pl-4 flex items-center gap-4 relative w-full h-20 border-b-2 border-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-12 h-12 flex align-middle justify-center hover:rotate-6 animacija cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            <input
              className="h-full text-white text-2xl font-semibold focus:border-0 bg-transparent border-none outline-none placeholder:text-white"
              placeholder="Ponovi novu šifru"
              value={potvrdaNoveŠifre}
              onChange={postaviPotvrduNoveŠifre.bind(Event)}
              onKeyDown={postaviPotvrduNoveŠifre.bind(Event)}
              type="password"
            ></input>
          </div>

          <span className="flex flex-row gap-4 rounded-3xl mt-8">
            <button
              className="bg-siva w-[40%] h-20 rounded-3xl font-bold text-2xl centriraj"
              onClick={promjenaŠifreCB}
            >
              Vrati se
            </button>
            <button
              className="bg-tamno-zelena w-[60%] h-20 rounded-3xl font-bold text-2xl text-siva centriraj"
              onClick={sačuvajPodatkeCB}
            >
              Sačuvaj
            </button>
          </span>
        </div>
      </span>
    </span>
  );
};

export default PromjenaŠifre;
