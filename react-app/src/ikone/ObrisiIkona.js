import { Link } from "react-router-dom";

const ObrisiIkona = ({ klase, velicina, cb, id, tekst }) => {
  return (
    <Link
      className={`flex group transition duration-150 ease-out ${klase}`}
      onClick={cb.bind(Event, id)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class={`${velicina} stroke-white `}
        viewBox="0 0 512 512"
      >
        <path
          d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
        <path
          strokeLinecap="round"
          strokeMiterlimit="10"
          strokeWidth="32"
          d="M80 112h352"
        />
        <path
          d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
        />
      </svg>
      <div
        className={`${tekst} absolute translate-y-12 font-bold text-sm text-white`}
      >
        OBRISI
      </div>
    </Link>
  );
};

export default ObrisiIkona;
