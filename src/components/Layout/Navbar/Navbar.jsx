import { CircleAccount } from "@/assets/icons/CircleAccount";
import { HomeIcon } from "@/assets/icons/HomeIcon";
import { SimulatorIcon } from "@/assets/icons/SimulatorIcon";
import { TradeIcon } from "@/assets/icons/TradeIcon";
import { useAuthContext } from "@/contexts/AuthContext";
import { NavbarItem } from './NavbarItem';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { currentUser } = useAuthContext();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('/home');

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <div className="font-Poppins">
      <NavbarItem
        to='/profile'
        Icon={CircleAccount}
        label={currentUser.email || 'Guest'}
        currentPage = {currentPage}
        isProfile={true}
        iconSize="w-20 h-20"
        padding="p-20"
      />
      <NavbarItem
        to='/home'
        Icon={HomeIcon}
        label='Home'        
        currentPage = {currentPage}
        iconSize="w-8 h-8"
        padding="p-4"
      />
      <NavbarItem
        to='/simulator'
        Icon={SimulatorIcon}
        label='Simulator'
        currentPage = {currentPage}
        isSimulator={true}
        iconSize="w-8 h-8"
        padding="p-4"
      />
      <NavbarItem
        to='/trade'
        Icon={TradeIcon}
        label='Trade'
        currentPage = {currentPage}
        iconSize="w-8 h-8"
        padding="p-4"
      />
    </div>
  );
}

export default Navbar;
