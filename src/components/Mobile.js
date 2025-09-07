import Sidebar from "./Sidebar";
import RSidebar from "./RSidebar";
import Image from "next/image";
import { useState, useContext, useRef, useEffect } from "react";
import { DieContext } from "../context/DieProvider";
import { ThemeContext } from "../context/ThemeContext";
import { useDiceRenderer } from "../hooks/useDiceRenderer";
import DieComponent from "../components/DieComponent";
import { useCollectHistory } from "../hooks/useCollectHistory";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import degToRad from "../domain/functions/degToRad";
import useBreakpoint from "./useBreakpoint";
import DieModel from "./DieModel";
import d20 from "../assets/d20.svg";
import restart from "../assets/restart.svg";
import themes from "../context/themes";

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
    const target = [0, -15, 0]; // where we want to look
  
    let cameraPosition = [0, -15, 20];
    let cameraZoom = 20;
    let cameraRotation = [0, 0, Math.PI / 2];
    let trayCameraZoom = 0;
  
    if (breakpoint === "base") {
      cameraPosition = -10;
      cameraZoom = 10;
      cameraRotation = [0, 0, Math.PI / -2];
      trayCameraZoom = 16;
    } else if (breakpoint === "md") {
      cameraPosition = -30;
      cameraZoom = 10.5;
      trayCameraZoom = 17;
    } else if (breakpoint === "lg") {
      cameraPosition = -20.5;
      cameraZoom = 14;
      trayCameraZoom = 7;
    } else if (breakpoint === "xl") {
      cameraPosition = -23;
      cameraZoom = 12;
      trayCameraZoom = 7;
    } else if (breakpoint === "xxl") {
      cameraPosition = -19;
      cameraZoom = 15;
      trayCameraZoom = 7;
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
    };

  return (
    <>
      <section className="grid grid-rows-7 grid-cols-9 md:hidden">
        <RSidebar
          isOpen={isRSidebarOpen}
          toggleSidebar={toggleRSidebar}
        />
        <div className="row-start-1 col-start-2 row-span-6 col-span-7 max-[410px]:row-start-1 max-[410px]:col-start-1 max-[410px]:row-span-7 max-[410px]:col-span-9 h-[500px]">
          <Image
            src={theme.rotatedBackground}
            className="w-full h-fit"
            alt="Dice Tray"
          />
        </div>
        <div className="relative row-start-1 sm:col-start-3 sm:col-span-5 col-span-7 col-start-2 sm:mt-7 max-[410px]:mt-7 mt-2.5 max-[410px]:col-span-9 max-[410px]:col-start-1 items-center justify-center ">
          <div className="relative">
              <Canvas>
              <ambientLight />
              <OrthographicCamera
                makeDefault
                ref={cameraRef}
                position={[-3, cameraPosition - 4, 20]}
                zoom={cameraZoom}
                rotation={cameraRotation}
                /* play with zoom and position */
              />
              <DieModel
                isStatic={true}
                dieType={4}
                scale={200}
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
                scale={200}
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
        <div className="row-start-2 col-start-3 row-span-4 col-span-5 overflow-y-auto max-[410px]:row-span-5 max-[410px]:col-span-7 max-[410px]:row-start-2 max-[410px]:col-start-2 h-[500px]">
          <Canvas>
            <ambientLight />
            <OrthographicCamera
              makeDefault
              ref={cameraRef}
              position={[7, -12, 20]}
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
        <div className="flex row-start-5 col-start-4 col-span-3 mt-10 sm:row-start-5 max-[410px]:col-start-4 max-[410px]:col-span-3 justify-center items-center">
          <button
            className="roll-button"
            onClick={() => {
              handleRollDiceClick();
            }}
          >
            <Image width={40} height={40} src={d20} alt="Roll Dice"/>
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
      </section>
    </>
  );
}
