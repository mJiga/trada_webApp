import React from 'react';
import { Link } from "react-router-dom";

export const NavbarItem = ({ to, Icon, image, label, currentPage, isSimulator, isProfile, iconSize, padding }) => {
  return (
    <Link
      to={to}
      className={`
        flex items-center w-64
        ${padding}
        ${currentPage === to
          ? 'font-bold bg-zinc-800'
          : 'font-light bg-zinc-950 hover:bg-zinc-900 hover:font-medium'}
        transition-all duration-300 ease-in-out
      `}
    >
      {Icon && <Icon className={`${iconSize} ${isProfile ? '' : 'mr-2'}`}/>}
      <span
        className={`
          text-sm truncate
          ${isSimulator ? 'bg-clip-text text-transparent bg-gradient-to-l from-white to-fuchsia-600' : ''}
          ${isProfile ? 'ml-2' : ''}
        `}
      >
        {label}
      </span>
    </Link>
  );
};