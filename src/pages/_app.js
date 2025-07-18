import { useEffect } from "react";
import { ThemeProvider } from "../presentation/context/ThemeContext";
import { DieSkinProvider } from "../presentation/context/DieSkinProvider";
import { DieProvider } from "../presentation/context/DieProvider";
import FrontPage from "./index";
import "./index.css";

export default function App() {
  useEffect(() => {
    localStorage.setItem("rollHistory", JSON.stringify([]));
  }, []);
  return (
    <>
      <ThemeProvider>
        <DieSkinProvider>
          <DieProvider>
            <FrontPage />
          </DieProvider>
        </DieSkinProvider>
      </ThemeProvider>
    </>
  );
}
