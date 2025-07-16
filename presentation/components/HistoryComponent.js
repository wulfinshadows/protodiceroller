import { useState } from "react";

const dieInfo = {
  rolledDice: "1d6, 1d20, 2d10",
  diceValues: [
    { dieType: "1d6", value: 4 },
    { dieType: "1d20", value: 9 },
    { dieType: "2d10", value: 12 },
  ],
  totalValue: 25,
};

const jsonObj = { rollHistory: [dieInfo, dieInfo] };

export default function HistoryComponent() {
  const [rollHistory, setRollHistory] = useState([dieInfo, dieInfo]);
  return (
    <div className="w-full text-black pl-4">
      {rollHistory.map((historyObj) => {
        let rollTypes = historyObj.rolledDice;
        let dievalues = historyObj.diceValues.map((rollInfo) => {
          let dieType = rollInfo.dieType;
          let value = rollInfo.value;
          return dieType + " = " + value;
        });
        let totalValue = historyObj.totalValue;
        return (
          <div className="h-fit p-2 mt-4 bg-white rounded-md">
            <p>{rollTypes}</p>
            {dievalues.map((rollInfo) => {
              return <p>{rollInfo}</p>;
            })}
            <p>Total: {totalValue}</p>
          </div>
        );
      })}
    </div>
  );
}
/*
[
    1D4 = 3
    2d6 = 7
    1D8 = 6
]
[
    1d10 + 1d12 = 9
]
[
    1d6, 1d20, 2d10
    
    1d6 = 4
    1d20 = 9
    2d10 = 3 + 5

    Total: 21
]

[
    5D20 = 85
]
*/
