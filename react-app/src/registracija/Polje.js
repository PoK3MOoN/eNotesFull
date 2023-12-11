const Polje = ({ klase, placeholder, vrijednost, cb, tip }) => {
  return (
    <div className={`${klase}`}>
      <input
        className="w-full h-full pl-8 text-xl sm:text-2xl placeholder:text-white text-white outline-none bg-transparent border-b-2 border-siva"
        placeholder={placeholder}
        value={vrijednost}
        onChange={cb.bind(Event)}
        type={tip}
      ></input>
    </div>
  );
};

export default Polje;
