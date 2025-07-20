import { useContext } from "react";
import { ThemeContext } from "../presentation/context/ThemeContext";
import Playmat from "../presentation/components/Playmat";
import TopBar from "../presentation/components/TopBar";

export default function FrontPage() {
  const { themeName } = useContext(ThemeContext);
  return (
    <div className={`screen-container theme-${themeName} min-h-screen w-full`}>
      <div className="page-container">
        <TopBar />
        <Playmat />
        
      </div>
    </div>
  );
}
