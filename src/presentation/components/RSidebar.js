import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import themes from "../context/themes";
import { useCollectHistory } from "../hooks/useCollectHistory";
import HistoryComponent from "./HistoryComponent";

const RSidebar = ({ isOpen, toggleSidebar, history }) => {
  const { themeName, setThemeName } = useContext(ThemeContext);
  const theme = themes[themeName];

  return (
    <div
      className={`sidebar-container fixed top-0 right-0 w-full lg:max-w-[400px] md:max-w-[300px] h-full z-50 transition-transform duration-300 ${
        isOpen ? "-translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="absolute justify-end p-4 top-1/2 -left-36 rotate-90">
        <button
          onClick={toggleSidebar}
          className="sidebar-container-button text-white text-4xl px-10 py-4 rounded-md font-[TWBOZ] hover:scale-105 transition cursor-pointer"
        >
          HISTORY
        </button>
      </div>

      <div className="p-8 text-white">
        <h2 className="text-5xl font-bold font-[TWBOZ] flex justify-end">HISTORY</h2>
          <div className="max-h-[75vh] overflow-y-auto">
            <HistoryComponent history={history} />
          </div>
      </div>
    </div>
  );
};

export default RSidebar;
