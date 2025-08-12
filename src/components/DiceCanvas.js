import { useContext, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { DieContext } from "../context/DieProvider";
import DieModel from "./DieModel";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";

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
    <div className="bg-[url('/SpiritTray.png')]">
      <div className=" h-screen">
        <Canvas>
          <ambientLight />
          <OrthographicCamera
            makeDefault
            ref={cameraRef}
            position={[0, -15, 20]}
            zoom={20}
          />
          <DieModel
            dieType={4}
            scale={200}
            position={[0, 0, 0]}
            rotation={[degToRad(0), degToRad(90), degToRad(20)]}
          />
          <DieModel
            dieType={6}
            scale={200}
            position={[0, -5, 0]}
            rotation={[degToRad(20), degToRad(20), degToRad(-90)]}
          />
          <DieModel dieType={8} scale={200} position={[0, -10, 0]} />
          <DieModel dieType={10} scale={200} position={[0, -15, 0]} />
          <DieModel dieType={12} scale={200} position={[0, -20, 0]} />
          <DieModel dieType={20} scale={200} position={[0, -25, 0]} />
          <DieModel dieType={100} scale={200} position={[0, -30, 0]} />
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
