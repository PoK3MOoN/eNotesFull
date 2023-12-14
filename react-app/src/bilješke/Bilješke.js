import { useContext, useEffect, useState } from "react";
import { KontContext } from "../App";
import BilješkaPreview from "../grupe/BilješkaPreview";
import OdjavaIkona from "../ikone/OdjavaIkona";
import UrediIkona from "../ikone/UrediIkona";
import Logo from "../slike/Logo";
import { Link, useNavigate } from "react-router-dom";
import sistemPretrage from "../pomocne/sistemPretrage";
import StrelicaGore from "../ikone/StrelicaGore";
import sistemSortiranja from "../pomocne/sistemSortiranja";

const Bilješke = () => {
  const navigate = useNavigate();

  const [učitavanje, setUčitavanje] = useState(true);

  const { ulogovan, ulogovanoIme, setUlogovan, malaSlika, setMalaSlika } =
    useContext(KontContext);

  const [bilješke, setBilješke] = useState([]);
  const [pretraga, setPretraga] = useState(bilješke);
  const [pretrazivanje, setPretrazivanje] = useState(false);

  const [meni, setMeni] = useState(false);

  const [opcijaSortiranja, setOpcijaSortiranja] = useState("Datum");
  const [poredak, setPoredak] = useState(true);

  const [fsSlika, setFsSlika] = useState(false);

  const meniCB = () => {
    if (!meni) setMeni(true);
    else setMeni(false);
  };

  const fsCB = () => {
    if (!fsSlika) setFsSlika(true);
    else setFsSlika(false);
  };

  useEffect(() => {
    if (!ulogovan) {
      navigate("/login");
    }
    sistemSortiranja(bilješke, opcijaSortiranja, poredak);
  }, [ulogovan]);

  useEffect(() => {
    (async () => {
      const url = await fetch(
        "https://e-notes-4mhk.onrender.com/biljeskeJednog",
        {
          method: "GET",
          redirect: "follow",
          credentials: "include",
        }
      );
      const { bilješke } = await url.json();
      console.log(bilješke);
      setBilješke(bilješke);
      setUčitavanje(false);
    })();
  }, []);

  const sortiranje = () => {
    sistemSortiranja(bilješke, opcijaSortiranja, poredak);
    if (poredak) setPoredak(false);
    else {
      opcijaSortiranja === "Datum"
        ? setOpcijaSortiranja("Abc")
        : setOpcijaSortiranja("Datum");
      setPoredak(true);
    }
  };

  const odjavaCB = async () => {
    const odgovor = window.confirm("Jeste li sigurni da se želite odjaviti?");
    if (odgovor) {
      await fetch("https://e-notes-4mhk.onrender.com/odjaviKorisnika", {
        method: "GET",
        redirect: "follow",
        credentials: "include",
      });
      setUlogovan(false);
    }
  };

  const pretragaCB = (e) => {
    e.target.value !== "" ? setPretrazivanje(true) : setPretrazivanje(false);
    const pretraga = e.target.value;
    const biljeske = bilješke.filter((item) =>
      sistemPretrage(pretraga, item.naslov)
    );

    setPretraga(biljeske);
  };

  const obrisiCB = async (id) => {
    const body = {
      id: id,
    };
    const odgovor = window.confirm(
      "Jeste li sigurni da želite izbrisati bilješku?"
    );
    if (odgovor) {
      const biljeske = bilješke.filter((item) => item._id !== id);
      const url = await fetch(
        "https://e-notes-4mhk.onrender.com/obrisiBiljesku",
        {
          method: "DELETE",
          redirect: "follow",
          credentials: "include",
          body: await JSON.stringify(body),
        }
      );
      setBilješke(biljeske);
    }
  };

  return (
    <div className="bg-transparent overflow-hidden">
      {meni && (
        <div className="absolute h-full w-full bg-tamno-zelena bg-opacity-90 z-[100] flex flex-col items-center justify-center gap-6">
          <div
            className={`${
              fsSlika
                ? "absolute top-[25%] w-[90vw] h-[90vw] z-[100] border-8 border-tamno-zelena"
                : "w-36 h-36 rounded-full"
            }  overflow-hidden shadow-xl`}
            onClick={fsCB}
          >
            <img
              className="object-fill"
              alt="prof"
              src={`https://e-notes-4mhk.onrender.com/slike/${malaSlika}`}
            ></img>
          </div>
          <Link
            to="/uredjivanje-korisnika"
            className="flex flex-col items-center justify-center animacija hover:cursor-pointer "
          >
            <p className="text-center text-white text-2xl mb-8 drop-shadow-xl">
              {ulogovanoIme}
            </p>
            <span className="flex gap-2 justify-center items-center text-xl text-white drop-shadow-xl">
              <UrediIkona
                klase={""}
                velicina={"h-7 w-7 md:h-8 md:w-8"}
                tekst={"hidden"}
              />
              <h1>Uredi profil</h1>
            </span>
          </Link>
          <button
            className="flex gap-2 justify-center items-center text-xl text-white mt-4 drop-shadow-xl"
            onClick={meniCB}
          >
            <StrelicaGore velicina={"h-6 w-6 rotate-90"} />
            <h1>Vrati se</h1>
          </button>
          <button
            className="flex gap-2 justify-center items-center text-xl text-white mt-48 drop-shadow-xl"
            onClick={odjavaCB}
          >
            <OdjavaIkona velicina={"h-7 w-7 md:h-8 md:w-8"} />
            <h1>Odjavi se</h1>
          </button>
        </div>
      )}
      <header className="fixed w-full h-16 md:h-20 flex z-[60] bg-tamno-zelena">
        <Logo klase="scale-[0.33] md:scale-[0.4] lg:scale-[0.5] mx-auto opacity-70" />
        <button
          className="absolute right-5 top-6 flex sm:hidden h-8 w-8 flex-col gap-2"
          onClick={meniCB}
        >
          <div className="w-full bg-white h-0.5"></div>
          <div className="w-full bg-white h-0.5"></div>
          <div className="w-full bg-white h-0.5"></div>
        </button>
        <div className="hidden sm:flex text-siva font-semibold absolute right-0 top-[50%] -translate-y-[50%] gap-2 lg:gap-4 items-center">
          <Link
            to="/uredjivanje-korisnika"
            className="flex gap-3 lg:gap-6 items-center animacija hover:scale-105 hover:cursor-pointer"
            title="Uredi profil"
          >
            <div className="w-8 md:w-10 h-full rounded-full overflow-hidden">
              <img
                className="object-fill"
                alt="prof"
                src={`/slike/${malaSlika}`}
              ></img>
            </div>
            <p className="text-end text-lg md:text-xl">{ulogovanoIme}</p>
            <UrediIkona
              klase={""}
              velicina={"h-7 w-7 md:h-8 md:w-8"}
              tekst={"hidden"}
            />
          </Link>
          <div
            className="flex gap-2 sm:mr-6 md:mr-10 lg:mr-20"
            title="Odjavi se"
          >
            <OdjavaIkona
              velicina={"h-7 w-7 md:h-8 md:w-8"}
              callback={odjavaCB}
            />
          </div>
        </div>
      </header>
      <main className="h-full pt-16 md:pt-20 mx-auto w-[90%] lg:w-[54rem] xl:w-[72rem] 2xl:w-[90rem]">
        {/* FILTERI */}
        <span className="uppercase text-siva text-md md:text-lg font-bold flex item gap-12 items-center justify-between my-4 mx-3 xl:mx-0 z-50 ">
          {/*  SORTIRANJE */}
          <div
            className="flex gap-2 items-center hover:cursor-pointer drop-shadow-xl"
            onClick={sortiranje}
          >
            {`${
              window.innerWidth >= 640 ? "Sortiraj -" : ""
            } ${opcijaSortiranja}`}
            {!poredak && <StrelicaGore velicina={"h-6 w-6 rotate-180"} />}
            {poredak && <StrelicaGore velicina={"h-6 w-6"} />}
          </div>
          {/*  PRETRAGA */}
          <div className="w-48 md:w-64 h-12 bg-white py-3 md:py-2 px-4 rounded-md overflow-hidden shadow-xl">
            <input
              placeholder="Pretrazi"
              className="focus:border-0 border-none outline-none text-black"
              onChange={pretragaCB.bind(Event)}
            ></input>
          </div>
        </span>
        <div className="gap-y-8 gap-x-2 mt-8 justify-items-center grid grid-cols-2 md:gap-x-2 sm:grid-cols-3 lg:gap-x-8 xl:grid-cols-4  2xl:grid-cols-5 ">
          {učitavanje && (
            <div className=" text-white text-3xl">Učitavanje...</div>
          )}
          {!učitavanje &&
            !pretrazivanje &&
            bilješke &&
            bilješke.map((item) => (
              <BilješkaPreview
                ime={item.naslov}
                tekst={item.sadržaj}
                datum={new Date(item.datumKreiranja).toLocaleDateString(
                  "sr-rs",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
                callback={obrisiCB}
                id={item._id}
              />
            ))}
          {!učitavanje &&
            pretrazivanje &&
            bilješke &&
            pretraga.map((item) => (
              <BilješkaPreview
                ime={item.naslov}
                tekst={item.sadržaj}
                datum={new Date(item.datumKreiranja).toLocaleDateString(
                  "sr-rs",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )}
                callback={obrisiCB}
                id={item._id}
              />
            ))}

          {!učitavanje && bilješke && bilješke.length === 0 && (
            <Link to="dodaj-bilješku">
              <div className="relative group w-[38vw] sm:w-[26vw] lg:w-64 h-72 md:h-96 rounded-xl pl-4 sm:pl-6 p-6 flex flex-col gap-2 justify-center items-center shadow-xl bg-tamno-zelena hover:cursor-pointer animacija z-0 md:hover:scale-105">
                <div className="text-[0.75rem] md:text-xl lg:text-2xl rounded-full z-10 text-white">
                  Dodaj prvu bilješku
                </div>
              </div>
            </Link>
          )}
        </div>
      </main>

      <Link to="dodaj-bilješku">
        <aside className="group fixed right-8 lg:hover:right-24 bottom-10 flex text-siva hover:cursor-pointer lg:animacija rounded-full h-20 w-20 lg:hover:w-40 shadow-xl">
          <div className=" bottom-0 text-6xl p-5 pt-0 bg-[#046649] rounded-full z-10">
            +
          </div>
          <div className="hidden lg:block opacity-0 group-hover:opacity-100 w-0 group-hover:w-[15rem] p-5 group-hover:pr-12 group-hover:pl-24 absolute bottom-0 left-0 rounded-full text-4xl bg-tamno-zelena overflow-hidden animacija">
            DODAJ
          </div>
        </aside>
      </Link>
    </div>
  );
};

export default Bilješke;
