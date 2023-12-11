import { useContext } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Pocetna from "../bilješke/Pocetna";
import Registracija from "../registracija/Registracija";
import Logovanje from "./Logovanje";
import Pozadina from "../slike/Pozadina";
import Logo from "../slike/Logo";

const Login = () => {
  return (
    <div className="bg-transparent w-screen h-screen centriraj overflow-hidden">
      <span className="grid px-16 py-12 bg-transparent">
        <Logo klase="tracking-wide mx-auto z-50 scale-[0.8] sm:scale-[0.6]" />
        <Logovanje klase="z-50" />
      </span>
    </div>
  );
};

export default Login;
