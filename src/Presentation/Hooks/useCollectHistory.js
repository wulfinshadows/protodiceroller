import { useContext, useState } from "react";
import { DieContext } from "../Context/DieContext";
export function useCollectHistory() {
  const { dice } = useContext(DieContext);
  const [history, setHistory] = useState();

  const dieInfo = {
    rolledDice: "1d6, 1d20, 2d10",
    diceValues: [
      { dieType: "1d6", value: 4 },
      { dieType: "1d20", value: 9 },
      { dieType: "2d10", value: 12 },
    ],
    totalValue: 25,
  };

  function collectDiceValues() {
    const dieValues = dice.map((die) => {
      const dieType = die.getDieType();
      const dieValue = die.getDieValue() + 1;
      return [dieType, dieValue];
    });
    return dieValues;
  }

  function createJsonHistory() {
    let historyMap = new Map();
    dice.forEach((die) => {
      let dieType = die.getDieType();
      let dieValue = die.getDieValue();
      let mappedDieType = historyMap.get(dieType);
      if (mappedDieType === undefined) {
        historyMap.set(dieType, { quantity: 0, result: 0 });
        mappedDieType = historyMap.get(dieType);
      }
      mappedDieType.quantity++;
      mappedDieType.result += dieValue;
    });
    return Object.fromEntries(historyMap);
  }

  return createJsonHistory;
}
