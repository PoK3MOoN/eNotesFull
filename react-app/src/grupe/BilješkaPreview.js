import { Link } from "react-router-dom";
import ObrisiIkona from "../ikone/ObrisiIkona.js";
import UrediIkona from "./../ikone/UrediIkona.js";
import { createContext } from "react";

export const bilješkaInformacije = createContext();

const BilješkaPreview = ({ ime, tekst, datum, callback, id }) => {
  return (
    <Link to={`/biljeska/${id}`}>
      <div className="relative group w-[38vw] sm:w-[26vw] lg:w-64 h-72 md:h-96 rounded-xl pl-4 sm:pl-6 p-6 flex flex-col gap-2 shadow-xl bg-siva  md:hover:bg-tamno-zelena hover:cursor-pointer animacija z-0 md:hover:scale-105">
        <h1 className="text-md md:text-xl font-bold underline animacija md:group-hover:text-white md:group-hover:opacity-70">
          {ime}
        </h1>
        <p className="text-sm md:text-md animacija md:group-hover:text-white group-hover:opacity-70 h-36 overflow-hidden whitespace-pre-wrap">
          {tekst}
        </p>
        <h2 className="text-sm md:text-md mt-auto font-semibold italic opacity-50 md:group-hover:text-white group-hover:opacity-50 animacija">
          {datum}
        </h2>
        <div className="absolute centrirajAps w-28 h-32 animacija flex gap-4">
          <UrediIkona
            klase={
              "hidden md:flex group opacity-0 group-hover:opacity-100 hover:scale-105 animacija "
            }
            velicina={"w-12 h-12 stroke-white animacija"}
          ></UrediIkona>
          <ObrisiIkona
            klase={
              "hidden md:flex opacity-0 group-hover:opacity-100 hover:scale-105 animacija z-10"
            }
            velicina={"w-12 h-12 stroke-white animacija"}
            cb={callback}
            id={id}
          ></ObrisiIkona>
        </div>
      </div>
    </Link>
  );
};

export default BilješkaPreview;
