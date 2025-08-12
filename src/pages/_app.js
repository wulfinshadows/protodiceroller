import { useEffect } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { DieSkinProvider } from "../context/DieSkinProvider";
import { DieProvider } from "../context/DieProvider";
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
