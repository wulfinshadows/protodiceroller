import DieSkin from "../../../domain/objects/DieSkin";

import { BaseD4 } from "./D4/BaseD4";
import { BaseD6 } from "./D6/BaseD6";
import { BaseD8 } from "./D8/BaseD8";
import { BaseD12 } from "./D12/BaseD12";
import { BaseD20 } from "./D20/BaseD20";
import { BaseD100 } from "./D100/BaseD100";

class BaseSkinAssets extends DieSkin {
  constructor() {
    super(BaseD4, BaseD6, BaseD8, BaseD12, BaseD20, BaseD100);
  }
}

export default BaseSkinAssets;
