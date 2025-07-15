import console from "../../Assets/console-controller.svg";
import histogram from "../../Assets/histogram.svg";
import information from "../../Assets/information.svg";
import { ThemeContext } from "../Context/ThemeContext";
import { useContext } from "react";
import "./Buttons.css";

function Buttons({ onInfoClick }) {
  const { themeName } = useContext(ThemeContext);
  
  return (
    <div className="button-container">
      <button onClick={onInfoClick} className={`theme-${themeName}`}>
        <img
          width={50}
          height={50}
          className=""
          src={information}
          alt="Information Icon"
        />
      </button>
      <button className={`theme-${themeName}`}>
        <img
          width={50}
          height={50}
          className=""
          src={console}
          alt="Console Icon"
        />
      </button>
      <button className={`theme-${themeName}`}>
        <img
          width={50}
          height={50}
          className=""
          src={histogram}
          alt="Histogram Icon"
        />
      </button>
    </div>
  );
}

export default Buttons;
