const StrelicaGore = ({ klase, velicina, cb, id }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={`${velicina} stroke-white `}
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="48"
        d="M112 244l144-144 144 144M256 120v292"
      />
    </svg>
  );
};

export default StrelicaGore;
