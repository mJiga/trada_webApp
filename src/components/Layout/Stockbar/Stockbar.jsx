import { GoogleLogo } from "@/assets/icons/GoogleLogo";
import { StockbarItem } from "./StockbarItem";

// ADD API CALL IMPLEMENTATION TO DISPLAY STOCK 
function Stockbar() {

  return (
    <div className="font-Poppins">
      <StockbarItem
        to='/'
        Icon={'GoogleLogo'}
        label={<span> Trending <br/> Stocks</span>}
        isTrendingStock={true}
        padding="p-6"
      />
      <StockbarItem
        to='/home'
        Icon={GoogleLogo}
        label='Google'        
        iconSize="w-8 h-8"
        padding="p-6"
      />
      <StockbarItem
        to='/simulator'
        Icon={GoogleLogo}
        label='Google'
        iconSize="w-8 h-8"
        padding="p-6"
      />
      <StockbarItem
        to='/trade'
        Icon={GoogleLogo}
        label='Google'
        iconSize="w-8 h-8"
        padding="p-6"
      />
      <StockbarItem
        to='/trade'
        Icon={GoogleLogo}
        label='Google'
        iconSize="w-8 h-8"
        padding="p-6"
      />
      <StockbarItem
        to='/trade'
        Icon={GoogleLogo}
        label='Google'
        iconSize="w-8 h-8"
        padding="p-6"
      />
      <StockbarItem
        to='/trade'
        Icon={GoogleLogo}
        label='Google'
        iconSize="w-8 h-8"
        padding="p-6"
      />
      <StockbarItem
        to='/trade'
        Icon={GoogleLogo}
        label='Google'
        iconSize="w-8 h-8"
        padding="p-6"
      />
      <StockbarItem
        to='/trade'
        Icon={GoogleLogo}
        label='Google'
        iconSize="w-8 h-8"
        padding="p-6"
      />
    </div>
  );
}

export default Stockbar;
