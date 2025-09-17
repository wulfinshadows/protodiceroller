import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import HowTo from "./HowTo";
import Image from "next/image";

export default function TopBar() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <nav className="topbar-container">
        <div className="flex-shrink-0">
          <Image
            src="/assets/HaloHaloApp.png"
            alt="Halo Halo Logo"
            width={80}
            height={80}
            className="halo-halo-image"
          />
        </div>
        <div className="flex items-center">
          <h1 className="title-text">DICE ROLLER</h1>
        </div>
        <div className="info-box flex-shrink-0">
          <button onClick={setShowModal.bind(this, true)}>
            <Image
              src="assets/information.svg"
              className="w-6 sm:w-8 md:w-10 lg:w-12"
              alt="Information"
              width={50}
              height={50}
            />
          </button>
        </div>
      </nav>
      {showModal && <HowTo onExit={() => setShowModal(false)} />}
    </>
  );
}
