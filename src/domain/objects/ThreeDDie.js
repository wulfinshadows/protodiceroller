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
          5: [degToRad(-160), degToRad(45), degToRad(-180)],
          6: [degToRad(20), degToRad(45), degToRad(-180)],
          7: [degToRad(20), degToRad(-45), degToRad(-180)],
          8: [degToRad(-160), degToRad(-45), degToRad(-180)],
        };
        break;
      case 10:
        this.faceRotations = {
          1: [degToRad(-160), degToRad(-35), degToRad(0)],
          2: [degToRad(20), degToRad(35), degToRad(0)],
          3: [degToRad(20), degToRad(70), degToRad(-180)],
          4: [degToRad(-160), degToRad(0), degToRad(-180)],
          5: [degToRad(20), degToRad(0), degToRad(180)],
          6: [degToRad(-160), degToRad(70), degToRad(-180)],
          7: [degToRad(-160), degToRad(35), degToRad(0)],
          8: [degToRad(20), degToRad(-35), degToRad(0)],
          9: [degToRad(20), degToRad(-70), degToRad(-180)],
          10: [degToRad(-160), degToRad(-70), degToRad(-180)],
        };
        break;
      case 12:
        this.faceRotations = {
          1: [degToRad(120), degToRad(0), degToRad(-180)],
          2: [degToRad(-170), degToRad(-30), degToRad(20)],
          3: [degToRad(-170), degToRad(30), degToRad(-20)],
          4: [degToRad(90), degToRad(55), degToRad(-120)],
          5: [degToRad(85), degToRad(-55), degToRad(120)],
          6: [degToRad(-60), degToRad(0), degToRad(0)],
          7: [degToRad(120), degToRad(0), degToRad(0)],
          8: [degToRad(-90), degToRad(-55), degToRad(120)],
          9: [degToRad(-90), degToRad(55), degToRad(-120)],
          10: [degToRad(5), degToRad(30), degToRad(-20)],
          11: [degToRad(5), degToRad(-30), degToRad(20)],
          12: [degToRad(-60), degToRad(0), degToRad(180)],
        };
        break;
      case 20:
        this.faceRotations = {
          1: [degToRad(-90), degToRad(43), degToRad(20)],
          2: [degToRad(130), degToRad(-15), degToRad(15)],
          3: [degToRad(-20), degToRad(-20), degToRad(90)],
          4: [degToRad(-105), degToRad(22), degToRad(-90)],
          5: [degToRad(170), degToRad(3), degToRad(159)],
          6: [degToRad(-30), degToRad(23), degToRad(-130)],
          7: [degToRad(160), degToRad(75), degToRad(173)],
          8: [degToRad(-35), degToRad(-44), degToRad(-160)],
          9: [degToRad(-50), degToRad(10), degToRad(-55)],
          10: [degToRad(77), degToRad(-48), degToRad(-68)],
          11: [degToRad(-95), degToRad(-48), degToRad(-68)],
          12: [degToRad(-147), degToRad(-55), degToRad(72)],
          13: [degToRad(150), degToRad(-44), degToRad(-158)],
          14: [degToRad(-16), degToRad(75), degToRad(170)],
          15: [degToRad(156), degToRad(22), degToRad(-130)],
          16: [degToRad(-8), degToRad(2), degToRad(158)],
          17: [degToRad(-58), degToRad(35), degToRad(65)],
          18: [degToRad(178), degToRad(32), degToRad(-23)],
          19: [degToRad(-50), degToRad(-16), degToRad(12)],
          20: [degToRad(85), degToRad(45), degToRad(20)],
        };
        break;
      case 100:
        this.faceRotations = {
          1: [degToRad(20), degToRad(-70), degToRad(-180)],
          2: [degToRad(20), degToRad(-35), degToRad(0)],
          3: [degToRad(20), degToRad(70), degToRad(-180)],
          4: [degToRad(-160), degToRad(0), degToRad(-180)],
          5: [degToRad(20), degToRad(0), degToRad(180)],
          6: [degToRad(-160), degToRad(70), degToRad(-180)],
          7: [degToRad(-160), degToRad(-35), degToRad(0)],
          8: [degToRad(-160), degToRad(-70), degToRad(-180)],
          9: [degToRad(-160), degToRad(35), degToRad(0)],
          10: [degToRad(20), degToRad(35), degToRad(0)],
        };
        break;
      default: // D20
        this.faceRotations = {
          1: [degToRad(-100), degToRad(43.75), degToRad(18.02)],
        };
        break;
    }
  }
}

module.exports = ThreeDDie;
