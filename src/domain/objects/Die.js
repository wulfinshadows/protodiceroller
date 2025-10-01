class Die {
  constructor(dieType = 20) {
    if (!Number.isInteger(dieType)) {
      throw new TypeError("faceCount must be an Integer!");
    }
    this.id = getUUID();
    this.dieType = dieType;
    this.dieValue = 1;
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
        this.dieValue = Math.floor((Math.random() * this.dieType) % 10) + 1;
        break;
      default:
        this.dieValue = Math.floor(Math.random() * this.dieType) + 1;
        break;
    }
  }
}

function getUUID() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback using Math.random
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

module.exports = Die;
