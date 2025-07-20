import { useContext, useState } from "react";
import Image from "next/image";
import { DieContext } from "../context/DieProvider";
import { ThemeContext } from "../context/ThemeContext";
import { useDiceRenderer } from "../hooks/useDiceRenderer";
import DieComponent from "../components/DieComponent";
import HistoryComponent from "./HistoryComponent";
import { DiceFX } from "../../assets/sound/legacy/DiceFX";
import d20 from "../../assets/d20.svg";
import themes from "../context/themes";
import Sidebar from "./Sidebar";
import RSidebar from "./RSidebar";
import Mobile from "./Mobile";
import { useCollectHistory } from "../hooks/useCollectHistory";

function Playmat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const [isRSidebarOpen, setIsRSidebarOpen] = useState(false);
  const toggleRSidebar = () => setIsRSidebarOpen((prev) => !prev);

  const { dice, handleAddDie, handleRemoveDie, isRolling } =
    useContext(DieContext);
  const { triggerDiceRolls, currentDieFaces, updateDieFaces } =
    useDiceRenderer();
  const { history, updateHistoryJson, updateHistoryState } =
    useCollectHistory();

  const { themeName, setThemeName } = useContext(ThemeContext);
  const theme = themes[themeName];

  // const dicePutFX = new Audio(DiceFX[0]);
  // dicePutFX.playbackRate = 0.75;
  // const diceRollFX = new Audio(DiceFX[1]);
  // const diceTakeFX = new Audio(DiceFX[2]);

  const handleRollClick = async () => {
    if (dice.length !== 0) {
      //diceRollFX.play();
      const rolledDice = await triggerDiceRolls();
      updateHistoryJson(rolledDice);
      updateHistoryState();
    }
  };
  const handleAddDieClick = (dieType) => {
    if (!isRolling) {
      // dicePutFX.play();
      handleAddDie(dieType);
    }
  };
  const handleRemoveDieClick = (index) => {
    if (!isRolling) {
      // diceTakeFX.play();
      handleRemoveDie(index);
      updateDieFaces();
    }
  };

  return (
    <>
      <div className="playmat-container">
        <div className="playmat-background-container">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <RSidebar isOpen={isRSidebarOpen} toggleSidebar={toggleRSidebar} history={history} />
          <div className="column-one">
            <button
              className="roll-button"
              onClick={() => {
                handleRollClick();
              }}
            >
              <Image width={40} height={40} src={d20} alt="Roll Dice" />
              ROLL
            </button>
          </div>
          <div className="xl:col-start-3 lg:col-start-2 md:col-start-2 row-start-1 xl:col-span-5 lg:col-span-7 md:col-span-7 bg-no-repeat place-items-center">
            <img
              src={"/SpiritTray.png"}
              className="xl:max-w-[100%] xl:max-h-[100%] lg:max-w-[80%] lg:max-h-auto md:max-w-[100%] md:max-h-[100%]"
              alt="Dice Tray"
            />
          </div>
          <div className="xl:col-start-3 xl:ml-0 lg:col-start-3 lg:-ml-[60px] lg:justify-content-end md:col-start-2 md:ml-10 row-start-1 items-center place-content-center place-items-center right-auto ml-0">
            <div className="grid">
              <DieComponent
                dieType={4}
                onDieClick={() => {
                  handleAddDieClick(4);
                }}
              />
              <DieComponent
                dieType={6}
                onDieClick={() => {
                  handleAddDieClick(6);
                }}
              />
              <DieComponent
                dieType={8}
                onDieClick={() => {
                  handleAddDieClick(8);
                }}
              />
              <DieComponent
                dieType={12}
                onDieClick={() => {
                  handleAddDieClick(12);
                }}
              />
              <DieComponent
                dieType={20}
                onDieClick={() => {
                  handleAddDieClick(20);
                }}
              />
              <DieComponent
                dieType={100}
                onDieClick={() => {
                  handleAddDieClick(100);
                }}
              />
            </div>
          </div>
          <div className="xl:col-start-4 lg:col-start-4 md:col-start-3 row-start-1 xl:col-span-3 lg:col-span-4 md:col-span-5 xl:pl-7 xl:pr-0 lg:px-0 lg:pr-12 md:pl-16 py-20 break-all">
            <DieComponent
              currentDieFaces={currentDieFaces}
              onDieClick={(index) => {
                handleRemoveDieClick(index);
                updateDieFaces();
              }}
            />
          </div>
      </div>

      <Mobile />
      </div>
    </>
  );
}

export default Playmat;
