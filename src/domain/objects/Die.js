class Die {
  constructor(dieType = 20) {
    if (!Number.isInteger(dieType)) {
      throw new TypeError("faceCount must be an Integer!");
    }
    this.id = crypto.randomUUID();
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

module.exports = Die;
