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

export default function DiceCanvas() {
  const {
    dice,
    handleAddDie,
    handleRemoveDie,
    handleRollDice,
    handleResetDice,
  } = useContext(DieContext);
  const cameraRef = useRef();
  const breakpoint = useBreakpoint();
  const target = [0, -15, 0]; // where we want to look

  let cameraPosition = [0, -15, 20];
  let cameraZoom = 20;
  let cameraRotation = [0, 0, 0];

  if (breakpoint === "base") {
    cameraPosition = [0, -10, 20];
    cameraZoom = 10;
    //cameraRotation = [0, 0, Math.PI / 8];
  } else if (breakpoint === "md") {
    cameraPosition = [-0.2, -25, 20];
    cameraZoom = 12;
  } else if (breakpoint === "lg") {
    cameraPosition = [-0.1, -17, 20];
    cameraZoom = 14;
  } else if (breakpoint === "xl") {
    cameraPosition = [-0.5, -20, 20];
    cameraZoom = 15;
  } else if (breakpoint === "xxl") {
    cameraPosition = [-0.5, -20, 20];
    cameraZoom = 15;
  }

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(...target);
    }
  }, []);

  return (
    <div className="flex flex-row w-full justify-center">
      <div className="hidden md:grid grid-cols-9 col-start-1 bg-contain bg-center w-screen h-full bg-no-repeat">
        <div className="xl:col-start-3 xl:ml-0 lg:col-start-2 lg:justify-content-end md:col-start-2 md:ml-10 row-start-1 right-auto ml-0 items-start">
          <div className="flex-col h-full bg-amber-200 bg-opacity-50">
            <Canvas>
              <ambientLight />
              <OrthographicCamera
                makeDefault
                ref={cameraRef}
                position={cameraPosition}
                zoom={cameraZoom}
                rotation={cameraRotation}
                /* play with zoom and position */
              />

              <DieModel
                dieType={4}
                scale={200}
                position={[0, 0, 0]}
                rotation={[degToRad(-89.11), degToRad(30.54), degToRad(-0.22)]}
                onClick={() => {
                  console.log("clicked");
                }}
              />

              <DieModel
                dieType={6}
                dieValue={1}
                scale={200}
                position={[0, -5, 0]}
                onClick={() => {
                  console.log("clicked");
                }}
              />
              <DieModel
                dieType={8}
                scale={200}
                position={[0, -10, 0]}
                rotation={[degToRad(21.33), degToRad(-44.98), degToRad(0)]}
              />
              <DieModel
                dieType={10}
                scale={200}
                position={[0, -15, 0]}
                rotation={[degToRad(-153.7), degToRad(-33.86), degToRad(1.73)]}
              />
              <DieModel
                dieType={12}
                scale={200}
                position={[0, -20, 0]}
                rotation={[degToRad(123.17), degToRad(-0.96), degToRad(-180.0)]}
              />
              <DieModel
                dieType={20}
                scale={200}
                position={[0, -25, 0]}
                rotation={[degToRad(-101.04), degToRad(43.75), degToRad(18.02)]}
              />
              <DieModel
                dieType={100}
                scale={200}
                position={[0, -30, 0]}
                rotation={[degToRad(20.94), degToRad(-71.38), degToRad(179.13)]}
              />
              <group>
                <mesh position={[0, 0, 0]}>
                  <sphereGeometry args={[0.2, 16, 16]} />
                  <meshStandardMaterial color="red" />
                </mesh>
                {/* <line>
                  <bufferGeometry
                    attach="geometry"
                    // Create geometry from an array of points
                    {...new THREE.BufferGeometry().setFromPoints([
                      new THREE.Vector3(0, -100, 0),
                      new THREE.Vector3(0, 5, 0),
                    ])}
                  />
                  <lineBasicMaterial attach="material" color="red" />
                </line> */}
              </group>
            </Canvas>
          </div>
        </div>
        <div className="xl:col-start-3 lg:col-start-2 md:col-start-2 row-start-1 xl:col-span-5 lg:col-span-7 md:col-span-7 bg-no-repeat place-items-center">
          <Image
            src={diceTray}
            className="xl:max-w-[100%] xl:max-h-[100%] lg:max-w-[100%] lg:max-h-auto md:max-w-[100%] md:max-h-[100%]"
            alt="Dice Tray"
          />
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <Canvas>
              <ambientLight />
              <OrthographicCamera
                makeDefault
                ref={cameraRef}
                position={[0, -15, 20]}
                zoom={30}
              />

              {/* <DieModel
                dieType={20}
                dieValue={1}
                scale={200}
                position={[0, -10, 0]}
              /> */}

              <RotatableDie
                dieType={4}
                position={[0, -14, 0]}
                rotation={[degToRad(0), degToRad(0), degToRad(0)]}
                scale={500}
              />
              {dice.map((die, idx) => (
                <DieModel
                  key={idx}
                  dieType={die.getDieType()}
                  dieValue={die.getDieValue()}
                  scale={200}
                  position={[idx * 2, 0, 0]} // Example: space out dice
                />
              ))}
              {/* <OrbitControls /> */}
            </Canvas>
          </div>
        </div>
      </div>
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
