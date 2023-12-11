import { Link } from "react-router-dom";
import Pozadina from "../slike/Pozadina";
import React from "react";
const Promasaj = () => {
  return (
    <React.Fragment>
      <div className="absolute flex flex-col left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-4 items-center">
        <h1 className="font-bold text-white text-2xl">
          Neispravan link bracki, vrati se nazad
        </h1>
        <Link to="/">
          <div className="p-4 bg-tamno-zelena text-white font-bold rounded-xl hover:scale-105 hover:cursor-pointer animacija">
            Vrati se
          </div>
        </Link>
      </div>
      <Pozadina />
    </React.Fragment>
  );
};

export default Promasaj;
