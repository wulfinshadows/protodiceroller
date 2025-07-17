import FrontPage from "./index";
import { ThemeProvider } from "../presentation/context/ThemeContext";
import { DieSkinProvider } from "../presentation/context/DieSkinProvider";
import { DieProvider } from "../presentation/context/DieProvider";
import "./index.css";

export default function App() {
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
