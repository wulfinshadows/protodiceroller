import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Playmat from "../components/Playmat";
import TopBar from "../components/TopBar";
import ThreeDTest from "../components/ThreeDTest";
import DiceCanvas from "../components/DiceCanvas";

export default function FrontPage() {
  const { themeName } = useContext(ThemeContext);
  return (
    <div className={`screen-container theme-${themeName} min-h-screen w-full`}>
      <div className="page-container">
        <TopBar />
        {/* <Playmat /> */}
        {/* <ThreeDTest /> */}
        <DiceCanvas />
      </div>
    </div>
  );
}
