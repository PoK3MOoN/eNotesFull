import DokumenatIkona from "../ikone/DokumenatIkona";

const Grupa = ({ input }) => {
  return (
    <div
      className="relative animacija group text-white text-xl flex flex-col text-center
    w-64 rounded-xl hover:scale-105 hover:cursor-pointer bg-transparent h-16 overflow-hidden hover:overflow-visible z-50 transition shadow-xl"
    >
      {/* <div className="bg-zelena h-36 w-full scale-105 absolute bottom-0 z-20 -translate-y-12"></div> */}
      <div className="bg-tamno-zelena h-16 rounded-xl group-hover:rounded-b-none grid items-center py-4 shadow-xl  z-30 ">
        {input}
      </div>
      <span className="absolute top-2 group-hover:translate-y-14 -z-10 group-hover:z-10 animacija text-white text-md bg-[#555] w-64 flex flex-col gap-1 rounded-b-xl">
        <div className="py-3 flex ml-4 gap-12 hover:scale-105 animacija">
          <DokumenatIkona velicina={`h-8 w-8`} />
          Pjesma 1
        </div>

        <div className="py-3 flex ml-4 gap-12 hover:scale-105 animacija">
          <DokumenatIkona velicina={`h-8 w-8`} />
          Pjesma 2
        </div>
        <div className="py-3 flex ml-4 gap-12 hover:scale-105 animacija">
          <DokumenatIkona velicina={`h-8 w-8`} />
          Pjesma 3
        </div>
      </span>
    </div>
  );
};
// const Grupa = ({ input }) => {
//   return (
//     <div
//       className="relative animacija group text-white text-xl flex flex-col text-center
//     w-64 rounded-xl hover:scale-105 hover:cursor-pointer bg-transparent h-16 overflow-hidden hover:overflow-visible z-10"
//     >
//       <div className="bg-tamno-zelena h-16 rounded-xl group-hover:rounded-b-none grid items-center py-4 shadow-xl  z-20">
//         {input}
//       </div>
//       <span className="absolute top-2 group-hover:translate-y-14 -z-10 group-hover:z-10 animacija text-white text-md bg-[#555] w-64 flex flex-col gap-1 rounded-b-xl">
//         <div className="py-3 flex ml-4 gap-12">
//           <DokumenatIkona velicina={`h-8 w-8`} />
//           Pjesma 1
//         </div>

//         <div className="py-3 flex ml-4 gap-12">
//           <DokumenatIkona velicina={`h-8 w-8`} />
//           Pjesma 2
//         </div>
//         <div className="py-3 flex ml-4 gap-12">
//           <DokumenatIkona velicina={`h-8 w-8`} />
//           Pjesma 3
//         </div>
//       </span>
//     </div>
//   );
// };

export default Grupa;
