import FrontPage from ".";
import { ThemeProvider } from "../presentation/context/ThemeContext";
import "./index.css";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <FrontPage />
      </ThemeProvider>
    </>
  );
}
