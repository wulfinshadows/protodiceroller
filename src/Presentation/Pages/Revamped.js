import { useState, useContext } from "react";
import HowTo from "../Components/HowTo";
import Buttons from "../Components/Buttons";
import Playmat from "../Components/Playmat";
import { ThemeContext } from "../Context/ThemeContext";
import HaloHaloLogo from "../../Assets/HaloHaloApp.png"
import "./Revamped.css";

function Revamped() {
  const [showModal, setShowModal] = useState(false);
  const { themeName } = useContext(ThemeContext);

  return (
    <div className={`screen-container theme-${themeName}`}>
      <div className="page-container">
        {/* Title */}
        <div className="header-container">
          <div className="flex-auto">
            <img width={100} height={100} src={HaloHaloLogo} alt="Halo Halo Logo" className="mx-2"/>
          </div>
          <div className="title flex-auto flex-nowrap">
            <h1 className={`title-text theme-${themeName}`}>DICE ROLLER</h1>
          </div>
          <div className="button-container flex-auto">
            <Buttons onInfoClick={() => setShowModal(true)} />
          </div>
        </div>

        <Playmat />

        {showModal && <HowTo onExit={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default Revamped;
