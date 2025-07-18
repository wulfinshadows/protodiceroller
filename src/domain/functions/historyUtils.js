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
  //[
  // {
  //  "6": {quantity: 1, result: 5},
  //  "4": {quantity: 4, result: 4},
  // }
  // {
  //  "20": {quantity: 2, result: 25},
  //  "6": {quantity: 1, result: 6},
  //  "10": {quantity: 2, result: 15},
  //  "4": {quantity: 1, result: 4},
  // }
  //]
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
    mappedDieType.result += dieValue + 1;
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
