import { Link } from "react-router-dom";

export const StockbarItem = ({ to, acro, company, percentage, m1, m2, m3, m4, m5}) => {
  return (
    <a href={to}> 
    <div className="relative group w-60 h-28 flex flex-row hover:h-64 duration-[500ms] justify-center items-center border rounded border-zinc-800  bg-zinc-950 hover:bg-zinc-900  shadow-2xl">
      <h2 className="absolute top-2 left-5 underline underline-offset-8 decoration-2 text-xl">{acro}</h2>
      <h3 className="absolute bottom-1 left-5 text-xs text-zinc-400">{company}</h3>
      <div className="w-48 h-[115px] opacity-0 absolute overflow-hidden rounded-lg border group-hover:opacity-100 duration-[200ms] ease-[cubic-bezier(2,.01,2,1)] bottom-10">
      <table className="table-auto absolute w-48 opacity-0 group-hover:opacity-100 duration-[200ms] ease-[cubic-bezier(2,.01,2,1)]">
  <thead>
    <tr>
      <th className="text-xs text-center border w-1/2">Month</th>
      <th className="text-xs text-center border w-1/2">Change</th>
    </tr>
  </thead>
  <tbody className="text-xs text-center border">
    <tr className="text-xs text-center border">
      <td className="text-xs text-center border w-1/2">1</td>
      <td className="text-xs text-center border w-1/2">{m1}</td>
    </tr>
    <tr className="text-xs text-center border">
      <td className="text-xs text-center border w-1/2">2</td>
      <td className="text-xs text-center border w-1/2">{m2}</td>
    </tr>
    <tr className="text-xs text-center border">
      <td className="text-xs text-center border w-1/2">3</td>
      <td className="text-xs text-center border w-1/2">{m3}</td>
    </tr>
    <tr className="text-xs text-center border">
      <td className="text-xs text-center border w-1/2">4</td>
      <td className="text-xs text-center border w-1/2">{m4}</td>
    </tr>
    <tr className="text-xs text-center border">
      <td className="text-xs text-center border w-1/2">5</td>
      <td className="text-xs text-center border w-1/2">{percentage}%</td>
    </tr>
  </tbody>
</table>
</div>
      <h2 className="absolute top-12 right-2 text-xl">{percentage}%</h2>

      { percentage >= 0 ? (
        <div className="absolute w-0 h-0 top-12 left-[7.4rem]
        border-l-[15px] border-l-transparent
        border-b-[25px] border-b-green-600
        border-r-[15px] border-r-transparent">
        </div>
      ) : (
        <div className="absolute w-0 h-0 top-12 left-[7.4rem]
      border-l-[15px] border-l-transparent
      border-t-[25px] border-t-red-600
      border-r-[15px] border-r-transparent">
      </div>
      )}

      
    </div>
    </a>
  );
};

