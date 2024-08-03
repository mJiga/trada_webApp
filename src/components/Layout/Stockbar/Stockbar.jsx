
import { StockbarItem } from "./StockbarItem";

// ADD API CALL IMPLEMENTATION TO DISPLAY STOCK 
function Stockbar() {

  return (
    <div className="flex flex-wrap justify-center content-between font-Poppins w-80 h-full border border-zinc-800 pb-8">
      <h2 className="text-3xl text-center w-full py-3 border-b border-zinc-800">Popular <br></br>Predictions</h2>
      <StockbarItem
        to='https://tailwindcss.com/docs/transition-timing-function'
        acro='Google'
        company='Alphabet Inc.'
        percentage={parseFloat((Math.random() *-20 +10).toFixed(2))}
        m1 = '2.02%'
        m2 = '-2.02%'
        m3 = '2.02%'
        m4 = '-2.02%'
      />
      <StockbarItem
        to='https://www.youtube.com/watch?v=CgkZ7MvWUAA'
        acro='Google'
        company='Alphabet Inc.'
        percentage={parseFloat((Math.random() *-20 +10).toFixed(2))}
        m1 = '2.02%'
        m2 = '-2.02%'
        m3 = '2.02%'
        m4 = '-2.02%'
      />
      <StockbarItem
        to='https://claude.ai/chat/b5c592bc-54f4-4754-ba27-8dc2c1bf3a27'
        acro='Google'
        company='Alphabet Inc.'
        percentage={parseFloat((Math.random() *-20 +10).toFixed(2))}
        m1 = '2.02%'
        m2 = '-2.02%'
        m3 = '2.02%'
        m4 = '-2.02%'
      />
      <StockbarItem
        to='https://chatgpt.com/'
        acro='Google'
        company='Alphabet Inc.'
        percentage={parseFloat((Math.random() *-20 +10).toFixed(2))}
        m1 = '2.02%'
        m2 = '-2.02%'
        m3 = '2.02%'
        m4 = '-2.02%'
      />
    </div>
  );
}

export default Stockbar;
