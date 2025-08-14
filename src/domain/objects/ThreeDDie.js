import { GAYUMA_MODEL_PATH } from "../GAYUMA_MODEL_PATH";
import degToRad from "../functions/degToRad";

class ThreeDDie {
  constructor(dieType = 20) {
    this.modelPath = GAYUMA_MODEL_PATH[dieType];
    switch (dieType) {
      case 4:
        this.faceRotations = {
          1: [
            [degToRad(-89.11), degToRad(30.54), degToRad(-0.22)],
            [degToRad(-54.58), degToRad(1.52), degToRad(-126.31)],
            [degToRad(-108.23), degToRad(-30.94), degToRad(108.92)],
          ],
          2: [
            [degToRad(133.34), degToRad(-89.06), degToRad(-137.09)],
            [degToRad(15.05), degToRad(33.92), degToRad(108.86)],
            [degToRad(-108.23), degToRad(-30.94), degToRad(108.92)],
          ],
          3: [[], [], []],
          4: [[], [], []],
        };
        break;
      case 6:
        this.faceRotations = { 1: [[], [], []] };
      default: // D20
        this.faceRotations = {
          1: [degToRad(-101.04), degToRad(43.75), degToRad(18.02)],
        };
    }
  }
}
