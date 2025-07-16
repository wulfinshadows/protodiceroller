import { createContext } from "react";
import DieSkin from "../../Domain/Objects/DieSkin";
import { useDieSkinHandler } from "../Hooks/useDieSkinHandler";
import "../Pages/Revamped.css";

const DieSkinContext = createContext(new DieSkin());

export default function DieSkinProvider({ children }) {
  const { dieSkin, setDieSkin, changeDieSkin, getDieAssets } =
    useDieSkinHandler();

  return (
    <DieSkinContext.Provider
      value={{ dieSkin, setDieSkin, changeDieSkin, getDieAssets }}
    >
      {children}
    </DieSkinContext.Provider>
  );
}
