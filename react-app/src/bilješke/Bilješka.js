import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ObrisiIkona from "../ikone/ObrisiIkona";

const Bilješka = () => {
  const navigate = useNavigate();

  const [promjena, setPromjena] = useState(false);

  const [učitavanje, setUčitavanje] = useState(true);
  const [poruka, setPoruka] = useState("UČITAVANJE");

  const [naslov, setNaslov] = useState("");
  const [promjenaNaslova, setPromjenaNaslova] = useState(false);

  const [sadržaj, setSadržaj] = useState("");
  const [datumKreiranja, setDatumKreiranja] = useState("");

  // UZIMANJE BILJEŠKE
  const idBilješke = window.location.pathname.split("/")[2];

  useEffect(() => {
    (async () => {
      const url = await fetch(
        `https://e-notes-4mhk.onrender.com/uzmiBiljesku/${idBilješke}`,
        {
          method: "GET",
          redirect: "follow",
          credentials: "include",
        }
      );
      const res = await url.json();
      if (res.status === "failed") setPoruka(res.message);

      const { bilješka } = res;

      setNaslov(bilješka.naslov);
      setSadržaj(bilješka.sadržaj);
      setDatumKreiranja(bilješka.datumKreiranja);

      setUčitavanje(false);
    })();
  }, []);

  const obrisiCB = async () => {
    const body = {
      id: idBilješke,
    };
    console.log(body);
    console.log(await JSON.stringify(body));
    const odgovor = window.confirm(
      "Jeste li sigurni da želite izbrisati bilješku?"
    );
    if (odgovor) {
      const url = await fetch(
        "https://e-notes-4mhk.onrender.com/obrisiBiljesku",
        {
          method: "DELETE",
          redirect: "follow",
          credentials: "include",
          body: await JSON.stringify(body),
        }
      );
      navigate("/");
    }
  };

  const ažurirajCB = async () => {
    if (!promjena) return navigate("/");
    const podaci = {
      idBilješke,
      naslov,
      sadržaj,
    };
    const url = await fetch(
      "https://e-notes-4mhk.onrender.com/azurirajBiljesku",
      {
        method: "PATCH",
        redirect: "follow",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(podaci),
      }
    );
    navigate("/");
  };

  const setNaslovCB = (e) => {
    if (!promjena) setPromjena(true);
    if (e.target)
      e.target.value.length <= 30
        ? setNaslov(e.target.value)
        : alert("Naslov ne može sadržavati više od 30 znakova");

    if (e.key === "Enter") setPromjenaNaslova(false);
  };

  const setSadržajCB = (e) => {
    if (!promjena) setPromjena(true);
    setSadržaj(e.target.value);
  };

  return (
    <div>
      <div className="bg-transparent w-screen h-screen centriraj">
        <span className="grid w-[90vw] lg:w-[1000px] md:-translate-y-24">
          {učitavanje && (
            <div className="centriraj text-white text-4xl">{poruka}</div>
          )}
          {!učitavanje && (
            <span>
              <div className="flex flex-col gap-4 rounded-3xl">
                {/* NASLOV */}
                <div
                  className="px-4 flex items-center gap-4 h-20 w-full hover:cursor-pointer group"
                  onClick={setPromjenaNaslova.bind(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="white"
                    class="w-10 h-10 md:w-12 md:h-12 flex align-middle justify-center group-hover:rotate-6 animacija"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                    />
                  </svg>
                  {!promjenaNaslova && (
                    <h1 className=" w-80% text-2xl md:text-4xl font-semibold text-white ">
                      {naslov}
                    </h1>
                  )}
                  {promjenaNaslova && (
                    <input
                      className="h-full text-2xl md:text-4xl text-white font-semibold focus:border-0 bg-transparent border-none outline-none"
                      placeholder="Unesi naslov"
                      autoFocus
                      value={naslov}
                      onChange={setNaslovCB.bind(Event)}
                      onKeyDown={setNaslovCB.bind(Event)}
                    ></input>
                  )}
                  <ObrisiIkona
                    cb={obrisiCB}
                    id={idBilješke}
                    klase={"ml-auto"}
                    velicina={"h-10 w-10"}
                    tekst={"hidden"}
                  />
                </div>

                <div className="relative bg-siva w-full h-[65vh] md:h-80 rounded-3xl">
                  <textarea
                    className="w-full h-full rounded-3xl px-6 md:px-8 py-4 text-xl md:text-2xl focus:border-none"
                    placeholder="Unesi sadržaj"
                    value={sadržaj}
                    onChange={setSadržajCB.bind(Event)}
                  ></textarea>
                </div>

                <span className="flex flex-row gap-4 rounded-3xl">
                  <Link
                    to="/login"
                    className="bg-siva w-[60%] sm:w-[25%] h-16 sm:h-20 rounded-3xl font-bold text-2xl centriraj"
                  >
                    Vrati se
                  </Link>
                  <button
                    className="bg-tamno-zelena w-[60%] sm:w-[20%] h-16 sm:h-20 rounded-3xl font-bold text-2xl text-siva centriraj"
                    onClick={ažurirajCB}
                  >
                    Završi
                  </button>
                </span>
              </div>
            </span>
          )}
        </span>
      </div>
    </div>
  );
};

export default Bilješka;
