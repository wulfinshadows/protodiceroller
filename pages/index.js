import { useState, useContext } from "react";
import { ThemeContext } from "../presentation/context/ThemeContext";
import HaloHaloLogo from "../assets/HaloHaloApp.png";
import Image from "next/image";
import Buttons from "../presentation/components/Buttons";
import HowTo from "../presentation/components/HowTo";

export default function FrontPage() {
  const [showModal, setShowModal] = useState(false);
  const { themeName } = useContext(ThemeContext);

  return (
    <div className={`screen-container theme-${themeName}`}>
      <div className="page-container">
        {/* Title */}
        <div className="header-container">
          <div className="flex-auto">
            <Image
              src={HaloHaloLogo}
              alt="Halo Halo Logo"
              width={100}
              height={100}
              className="mx-2"
            />
          </div>
          <div className="title flex-auto flex-nowrap">
            <h1 className={`title-text theme-${themeName}`}>DICE ROLLER</h1>
          </div>
          <div className="button-container flex-auto">
            <Buttons onInfoClick={() => setShowModal(true)} />
          </div>
        </div>

        {/* <Playmat /> */}

        {showModal && <HowTo onExit={() => setShowModal(false)} />}
      </div>
    </div>
  );
}
