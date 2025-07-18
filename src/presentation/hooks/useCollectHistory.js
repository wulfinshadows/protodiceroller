import { useContext, useState } from "react";
import { DieContext } from "../../presentation/context/DieProvider";
import {
  appendHistoryJson,
  getFullHistory,
  generateHistoryMap,
} from "../../domain/functions/historyUtils";

export function useCollectHistory() {
  const { dice } = useContext(DieContext);
  const [history, setHistory] = useState([]);

  function historizeRoll() {
    return generateHistoryMap(dice);
  }

  function updateHistoryJson() {
    appendHistoryJson(historizeRoll());
  }

  function updateHistoryState() {
    const fullRollHistory = getFullHistory();
    setHistory(fullRollHistory);
  }

  return { history, historizeRoll, updateHistoryJson, updateHistoryState };
}
