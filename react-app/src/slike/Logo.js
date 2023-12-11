const Logo = ({ klase }) => {
  return (
    <img
      src={require("../slike/logo.png")}
      alt="pozadina"
      className={`${klase}`}
    ></img>
  );
};

export default Logo;
