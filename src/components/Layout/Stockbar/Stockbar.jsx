import { GoogleLogo } from "@/assets/icons/GoogleLogo";
import { StockbarItem } from "./StockbarItem";

// ADD API CALL IMPLEMENTATION TO DISPLAY STOCK 
function Stockbar() {

  return (
    <div className="flex flex-wrap justify-center content-between font-Poppins w-80 h-full border border-zinc-800 pb-8">
      <h2 className="text-3xl text-center w-full py-3 border-b border-zinc-800">Trending <br></br>Stocks</h2>
      <StockbarItem
        to='/simulator'
        acro='Google'
        company='Alphabet Inc.'
        date='7/7/2024'
        percentage='+20.00%'
      />
      <StockbarItem
        to='/simulator'
        acro='Google'
        company='Alphabet Inc.'
        date='7/7/2024'
        percentage='+20.00%'
      />
      <StockbarItem
        to='/simulator'
        acro='Google'
        company='Alphabet Inc.'
        date='7/7/2024'
        percentage='+20.00%'
      />
      <StockbarItem
        to='/simulator'
        acro='Google'
        company='Alphabet Inc.'
        date='7/7/2024'
        percentage='+20.00%'
      />
    </div>
  );
}

export default Stockbar;
