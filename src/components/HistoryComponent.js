import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import themes from "../context/themes";

export default function HistoryComponent({ history }) {
  
  if (!history || !Array.isArray(history)) {
    return <div className="w-full text-[#0e102c] pl-4">No history yet</div>;
  }

  return (
    <div className="w-full text-black pl-4">
      {history.map(({ rolls, total }, index) => (
        <div key={index} className="history-details-container h-fit p-4 mt-4 rounded-md shadow">
          <div className="space-y-1">
            {rolls.map((line, i) => (
              <p key={i} className="text-sm">
                {line}
              </p>
            ))}
          </div>
          <p className="mt-2 font-semibold">Total: {total}</p>
        </div>
      ))}
    </div>
  );
}
