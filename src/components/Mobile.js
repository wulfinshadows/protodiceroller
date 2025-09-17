import { useState, useContext, useRef, useEffect } from "react";
import { DieContext } from "../context/DieProvider";
import { ThemeContext } from "../context/ThemeContext";
import { useCollectHistory } from "../hooks/useCollectHistory";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import Image from "next/image";
import DieModel from "./DieModel";
import degToRad from "../domain/functions/degToRad";
import themes from "../context/themes";
import useBreakpoint from "./useBreakpoint";
import RSidebar from "./RSidebar";

function getGridPosition(index, cols = 4, spacing = 3) {
  const row = Math.floor(index / cols);
  const col = index % cols;
  const x = col * spacing;
  const y = -row * spacing;
  return [x, y, 0];
}

export default function Mobile() {
  const [isRSidebarOpen, setIsRSidebarOpen] = useState(false);
  const toggleRSidebar = () => setIsRSidebarOpen((prev) => !prev);

  const { themeName, setThemeName } = useContext(ThemeContext);
  const theme = themes[themeName];

  const {
    dice,
    handleAddDie,
    handleRemoveDie,
    handleRollDice,
    handleResetDice,
  } = useContext(DieContext);

  const diceRefs = useRef({});

  const cameraRef = useRef();
  const breakpoint = useBreakpoint();
  const target = [0, -15, 0];

  const { history, updateHistoryJson, updateHistoryState } =
    useCollectHistory();

  // 3D Camera Pos/Zoom Values

  let cols = 6;
  let cameraPosition = [0, -15, 20];
  let cameraZoom = 20;
  let cameraRotation = [0, 0, Math.PI / 2];
  let trayCameraZoom = 0;

  if (breakpoint === "base") {
    cameraPosition = -10;
    cameraZoom = 10;
    cameraRotation = [0, 0, Math.PI / -2];
    trayCameraZoom = 16;
    cols = 5;
  } else if (breakpoint === "md") {
    cameraPosition = -30;
    cameraZoom = 10.5;
    trayCameraZoom = 17;
    cols = 5;
  } else if (breakpoint === "lg") {
    cameraPosition = -20.5;
    cameraZoom = 14;
    trayCameraZoom = 10;
  }

  // Dice Functions

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(...target);
    }
  }, []);

  useEffect(() => {
    console.log("dice updated:", dice);
  }, [dice]);

  const handleAddDieClick = (dieType, e) => {
    e.stopPropagation();
    handleAddDie(dieType);
    console.log(dice);
  };

  const handleRemoveDieClick = (index, e) => {
    e.stopPropagation();
    handleRemoveDie(index);
    console.log(dice);
  };

  const handleRollDiceClick = async () => {
    const updatedDice = await handleRollDice();
    updatedDice.forEach((die) => {
      const ref = diceRefs.current[die.id];
      if (ref && ref.roll) {
        ref.roll(die.getDieValue());
      }
    });
    console.log("🎲 Rolled dice:", updatedDice);

    updateHistoryJson(updatedDice);
    updateHistoryState();
  };

  return (
    <>
      <div className="canvas-container">
        <RSidebar
          isOpen={isRSidebarOpen}
          toggleSidebar={toggleRSidebar}
          history={history}
        />
        <div className="dice-tray">
          <Image
            src="/assets/SpiritTrayRotated.png"
            alt="Dice Tray"
            width={1080}
            height={1454}
            className="tray-image"
          />
          <div className="dice-select">
            <Canvas>
              <ambientLight />
              <OrthographicCamera
                makeDefault
                ref={cameraRef}
                position={[-1, -14, 20]}
                zoom={8}
                rotation={cameraRotation}
              />
              <DieModel
                isStatic={true}
                dieType={4}
                scale={250}
                position={[0, 0, 0]}
                onClick={(e) => {
                  handleAddDieClick(4, e);
                }}
                onPointerOver={(e) => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  document.body.style.cursor = "default";
                }}
              />
              <DieModel
                isStatic={true}
                dieType={6}
                dieValue={1}
                scale={250}
                position={[0, -5, 0]}
                rotation={[0, Math.PI / 2, 0]}
                onClick={(e) => {
                  handleAddDieClick(6, e);
                }}
                onPointerOver={(e) => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  document.body.style.cursor = "default";
                }}
              />
              <DieModel
                isStatic={true}
                dieType={8}
                scale={250}
                position={[0, -10, 0]}
                rotation={[degToRad(21.33), degToRad(-44.98), degToRad(0)]}
                onClick={(e) => {
                  handleAddDieClick(8, e);
                }}
                onPointerOver={(e) => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  document.body.style.cursor = "default";
                }}
              />
              <DieModel
                dieType={10}
                isStatic={true}
                scale={250}
                position={[0, -15, 0]}
                rotation={[degToRad(-153.7), degToRad(-33.86), degToRad(1.73)]}
                onClick={(e) => {
                  handleAddDieClick(10, e);
                }}
                onPointerOver={(e) => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  document.body.style.cursor = "default";
                }}
              />
              <DieModel
                isStatic={true}
                dieType={12}
                scale={250}
                position={[0, -20, 0]}
                rotation={[degToRad(123.17), degToRad(-0.96), degToRad(-180.0)]}
                onClick={(e) => {
                  handleAddDieClick(12, e);
                }}
                onPointerOver={(e) => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  document.body.style.cursor = "default";
                }}
              />
              <DieModel
                isStatic={true}
                dieType={20}
                scale={250}
                position={[0, -25, 0]}
                rotation={[degToRad(-101.04), degToRad(43.75), degToRad(18.02)]}
                onClick={(e) => {
                  handleAddDieClick(20, e);
                }}
                onPointerOver={(e) => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  document.body.style.cursor = "default";
                }}
              />
              <DieModel
                isStatic={true}
                dieType={100}
                scale={250}
                position={[0, -30, 0]}
                rotation={[degToRad(20.94), degToRad(-71.38), degToRad(179.13)]}
                onClick={(e) => {
                  handleAddDieClick(100, e);
                }}
                onPointerOver={(e) => {
                  document.body.style.cursor = "pointer";
                }}
                onPointerOut={(e) => {
                  document.body.style.cursor = "default";
                }}
              />
            </Canvas>
          </div>
          <div className="selected-dice">
            <Canvas>
              <ambientLight />
              <OrthographicCamera
                makeDefault
                ref={cameraRef}
                position={[6, -10, 20]}
                zoom={trayCameraZoom}
              />

              {dice.map((die, idx) => (
                <DieModel
                  key={die.id}
                  ref={(el) => {
                    if (el) diceRefs.current[die.id] = el;
                  }}
                  dieType={die.getDieType()}
                  dieValue={die.getDieValue()}
                  scale={150}
                  position={getGridPosition(idx, cols, 3)}
                  onClick={(e) => {
                    handleRemoveDieClick(die.id, e);
                  }}
                  onPointerOver={(e) => {
                    document.body.style.cursor = "pointer";
                  }}
                  onPointerOut={(e) => {
                    document.body.style.cursor = "default";
                  }}
                />
              ))}
            </Canvas>
          </div>
        </div>

        <div className="button-container">
          <button
            className="roll-button"
            onClick={() => {
              handleRollDiceClick();
            }}
          >
            <Image
              width={40}
              height={40}
              src="/assets/d20.svg"
              alt="Roll Dice"
            />
            ROLL
          </button>
          <button
            className="reset-button"
            onClick={() => {
              handleResetDice();
            }}
          >
            <Image
              width={20}
              height={20}
              src="assets/restart.svg"
              alt="Roll Dice"
            />
            RESET
          </button>
        </div>
      </div>
    </>
  );
}
