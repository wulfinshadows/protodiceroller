"use client";

import { useContext, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { DieContext } from "../context/DieProvider";
import { useCollectHistory } from "../hooks/useCollectHistory";
import { useMediaQuery } from "react-responsive";
import RotatableDice from "./RotatableDice";
import Image from "next/image";
import DieModel from "./DieModel";
import degToRad from "../domain/functions/degToRad";
import useBreakpoint from "./useBreakpoint";
import RSidebar from "./RSidebar";
import Mobile from "./Mobile";

function getGridPosition(index, cols = 4, spacing = 3) {
  const row = Math.floor(index / cols);
  const col = index % cols;
  const x = col * spacing;
  const y = -row * spacing;
  return [x, y, 0];
}

export default function DiceCanvas() {
  const {
    dice,
    handleAddDie,
    handleRemoveDie,
    handleRollDice,
    handleResetDice,
  } = useContext(DieContext);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const xsBreakpoint = useMediaQuery({ query: "(max-width: 320px)" });

  const diceRefs = useRef({});

  const cameraRef = useRef();
  const breakpoint = useBreakpoint();
  const target = [0, -15, 0];

  const [isRSidebarOpen, setIsRSidebarOpen] = useState(false);
  const toggleRSidebar = () => setIsRSidebarOpen((prev) => !prev);

  const { history, updateHistoryJson, updateHistoryState } =
    useCollectHistory();

  // 3D Camera Pos/Zoom Values

  let cols = 6;
  let cameraPosition = 0;
  let cameraZoom = 20;
  let trayCameraPos = [0, 0, 0];
  let trayCameraZoom = 0;
  let cameraRotation = [0, 0, Math.PI / -2];

  if (breakpoint === "base") {
    cameraPosition = -10;
    cameraZoom = 10;
    trayCameraPos = [12, 0, 10];
    trayCameraZoom = 7;
    cols = 5;
  } else if (breakpoint === "md") {
    cameraPosition = -30;
    cameraZoom = 10.5;
    trayCameraPos = [8, -7, 10];
    trayCameraZoom = 19;
    cols = 6;
  } else if (breakpoint === "lg") {
    cameraPosition = -23;
    cameraZoom = 13;
    trayCameraPos = [10, -10, 10];
    trayCameraZoom = 21;
    cols = 7;
  } else if (breakpoint === "xl") {
    cameraPosition = -23;
    cameraZoom = 12;
    trayCameraPos = [12, -10, 10];
    trayCameraZoom = 20;
    cols = 8;
  } else if (breakpoint === "xxl") {
    cameraPosition = -21;
    cameraZoom = 15;
    trayCameraPos = [13, -10, 10];
    trayCameraZoom = 22;
    cols = 8;
  }

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(...target);
    }
  }, []);

  // Dice Functions

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

  if (!mounted) return null;

  return (
    <div className="canvas-container">
      <RSidebar
        isOpen={isRSidebarOpen}
        toggleSidebar={toggleRSidebar}
        history={history}
      />
      <div className="dice-tray">
        <Image
          src={
            isPortrait
              ? "/assets/SpiritTrayRotated.png"
              : "/assets/SpiritTray.png"
          }
          alt={isPortrait ? "Portrait Dice Tray" : "Landscape Dice Tray"}
          fill
          className="tray-image"
        />
        <div className="dice-select">
          <Canvas>
            <ambientLight />
            <OrthographicCamera
              makeDefault
              ref={cameraRef}
              position={[-3, 0, 20]}
              zoom={6}
            />

            <DieModel
              isStatic={true}
              dieType={4}
              scale={250}
              position={xsBreakpoint ? [-16, 3, 0] : [0, 0, 0]}
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
              position={xsBreakpoint ? [-10, 3.5, 0] : [0, -6, 0]}
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
              position={xsBreakpoint ? [-4, 3.5, 0] : [0, -12, 0]}
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
              position={[0, -18, 0]}
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
              position={[0, -24, 0]}
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
              position={[0, -30, 0]}
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
              position={[0, -36, 0]}
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
              zoom={16}
            />
            <RotatableDice dieType={6} position={[5, -5, 0]} />
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
          <Image width={40} height={40} src="/assets/d20.svg" alt="Roll Dice" />
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
  );
}

{
  /* <div className="dice-canvas-container">
      <div className="desktop-container">
        <div className="canvas-container">
          <div className="dice-select-container">
            <Canvas>
              <ambientLight />
              <OrthographicCamera
                makeDefault
                ref={cameraRef}
                position={[0, cameraPosition + 7, 20]}
                zoom={cameraZoom}
                rotation={cameraRotation}
              />
              <DieModel
                isStatic={true}
                dieType={4}
                scale={200}
                position={[0, 0, 0]}
                rotation={[degToRad(-89.11), degToRad(30.54), degToRad(-0.22)]}
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
                scale={200}
                position={[0, -5, 0]}
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
                scale={200}
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
                scale={200}
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
                scale={200}
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
                scale={200}
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
                scale={200}
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
        </div>
        <div className="dice-tray-container">
          <Image
            src="/assets/SpiritTray.png"
            width={1440}
            height={1061}
            className="dice-tray-image"
            alt="Dice Tray"
          />
        </div>
        <div className="selected-dice">
          <Canvas>
            <ambientLight />
            <OrthographicCamera
              makeDefault
              ref={cameraRef}
              position={trayCameraPos}
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
              src="assets/d20.svg"
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
        <RSidebar
          isOpen={isRSidebarOpen}
          toggleSidebar={toggleRSidebar}
          history={history}
        />
      </div>
      <Mobile />
    </div> */
}
