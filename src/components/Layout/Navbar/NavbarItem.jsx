import { Link } from "react-router-dom";

export const NavbarItem = ({ to, Icon, label, currentPage, isSimulator, isProfile, iconSize, padding }) => {

  return (
    <div>
      <Link
        to={to}
        className={`top-0 left-0 justify-center border border-zinc-800 max-w-80 flex ${isProfile ? 'flex-col' : 'flex-row'} items-center shadow-2xl ${padding} ${currentPage === to ? 'bg-fuchsia-600 hover:bg-fuchsia-700 transition duration-300 ease-in-out' : 'bg-zinc-950 hover:bg-zinc-900 transition duration-300 ease-in-out'}`}
      >
        <Icon className={`${iconSize} ${isProfile ? 'mb-2' : 'mr-1'}`} />
        <span className={`text-s ${isProfile ? 'font-light' : 'font-bold'} ${isSimulator && 'bg-clip-text text-transparent bg-gradient-to-l from-white to-fuchsia-600'}`}>{label}</span>
      </Link>
    </div>
  );
};
