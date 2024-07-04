// LOOK INTO ALGOLIA API FOR FUNCTIONAL SEARCHBAR

const SearchBar = () => {
  return (
    <div className="flex items-center justify-center p-2">
      <div>
        <input
          type="text"
          className="font-Poppins font-light w-80 p-4 border-2 rounded-3xl shadow-xl border-zinc-950 bg-zinc-800 hover:border-zinc-800 focus:outline-none focus:border-fuchsia-800 focus:bg-zinc-900 transition duration-300 ease-in-out"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
