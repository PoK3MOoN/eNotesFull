const LozinkaIkona = ({ style, fill }) => {
  return (
    <span className="absolute w-24 h-24 bg-tamno-zelena overlay centriraj">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="white"
        class={`w-10 h-10 ${style}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
        />
      </svg>
    </span>
  );
};

export default LozinkaIkona;
