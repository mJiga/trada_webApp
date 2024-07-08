import { Link } from "react-router-dom";

export const StockbarItem = ({ to, Icon, label, iconSize, padding, isTrendingStock }) => {
  return (
    <div className="w-full">
      <Link
        to={to}
        className={`w-80 flex flex-row justify-center items-center border border-neutral-900 bg-zinc-950 hover:bg-zinc-900 shadow-2xl transition duration-300 ease-in-out ${padding}`}
      >
        <Icon className={`${isTrendingStock ? '' : iconSize  }`} />
        <span className={`${isTrendingStock ? 'text-center font-bold text-xl' : 'font-light text-sm'} ml-2`}>{label}</span>
      </Link>
    </div>
  );
};
