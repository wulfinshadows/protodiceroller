import { createContext } from "react";
import DieSkin from "../../domain/objects/DieSkin";
import { useDieSkinHandler } from "../hooks/useDieSkinHandler";

export const DieSkinContext = createContext(new DieSkin());

export function DieSkinProvider({ children }) {
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
