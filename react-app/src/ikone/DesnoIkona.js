const DesnoIkona = ({ klase }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class={`ionicon ${klase}`}
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="M268 112l144 144-144 144M392 256H100"
      />
    </svg>
  );
};

export default DesnoIkona;
