// LOOK INTO ALGOLIA API FOR FUNCTIONAL SEARCHBAR
import { Search } from 'lucide-react';

const SearchBar = () => {
  return (
    <div className="relative w-full max-w-md group mt-8">
      <div className='absolute inset-y-0 left-0 ml-3 flex items-center'>
        <Search className="h-4 w-4 stroke-gray-400 group-hover:stroke-gray-500 transition-colors ease-in-out duration-300"/>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 font-light text-sm rounded-full shadow-md border border-zinc-900 bg-zinc-900 hover:border-zinc-800 focus:outline-none placeholder:text-gray-500 focus:border-zinc-800 transition duration-150 ease-in-out"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
