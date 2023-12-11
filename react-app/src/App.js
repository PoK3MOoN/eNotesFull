import Bilješke from "./bilješke/Bilješke";
import Registracija from "./registracija/Registracija";
import Logovanje from "./login/Login";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Link,
  Route,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import CookiesProvider from "react-cookie/cjs/CookiesProvider";
import { createContext, useState } from "react";
import Bilješka from "./bilješke/Bilješka";
import Promasaj from "./bilješke/Promasaj";
import DodajBilješku from "./bilješke/DodajBilješku";
import Logo from "./slike/Logo";
import UrediIkona from "./ikone/UrediIkona";
import OdjavaIkona from "./ikone/OdjavaIkona";
import UrediKorisnika from "./login/UrediKorisnika";
import PromjenaŠifre from "./login/PromjenaŠifre";
import Pozadina from "./slike/Pozadina";

export const KontContext = createContext();

function App() {
  const [ulogovan, setUlogovan] = useState(false);

  const [ulogovanoIme, setUlogovanoIme] = useState("");
  const [malaSlika, setMalaSlika] = useState("");

  let obrisiCB = () => {};

  const ruter = createBrowserRouter(
    createRoutesFromElements(
      <Route className="overflow-hidden">
        <Route
          path="/"
          element={
            <CookiesProvider>
              <Bilješke />
            </CookiesProvider>
          }
        />

        <Route path="/login" element={<Logovanje />} />
        <Route path="/registracija" element={<Registracija />} />
        <Route path="/uredjivanje-korisnika" element={<UrediKorisnika />} />
        <Route
          path="/uredjivanje-korisnika/promjena-sifre"
          element={<PromjenaŠifre />}
        />
        <Route path="/biljeska/:id" element={<Bilješka />} />
        <Route path="/dodaj-bilješku" element={<DodajBilješku />} />
        <Route path="*" element={<Promasaj />} />
      </Route>
    )
  );
  return (
    <KontContext.Provider
      value={{
        setUlogovan,
        ulogovan,
        ulogovanoIme,
        setUlogovanoIme,
        malaSlika,
        setMalaSlika,
        obrisiCB,
      }}
    >
      <Pozadina />
      <RouterProvider router={ruter} />
    </KontContext.Provider>
  );
}

export default App;
