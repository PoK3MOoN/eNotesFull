import React from "react";

const Pozadina = () => {
  return (
    <React.Fragment>
      <div className="fixed h-full w-full block -z-40 left-0 top-0 bg-tamno-zelena bg-opacity-60"></div>
      <img
        src={require("../slike/Untitled-1.jpg")}
        alt="pozadina"
        className="fixed h-full w-full -z-50 bg-[length:1920px_1080px]"
      ></img>
    </React.Fragment>
  );
};

export default Pozadina;
