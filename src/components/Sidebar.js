import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import themes from "../context/themes";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { themeName, setThemeName } = useContext(ThemeContext);
  const theme = themes[themeName];

  return (
    <div
      className={`sidebar-container fixed top-0 left-0 w-full lg:max-w-[400px] md:max-w-[300px] max-w-[250px] h-full z-50 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="absolute justify-end p-4 top-1/2 xl:-right-36 lg:-right-32 md:-right-28 -right-28 -rotate-90">
        <button
          onClick={toggleSidebar}
          className="sidebar-container-button text-white xl:text-4xl lg:text-3xl md:text-2xl text-2xl px-10 py-4 rounded-md font-[TWBOZ] hover:scale-105 transition cursor-pointer"
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
