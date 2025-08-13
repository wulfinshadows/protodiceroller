import { useContext, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { DieContext } from "../context/DieProvider";
import DieModel from "./DieModel";
import RotatableDie from "./RotatableDice";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import diceTray from "../assets/SpiritTray.png";

export default function DiceCanvas() {
  const {
    dice,
    handleAddDie,
    handleRemoveDie,
    handleRollDice,
    handleResetDice,
  } = useContext(DieContext);
  const cameraRef = useRef();
  const target = [0, -15, 0]; // where we want to look

  const degToRad = (deg) => (deg * Math.PI) / 180;

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.lookAt(...target);
    }
  }, []);

  return (
    <div className="flex flex-row w-full justify-center">
      <div className="hidden md:grid grid-cols-9 col-start-1 bg-contain bg-center w-screen h-full bg-no-repeat">
        <div className="xl:col-start-3 xl:ml-0 lg:col-start-2 lg:justify-content-end md:col-start-2 md:ml-10 row-start-1 right-auto ml-0 relative h-full">
          <div className="h-full">
        <Canvas>
          <ambientLight />
          <OrthographicCamera
            makeDefault
            ref={cameraRef}
            position={[0, -15, 20]}
            zoom={20}
          />
          {/* <RotatableDie
            dieType={4}
            position={[-0.5, 0, 0]}
            rotation={[degToRad(-44.38), degToRad(0), degToRad(0)]}
          /> */}

          <DieModel
            dieType={4}
            scale={200}
            position={[0.4, 0, 0]}
            rotation={[degToRad(-44.38), degToRad(1.65), degToRad(-127.55)]}
            onClick={(e) => {
              e.stopPropagation();
              console.log("clicked");
            }}
          />

          <DieModel
            dieType={6}
            scale={200}
            position={[0, -5, 0]}
            rotation={[degToRad(90), degToRad(0), degToRad(0)]}
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
            <line>
              <bufferGeometry
                attach="geometry"
                // Create geometry from an array of points
                {...new THREE.BufferGeometry().setFromPoints([
                  new THREE.Vector3(0, -100, 0),
                  new THREE.Vector3(0, 5, 0),
                ])}
              />
              <lineBasicMaterial attach="material" color="red" />
            </line>
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
