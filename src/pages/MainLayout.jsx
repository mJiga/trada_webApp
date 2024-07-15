import Navbar from "@/components/Layout/Navbar/Navbar"
import SearchBar from "@/components/Layout/Searchbar/Searchbar";
import Stockbar from "@/components/Layout/Stockbar/Stockbar";
import { useAuthContext } from "@/contexts/AuthContext";
import { GiArtificialHive } from "react-icons/gi";
import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {

  const { currentUser } = useAuthContext();

  return (
    <div className="bg-black min-h-screen font-Poppins text-white flex">

          <div className="fixed top-0 ml-10 h-full flex flex-col items-center justify-center z-30">
            <header className="flex group hover:text-zinc-400 p-8">
          <div className="transition duration-300 ease-in-out p-0 flex items-center">
            <GiArtificialHive className="w-8 h-8 mr-2 text-fuchsia-500 group-hover:text-fuchsia-700 transition duration-300 ease-in-out" />
            <Link to='/home' className="text-2xl font-bold">TRADA</Link>
          </div>
        </header>
        <Navbar className="z-40 mt-4"/>
      </div>


      <div className="flex flex-grow flex-col items-center justify-center">
        <SearchBar className="z-40"/>

        <div className="flex-grow w-full max-w-4xl px-4 overflow-y-auto">
          {children}
        </div>
      </div>

      <div className="fixed top-0 right-0 h-full flex flex-col z-30">
        <Stockbar className="z-40" />
      </div>
    </div>
  );
};

export default MainLayout;