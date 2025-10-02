"use client";

import { useContext, useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { DieContext } from "../context/DieProvider";
import { useCollectHistory } from "../hooks/useCollectHistory";
import { useMediaQuery } from "react-responsive";
import { useShakeDetector } from "./../hooks/useShakeDetector";
import Image from "next/image";
import DieModel from "./DieModel";
import RSidebar from "./RSidebar";

function getGridPosition(index, cols = 4, spacing = 3) {
  const row = Math.floor(index / cols);
  const col = index % cols;
  const x = col * spacing;
  const y = -row * spacing;
  return [x - 6, y + 3, 0];
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
  const isMobile = useMediaQuery({ query: "(max-width: 426px)" });
  const smBreakpoint = useMediaQuery({ query: "(min-width: 640px)" });
  const mdBreakpoint = useMediaQuery({ query: "(min-width: 768px)" });
  const lgBreakpoint = useMediaQuery({ query: "(min-width: 1024px)" });
  const xlBreakpoint = useMediaQuery({ query: "(min-width: 1280px)" });
  const xxlBreakpoint = useMediaQuery({ query: "(min-width: 1536px)" });

  const diceRefs = useRef({});
  const cameraRef = useRef();

  const [isRSidebarOpen, setIsRSidebarOpen] = useState(false);
  const toggleRSidebar = () => setIsRSidebarOpen((prev) => !prev);

  const { history, updateHistoryJson, updateHistoryState } =
    useCollectHistory();

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt([0, -15, 0]);
    }
  }, []);

  // Dice Functions

  useEffect(() => {
    console.log("dice updated:", dice);
  }, [dice]);

  const handleAddDieClick = (dieType, e) => {
    e.stopPropagation();
    if (dice.length < 16 && isPortrait) {
      handleAddDie(dieType);
    } else if (dice.length > 56 && !isPortrait) {
      handleAddDie(dieType);
    }
  };

  const handleRemoveDieClick = (index, e) => {
    e.stopPropagation();
    handleRemoveDie(index);
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
  useShakeDetector(() => {
    handleRollDiceClick();
  }, 20);

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
          <Canvas key={isPortrait ? "mobile" : "desktop"}>
            <ambientLight />
            <OrthographicCamera
              makeDefault
              ref={cameraRef}
              position={
                isPortrait
                  ? [-3, 2, 20]
                  : xxlBreakpoint
                  ? [-5, -18, 20]
                  : xlBreakpoint
                  ? [3, -18, 20]
                  : lgBreakpoint
                  ? [1, -18, 20]
                  : mdBreakpoint
                  ? [0, -18, 20]
                  : smBreakpoint
                  ? [-2, -18, 20]
                  : [-3, -18, 20]
              }
              zoom={isPortrait ? 8 : 9}
            />

            <DieModel
              isStatic={true}
              dieType={4}
              scale={250}
              position={isPortrait ? [-20, 1.5, 0] : [0, 0, 0]}
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
              position={isPortrait ? [-14.5, 2, 0] : [0, -6, 0]}
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
              position={isPortrait ? [-9.5, 2, 0] : [0, -12, 0]}
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
              position={isPortrait ? [-4.5, 2, 0] : [0, -18, 0]}
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
              position={isPortrait ? [1.5, 2, 0] : [0, -24, 0]}
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
              position={isPortrait ? [8, 2, 0] : [0, -30, 0]}
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
              position={isPortrait ? [14, 2, 0] : [0, -36, 0]}
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
          <Canvas
            key={isPortrait ? "mobile" : "desktop"}
            // style={
            //   isPortrait
            //     ? { width: "20rem", height: "22rem" }
            //     : { width: "35rem", height: "500px" }
            // }
          >
            <ambientLight />
            <OrthographicCamera
              makeDefault
              ref={cameraRef}
              position={isPortrait ? [2.5, -7, 20] : [17, -15, 20]}
              zoom={isPortrait ? 13 : 9}
            />
            {dice.map((die, idx) => (
              <DieModel
                key={die.id}
                ref={(el) => {
                  if (el) diceRefs.current[die.id] = el;
                }}
                dieType={die.getDieType()}
                dieValue={die.getDieValue()}
                scale={250}
                position={
                  isPortrait
                    ? getGridPosition(idx, 4, 6)
                    : getGridPosition(idx, 8, 6)
                }
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
