const Die = require("../domain/objects/Die");
const {
  createHistoryJson,
  checkHistoryJson,
  appendHistoryJson,
  getFullHistory,
  generateHistoryMap,
} = require("../domain/functions/historyUtils");

describe("Creating non-Modular Dice History", () => {
  test("Print 3 Dice", () => {
    const dice = [new Die(6), new Die(6), new Die(6)];

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
      return historyMap;
    }

    const result = createJsonHistory();
    expect(result.keys()).toContain(6);
    expect(result.get(6).quantity).toEqual(3);
  });
});

describe("Testing historyUtil functions", () => {
  beforeAll(() => {
    localStorage.clear();
  });

  test("checks if rollHistory doesn't exists, then creates a new one and checks if it exists now", () => {
    expect(checkHistoryJson()).toBe(false);

    createHistoryJson();
    const parsedHistory = JSON.parse(localStorage.getItem("rollHistory"));

    expect(parsedHistory).toEqual([]);
    expect(checkHistoryJson()).toBe(true);
  });

  test("Generate a map object from an array of objects", () => {
    const testDice = [new Die(6), new Die(4), new Die(20)];
    const genObj = generateHistoryMap(testDice);

    expect(typeof genObj).toBe("object");
    expect(genObj).not.toBeNull();
    expect(Array.isArray(genObj)).toBe(false);

    expect(Object.keys(genObj)).toEqual(
      expect.arrayContaining(["6", "4", "20"])
    );

    Object.values(genObj).forEach((value) => {
      expect(value).toHaveProperty("quantity");
      expect(value).toHaveProperty("result");

      expect(typeof value.quantity).toBe("number");
      expect(typeof value.result).toBe("number");
    });
  });

  test("check if die can be rolled", () => {
    const spy = jest.spyOn(Die.prototype, "roll");
    const testDice = [new Die(6), new Die(4), new Die(20)];
    testDice.forEach((die) => {
      die.roll();
    });
    expect(spy).toHaveBeenCalledTimes(3);
    spy.mockRestore();
  });

  test("Is quantity updated when multiple 6's are present", () => {
    const testDice = [new Die(6), new Die(6), new Die(6)];
    const genObj = generateHistoryMap(testDice);

    expect(genObj["6"].quantity).toEqual(3);
  });

  test("check if sum is equal from Die Objects to History Obj", () => {
    const testDice = [
      new Die(6),
      new Die(6),
      new Die(6),
      new Die(20),
      new Die(20),
    ];
    let rolledSumD6 = 0;
    let rolledSumD20 = 0;
    testDice.forEach((die) => {
      die.roll();
      switch (die.getDieType()) {
        case 6:
          rolledSumD6 += die.getDieValue();
          break;
        case 20:
          rolledSumD20 += die.getDieValue();
          break;
        default:
          break;
      }
    });

    const genObj = generateHistoryMap(testDice);

    expect(genObj["6"].result).toEqual(rolledSumD6);
    expect(genObj["20"].result).toEqual(rolledSumD20);
  });
  test("Will the write function work?", () => {
    expect(checkHistoryJson()).toBe(true);
    const testDice = [new Die(6), new Die(4), new Die(20)];
    testDice.forEach((die) => {
      die.roll();
    });
    const genObj = generateHistoryMap(testDice);
    appendHistoryJson(genObj);
    const history = JSON.parse(localStorage.getItem("rollHistory"));
    const latestEntry = history[history.length - 1];
    expect(latestEntry["6"]).toEqual(
      expect.objectContaining({
        quantity: expect.any(Number),
        result: expect.any(Number),
      })
    );
    expect(latestEntry["4"]).toEqual(
      expect.objectContaining({
        quantity: expect.any(Number),
        result: expect.any(Number),
      })
    );
  });
  test("Read function test", () => {
    const fullRollHistory = getFullHistory();
    fullRollHistory.forEach((history) => {
      expect(Object.keys(history).sort()).toEqual(["20", "4", "6"].sort());
    });
  });
});
