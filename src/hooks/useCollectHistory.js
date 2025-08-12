import { useState } from "react";
import {
  appendHistoryJson,
  getFullHistory,
  generateHistoryMap,
} from "../domain/functions/historyUtils";

export function useCollectHistory() {
  const [history, setHistory] = useState([]);

  function updateHistoryJson(currentDice) {
    console.log("Added history to JSON");
    const newRollHistory = generateHistoryMap(currentDice);
    appendHistoryJson(newRollHistory);
  }

  function updateHistoryState() {
    const collectedHistory = getFullHistory();
    const fullHistory = collectedHistory.map((rollEntry) => {
      let localSum = 0;
      const sortedEntries = Object.entries(rollEntry).sort(
        ([a], [b]) => parseInt(a) - parseInt(b)
      );
      const rollStrings = sortedEntries.map(([dieType, value]) => {
        localSum += value.result;
        return `${value.quantity}D${dieType} = ${value.result}`;
      });
      return { rolls: rollStrings, total: localSum };
    });
    setHistory(fullHistory);
    console.log("Retrieved from JSON");
  }

  return { history, updateHistoryJson, updateHistoryState };
}
