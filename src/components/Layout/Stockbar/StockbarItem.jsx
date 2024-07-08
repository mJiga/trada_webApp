import { Link } from "react-router-dom";

export const StockbarItem = ({ to, acro, company, date, percentage, isTrendingStock}) => {
  return (
    <div className="relative w-60 h-28 flex flex-row justify-center items-center border rounded border-zinc-800  bg-zinc-950 hover:bg-zinc-900 shadow-2xl transition duration-300 ease-in-out">
      <h2 className="absolute top-2 left-5 underline underline-offset-8 decoration-2 text-xl">{acro}</h2>
      <h3 className="absolute bottom-1 left-5 text-xs text-zinc-400">{company}</h3>
      <h3 className="absolute bottom-5 left-5 text-xs text-zinc-400">{date}</h3>
      <h2 className="absolute top-12 right-2 text-xl">{percentage}</h2>
      <div className="absolute w-0 h-0 top-12 left-[7.4rem]
      border-l-[15px] border-l-transparent
      border-b-[25px] border-b-green-600
      border-r-[15px] border-r-transparent">
      </div>
    </div>
  );
};
