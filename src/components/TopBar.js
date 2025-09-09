import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import HowTo from "./HowTo";
import Image from "next/image";
import Buttons from "./Buttons";

export default function TopBar() {
  const [showModal, setShowModal] = useState(false);
  const { themeName } = useContext(ThemeContext);
  return (
    <>
      <nav className="header-container">
        <div className="flex-shrink-0">
          <Image
            src={"/HaloHaloApp.png"}
            alt="Halo Halo Logo"
            width={80}
            height={80}
            className="halo-halo-image"
          />
        </div>
        <div className="flex items-center">
          <h1
            className={`theme-${themeName} title-text`}
          >
            DICE ROLLER
          </h1>
        </div>
        <div className="flex-shrink-0">
          <Buttons onInfoClick={() => setShowModal(true)} />
        </div>
      </nav>
      {showModal && <HowTo onExit={() => setShowModal(false)} />}
    </>
  );
}
