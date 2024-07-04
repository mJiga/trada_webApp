import Navbar from "@/components/Layout/Navbar/Navbar"
import SearchBar from "@/components/Layout/Searchbar/Searchbar";
import Stockbar from "@/components/Layout/Stockbar/Stockbar";
import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout bg-zinc-950 min-h-screen font-Poppins text-white flex">

      <div className="fixed top-0 left-0 h-full flex flex-col z-30">
        <header className="hover:text-zinc-400 transition duration-300 ease-in-out p-8 ml-20">
          <Link to="/" className="text-2xl font-bold">TRADA</Link>
        </header>
        <Navbar className="z-40" />
      </div>

      <div className="mt-4 flex flex-grow flex-col items-center justify-center">
        <SearchBar className="z-40"/>

        <div className="flex-grow flex items-center justify-center">
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