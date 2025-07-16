import { useContext, useState } from "react";
import { DieContext } from "../Context/DieContext";
import { ThemeContext } from "../Context/ThemeContext";
import { useDiceRenderer } from "../Hooks/useDiceRenderer";
import DieComponent from "../Components/DieComponent";
import HistoryComponent from "./HistoryComponent";
import { DiceFX } from "../../Assets/Sound/Legacy/DiceFX";
import d20 from "../../Assets/d20.svg";
import themes from "../Context/themes";
import Sidebar from "./Sidebar";


function Playmat() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const { dice, handleAddDie, handleRemoveDie, isRolling } =
    useContext(DieContext);
  const { triggerDiceRolls, currentDieFaces, updateDieFaces } =
    useDiceRenderer();

  const { themeName, setThemeName } = useContext(ThemeContext);
  const theme = themes[themeName];

  const dicePutFX = new Audio(DiceFX[0]);
  dicePutFX.playbackRate = 0.75;
  const diceRollFX = new Audio(DiceFX[1]);
  const diceTakeFX = new Audio(DiceFX[2]);

  const handleRollClick = () => {
    if (dice.length !== 0) {
      diceRollFX.play();
      triggerDiceRolls();
    }
  };
  const handleAddDieClick = (dieType) => {
    if (!isRolling) {
      dicePutFX.play();
      handleAddDie(dieType);
    }
  };
  const handleRemoveDieClick = (index) => {
    if (!isRolling) {
      diceTakeFX.play();
      handleRemoveDie(index);
      updateDieFaces();
    }
  };

  return (
    <>
      <div className="playmat-container">
        {/* Playmat Image 
        style={{ backgroundImage: `url(${theme.backgroundImage})` }}
        */}
        <div
          className="playmat-background-container"
        >
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <div className="column-one">
            <button
              className="roll-button"
              onClick={() => {
                handleRollClick();
              }}
            >
              <img width={40} height={40} src={d20} alt="Roll Dice" />
              ROLL
            </button>
          </div>
          <div className="xl:col-start-3 lg:col-start-2 md:col-start-2 row-start-1 xl:col-span-5 lg:col-span-7 md:col-span-7 bg-no-repeat place-items-center">
            <img src={theme.backgroundImage} className="xl:max-w-[100%] xl:max-h-[100%] lg:max-w-[80%] lg:max-h-auto md:max-w-[100%] md:max-h-[100%]" alt="Dice Tray"/>
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
          <div className="flex-col inline-block items-center lg:col-start-4 md:col-start-3 row-start-1 col-span-3 break-all overflow-hidden max-h-[41rem] px-7 py-20">
            <DieComponent
              currentDieFaces={currentDieFaces}
              onDieClick={(index) => {
              handleRemoveDie(index);
              updateDieFaces();
              }}
            />
          </div>
          <div>

          </div>
          {/* <div className="column-one">
            <div className="themes-container">
              <div className="themes-title">THEMES</div>
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
            <button
              className="roll-button"
              onClick={() => {
                handleRollClick();
              }}
            >
              <img width={40} height={40} src={d20} alt="Roll Dice" />
              ROLL
            </button>
          </div>
          <div className="dice-container">
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
          <div className="column-two">
            <DieComponent
              currentDieFaces={currentDieFaces}
              onDieClick={(index) => {
                handleRemoveDieClick(index);
              }}
            />
          </div>
          <div className="col-span-1 dummy-col"></div>
          <div className="column-three">
            <div className="history-container">
              <div className="history-title">HISTORY</div>
              <HistoryComponent />
              <div className="history-details"></div>
            </div>
          </div> */}
        </div>

        {/* Responsive Code

        <div className="flex flex-row md:hidden">
          <img
            src={playmatrotated}
            alt="PlayMat Rotated"
            className="w-[400px] h-auto p-3"
          />
        </div> */}
      </div>
    </>
  );
}

export default Playmat;
