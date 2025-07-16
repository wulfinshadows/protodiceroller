import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import themes from "../context/themes";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { themeName, setThemeName } = useContext(ThemeContext);
  const theme = themes[themeName];

  return (
    <div
      className={`sidebar-container fixed top-0 left-0 w-full max-w-[400px] h-full bg-[#c23838] z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="absolute justify-end p-4 top-96 -right-36 -rotate-90">
        <button
          onClick={toggleSidebar}
          className="sidebar-container-button bg-[#c23838] text-white text-4xl px-10 py-4 rounded-md font-[TWBOZ] hover:scale-105 transition"
        >
          THEMES
        </button>
      </div>

      <div className="p-8 text-white">
        <h2 className="text-5xl font-bold font-[TWBOZ]">THEMES</h2>
        <div className="themes-container">
          <div className="themes-select">
            <button
              className="bg-red-200 theme-button"
              onClick={() => setThemeName("default")}
            >
              DUNGEON
            </button>
            <button
              className="bg-blue-200 theme-button"
              onClick={() => setThemeName("ocean")}
            >
              OCEAN
            </button>
            <button
              className="bg-yellow-200 theme-button"
              onClick={() => setThemeName("sand")}
            >
              SAND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
