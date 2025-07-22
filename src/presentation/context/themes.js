import defaultBG from "../../assets/SpiritTray.png";
import cursedBamboo from "../../assets/CursedBamboo.png";
import defaultBGrotated from "../../assets/SpiritTrayRotated.png";
import cursedBGrotated from "../../assets/CursedBambooRotated.png";

const themes = {
  default: {
    name: "default",
    backgroundImage: defaultBG,
    rotatedBackground: defaultBGrotated,
  },
  ocean: {
    name: "ocean",
    backgroundImage: defaultBG,
    rotatedBackground: defaultBGrotated,
  },
  sand: {
    name: "sand",
    backgroundImage: cursedBamboo,
    rotatedBackground: cursedBGrotated,
  },
};

export default themes;
