import { CircleAccount } from "@/assets/icons/CircleAccount";
import { HomeIcon } from "@/assets/icons/HomeIcon";
import { SimulatorIcon } from "@/assets/icons/SimulatorIcon";
import { TradeIcon } from "@/assets/icons/TradeIcon";
import { useAuthContext } from "@/contexts/AuthContext";
import { NavbarItem } from './NavbarItem';
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GiArtificialHive } from "react-icons/gi";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Link } from "react-router-dom";

function Navbar() {
  const { currentUser, userProfile, userSignOut } = useAuthContext();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('/home');

  const handleSignOut = async () => {
    try {
      await userSignOut();
    } catch (err) {
      console.error('Error during sign out:', err.message);
      throw err;
    }
  }

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <nav className="border border-neutral-900 rounded-t-2xl shadow-sm flex flex-col h-screen">
   
   <NavbarItem
        to='/home'
        Icon={HomeIcon}
        label='Home'
        currentPage={currentPage}
        iconSize="w-5 h-5"
        padding="p-3 rounded-t-2xl"
      />
      <NavbarItem
        to='/simulator'
        Icon={GiArtificialHive}
        label='Simulator'
        currentPage={currentPage}
        isSimulator={true}
        iconSize="w-5 h-5"
        padding="p-3"
      />
      <NavbarItem
        to='/trade'
        Icon={TradeIcon}
        label='Trade'
        currentPage={currentPage}
        iconSize="w-5 h-5"
        padding="p-3"
      />
      <div className="flex-grow" />

      <div className="flex items-center justify-center m-2">
        <HoverBorderGradient
          containerClassName="rounded-full"
          as= {Link}
          onClick={handleSignOut}
          to='/'
          className="flex items-center space-x-1 px-4 py-1 rounded-full text-lg"
          duration={0.3}
        >
          <span className="text-sm">Sign out</span>
        </HoverBorderGradient>
      </div>

      <NavbarItem
        to='/profile'
        label={currentUser ? (
          <div className="flex ml-3 font-light text-xs text-gray-500">
             {userProfile?.pfp ? (
              <img src={userProfile.pfp} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <CircleAccount className="w-10 h-10" />
            )}
            <div className="flex flex-col ml-4">
              <span className="font-medium text-white">{userProfile?.name || 'guest'}</span>
              <span>{userProfile?.username || 'guest_username'}</span>
            </div>
          </div>
        ) : (
          "Profile"
        )}
        currentPage={currentPage}
        isProfile={true}
        iconSize="w-10 h-10"
        padding="p-6"
      />
    </nav>
  );
}

export default Navbar;
