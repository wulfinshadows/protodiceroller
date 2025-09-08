import { useContext, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { DieContext } from "../context/DieProvider";
import DieModel from "./DieModel";
import RotatableDie from "./RotatableDice";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import diceTray from "../assets/SpiritTray.png";
import degToRad from "../domain/functions/degToRad";
import useBreakpoint from "./useBreakpoint";
import { useCollectHistory } from "../hooks/useCollectHistory";
import HistoryComponent from "./HistoryComponent";
import RSidebar from "./RSidebar";
import Mobile from "./Mobile";
import { useState } from "react";
import d20 from "../assets/d20.svg";
import restart from "../assets/restart.svg";

export default function DiceCanvas() {
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
  const target = [0, -15, 0]; // where we want to look

  const { history, updateHistoryJson, updateHistoryState } = useCollectHistory();

  let cameraPosition = 0;
  let cameraZoom = 20;
  let trayCameraPos = [0, 0, 0];
  let trayCameraZoom = 0;
  let cameraRotation = [0, 0, 0];

  if (breakpoint === "base") {
    cameraPosition = -10;
    cameraZoom = 10;
    trayCameraPos = [10, 0, 10];
    trayCameraZoom = 7;
    //cameraRotation = [0, 0, Math.PI / 8];
  } else if (breakpoint === "md") {
    cameraPosition = -30;
    cameraZoom = 10.5;
    trayCameraPos = [8, -7, 10];
    trayCameraZoom = 17;
  } else if (breakpoint === "lg") {
    cameraPosition = -23;
    cameraZoom = 13;
    trayCameraPos = [10, -10, 10];
    trayCameraZoom = 18;
  } else if (breakpoint === "xl") {
    cameraPosition = -23;
    cameraZoom = 12;
    trayCameraPos = [10, -10, 10];
    trayCameraZoom = 18;
  } else if (breakpoint === "xxl") {
    cameraPosition = -21;
    cameraZoom = 15;
    trayCameraPos = [10, -10, 10];
    trayCameraZoom = 20;
  }

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
    ;
  };

  const [isRSidebarOpen, setIsRSidebarOpen] = useState(false);
  const toggleRSidebar = () => setIsRSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-row w-full justify-center">
      <div className="hidden md:grid grid-cols-9 col-start-1 bg-contain bg-center w-screen h-fit bg-no-repeat">
        <div className="xl:col-start-3 xl:ml-0 lg:col-start-2 lg:justify-content-end md:col-start-2 row-start-1 right-auto ml-0 items-start">
          <div className="flex-col h-[600px] bg-opacity-50 justify-end items-center xl:ml-0 lg:ml-16 md:ml-10 ml-4 mt-5">
            <Canvas>
              <ambientLight />
              <OrthographicCamera
                makeDefault
                ref={cameraRef}
                position={[0, cameraPosition + 7, 20]}
                zoom={cameraZoom}
                rotation={cameraRotation}
                /* play with zoom and position */
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
        <div className="xl:col-start-3 lg:col-start-2 md:col-start-2 row-start-1 xl:col-span-5 lg:col-span-7 md:col-span-7 bg-no-repeat place-items-center">
          <Image
            src={diceTray}
            className="xl:max-w-[100%] xl:max-h-[100%] lg:max-w-[100%] lg:max-h-auto md:max-w-[100%] md:max-h-[100%]"
            alt="Dice Tray"
          />
        </div>
        <div className="flex-col relative col-start-4 col-span-4 row-start-1 xl:h-[600px] lg:h-[600px] md:h-[450px] h-[500px] md:mt-14">
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
                position={[idx * 3, 0, 0]} // Example: space out dice
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
            {/* <OrbitControls /> */}
          </Canvas>
        </div>
        <div className="xl:col-span-1 xl:col-start-8 xl:row-start-1 lg:col-start-9 lg:row-start-1 md:row-start-2 md:col-start-4 md:col-span-3">
          <button
            className="roll-button"
            onClick={() => {
              handleRollDiceClick();
            }}
          >
            <Image width={40} height={40} src={d20} alt="Roll Dice" />
            ROLL
          </button>
          <button
            className="reset-button"
            onClick={() => {
              handleResetDice();
            }}
          >
            <Image width={20} height={20} src={restart} alt="Roll Dice" />
            RESET
          </button>
        </div>
        <RSidebar isOpen={isRSidebarOpen} toggleSidebar={toggleRSidebar} history={history}/>
      </div>
      <Mobile />
    </div>
  );
}

{
  /* {dice.map((die, idx) => (
          <DieModel
            key={idx}
            dieType={die.getDieType()}
            scale={500}
            position={[idx * 3, 0, 0]} // Example: space out dice
          />
        ))} */
}
