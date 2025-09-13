import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Image from "next/image";
import styles from "./Buttons.module.css";

function Buttons({ onInfoClick }) {
  const { themeName } = useContext(ThemeContext);

  return (
    <div className={styles["button-box"]}>
      <button
        onClick={onInfoClick}
        className={`cursor-pointer theme-${themeName}`}
      >
        <Image
          src="assets/information.svg"
          className="w-6 sm:w-8 md:w-10 lg:w-12"
          alt="Information"
          width={50}
          height={50}
        />
      </button>
    </div>
  );
}

export default Buttons;
