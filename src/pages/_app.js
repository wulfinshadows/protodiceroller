import { useEffect } from "react";
import { ThemeProvider } from "../context/ThemeContext";
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
        <DieProvider>
          <FrontPage />
        </DieProvider>
      </ThemeProvider>
    </>
  );
}
