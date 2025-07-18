function createHistoryJson() {
  localStorage.setItem("rollHistory", JSON.stringify([]));
}

function checkHistoryJson() {
  return localStorage.getItem("rollHistory") !== null;
}

function appendHistoryJson(rollHistory) {
  if (!checkHistoryJson()) {
    createHistoryJson();
  }
  const fullRollHistory = JSON.parse(localStorage.getItem("rollHistory"));
  fullRollHistory.push(rollHistory);
  localStorage.setItem("rollHistory", JSON.stringify(fullRollHistory));
}

function getFullHistory() {
  if (!checkHistoryJson()) {
    createHistoryJson();
  }
  return JSON.parse(localStorage.getItem("rollHistory"));
}

function generateHistoryMap(dice) {
  // rollHistoryObj = {dieType, {quantitiy, result}}
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

module.exports = {
  createHistoryJson,
  checkHistoryJson,
  appendHistoryJson,
  getFullHistory,
  generateHistoryMap,
};
