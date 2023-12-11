import React from "react";

const Pozadina = () => {
  return (
    <React.Fragment>
      <div className="block -z-40 absolute left-0 top-0 w-full h-full bg-tamno-zelena bg-opacity-60"></div>
      <img
        src={require("../slike/Untitled-1.jpg")}
        alt="pozadina"
        className="fixed h-full w-full -z-50 bg-[length:1920px_1080px]"
      ></img>
    </React.Fragment>
  );
};

export default Pozadina;
