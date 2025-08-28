import { GAYUMA_MODEL_PATH } from "../GAYUMA_MODEL_PATH";
import degToRad from "../functions/degToRad";

class ThreeDDie {
  constructor(dieType = 20) {
    this.modelPath = GAYUMA_MODEL_PATH[dieType];
    switch (dieType) {
      case 4:
        this.faceRotations = {
          1: [
            degToRad(-89.11),
            degToRad(30.54),
            degToRad(-0.22),
            // [degToRad(-54.58), degToRad(1.52), degToRad(-126.31)],
            // [degToRad(-108.23), degToRad(-30.94), degToRad(108.92)],
          ],
          2: [
            degToRad(133.34),
            degToRad(-89.06),
            degToRad(-137.09),
            // [degToRad(15.05), degToRad(33.92), degToRad(108.86)],
            // [degToRad(-108.23), degToRad(-30.94), degToRad(108.92)],
          ],
          3: [[], [], []],
          4: [[], [], []],
        };
        break;
      case 6:
        this.faceRotations = {
          1: [degToRad(90), degToRad(0), degToRad(0)],
          2: [degToRad(180), degToRad(90), degToRad(180)],
          3: [degToRad(0), degToRad(0), degToRad(-90)],
          4: [degToRad(180), degToRad(0), degToRad(90)],
          5: [degToRad(0), degToRad(-90), degToRad(0)],
          6: [degToRad(-90), degToRad(0), degToRad(0)],
        };
        break;
      default: // D20
        this.faceRotations = {
          1: [degToRad(-101.04), degToRad(43.75), degToRad(18.02)],
        };
        break;
    }
  }
}

module.exports = ThreeDDie;
