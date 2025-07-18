import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Image from "next/image";
import consoleSVG from "../../assets/console-controller.svg";
import histogram from "../../assets/histogram.svg";
import information from "../../assets/information.svg";
import styles from "./Buttons.module.css";

function Buttons({ onInfoClick }) {
  const { themeName } = useContext(ThemeContext);

  return (
    <div className={styles["button-box"]}>
      <button onClick={onInfoClick} className={`theme-${themeName}`}>
        <Image src={information} alt="Information" width={50} height={50} />
      </button>
      <button className={`theme-${themeName}`}>
        <Image src={consoleSVG} alt="console" width={50} height={50} />
      </button>
      <button className={`theme-${themeName}`}>
        <Image src={histogram} alt="histogram" width={50} height={50} />
      </button>
    </div>
  );
}

export default Buttons;
