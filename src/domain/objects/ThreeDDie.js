import { GAYUMA_MODEL_PATH } from "../GAYUMA_MODEL_PATH";
import degToRad from "../functions/degToRad";

class ThreeDDie {
  constructor(dieType = 20) {
    this.modelPath = GAYUMA_MODEL_PATH[dieType];
    switch (dieType) {
      case 4:
        this.faceRotations = {
          1: [
            [degToRad(-90), degToRad(30), degToRad(0)],
            [degToRad(-45), degToRad(0), degToRad(-120)],
            [degToRad(-95), degToRad(-30), degToRad(110)],
          ],
          2: [
            [degToRad(3), degToRad(-85), degToRad(94)], //degToRad(10), degToRad(-80), degToRad(110)
            [degToRad(10), degToRad(35), degToRad(110)],
            [degToRad(-170), degToRad(30), degToRad(-70)],
          ],
          3: [
            [degToRad(80), degToRad(30), degToRad(180)],
            [degToRad(70), degToRad(-30), degToRad(-80)],
            [degToRad(130), degToRad(0), degToRad(55)],
          ],
          4: [
            [degToRad(20), degToRad(-30), degToRad(0)],
            [degToRad(180), degToRad(85), degToRad(-160)],
            [degToRad(-165), degToRad(-30), degToRad(-180)],
          ],
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
      case 8:
        this.faceRotations = {
          1: [degToRad(20), degToRad(-45), degToRad(0)],
          2: [degToRad(-160), degToRad(-45), degToRad(0)],
          3: [degToRad(-160), degToRad(45), degToRad(0)],
          4: [degToRad(20), degToRad(45), degToRad(0)],
          5: [degToRad(-160), degToRad(45), degToRad(-180)], //
          6: [degToRad(20), degToRad(45), degToRad(-180)],
          7: [degToRad(20), degToRad(-45), degToRad(-180)],
          8: [degToRad(-160), degToRad(-45), degToRad(-180)],
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
