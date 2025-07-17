import d20_1 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_1.png";
import d20_2 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_2.png";
import d20_3 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_3.png";
import d20_4 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_4.png";
import d20_5 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_5.png";
import d20_6 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_6.png";
import d20_7 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_7.png";
import d20_8 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_8.png";
import d20_9 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_9.png";
import d20_10 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_10.png";
import d20_11 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_11.png";
import d20_12 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_12.png";
import d20_13 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_13.png";
import d20_14 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_14.png";
import d20_15 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_15.png";
import d20_16 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_16.png";
import d20_17 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_17.png";
import d20_18 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_18.png";
import d20_19 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_19.png";
import d20_20 from "../../assets/DieSkins/BaseSkin/D20/D20Numbers/BSkin_D20_20.png";
import d20_corner1 from "../../assets/DieSkins/BaseSkin/D20/D20RollFrames/D20Roll1.png";
import d20_corner2 from "../../assets/DieSkins/BaseSkin/D20/D20RollFrames/D20Roll2.png";
import d20_corner3 from "../../assets/DieSkins/BaseSkin/D20/D20RollFrames/D20Roll3.png";

const defaultD20Skin = [
  d20_1,
  d20_2,
  d20_3,
  d20_4,
  d20_5,
  d20_6,
  d20_7,
  d20_8,
  d20_9,
  d20_10,
  d20_11,
  d20_12,
  d20_13,
  d20_14,
  d20_15,
  d20_16,
  d20_17,
  d20_18,
  d20_19,
  d20_20,
  d20_corner1,
  d20_corner2,
  d20_corner3,
];

class DieSkin {
  constructor(
    d4Skin = [],
    d6Skin = [],
    d8Skin = [],
    d12Skin = [],
    d20Skin = [],
    d100Skin = []
  ) {
    this.d4Skin = d4Skin;
    this.d6Skin = d6Skin;
    this.d8Skin = d8Skin;
    this.d12Skin = d12Skin;
    this.d20Skin = d20Skin;
    this.d100Skin = d100Skin;
    this.defaultSkin = defaultD20Skin;
  }

  getD4Assets() {
    return [...this.d4Skin];
  }
  getD6Assets() {
    return [...this.d6Skin];
  }
  getD8Assets() {
    return [...this.d8Skin];
  }
  getD12Assets() {
    return [...this.d12Skin];
  }
  getD20Assets() {
    return [...this.d20Skin];
  }
  getD100Assets() {
    return [...this.d100Skin];
  }
  getDefaultSkin() {
    return [...this.defaultSkin];
  }
}

export default DieSkin;
