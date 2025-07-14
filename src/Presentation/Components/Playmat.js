import { useContext } from "react";
import { DieContext } from "../Context/DieContext";
import { ThemeContext } from "../Context/ThemeContext";
import { useDiceRenderer } from "../Hooks/useDiceRenderer";
import DieComponent from "../Components/DieComponent";
import HistoryComponent from "./HistoryComponent";
import { DiceFX } from "../../Assets/Sound/Legacy/DiceFX";
import d20 from "../../Assets/d20.svg";
import themes from "../Context/themes";

function Playmat() {
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
        {/* Playmat Image */}
        <div
          className="playmat-background-container"
          style={{ backgroundImage: `url(${theme.backgroundImage})` }}
        >
          <div className="column-one">
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
          <div className="col-span-1"></div>
          <div className="column-three">
            <div className="history-container">
              <div className="history-title">HISTORY</div>
              <div className="history-details"></div>
            </div>
          </div>
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
