class Die {
  constructor(dieType = 20) {
    if (!Number.isInteger(dieType)) {
      throw new TypeError("faceCount must be an Integer!");
    }
    this.dieType = dieType;
    this.dieValue = 0;
  }

  getDieType() {
    return this.dieType;
  }
  getDieValue() {
    return this.dieValue;
  }

  roll() {
    switch (this.dieType) {
      case 100:
        this.dieValue = Math.floor((Math.random() * this.dieType) % 10);
        break;
      default:
        this.dieValue = Math.floor(Math.random() * this.dieType);
        break;
    }
  }
}

const { describe, expect, test } = require("@jest/globals");

describe("Creating Dice History", () => {
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
