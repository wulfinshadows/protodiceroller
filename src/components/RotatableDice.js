import { TransformControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import DieModel from "./DieModel";

export default function RotatableDie({ dieType, position }) {
  const dieRef = useRef();

  return (
    <>
      <TransformControls
        object={dieRef}
        mode="rotate"
        onObjectChange={() => {
          const euler = dieRef.current.rotation;
          console.log(
            `Rotation: X=${THREE.MathUtils.radToDeg(euler.x).toFixed(2)}°, ` +
              `Y=${THREE.MathUtils.radToDeg(euler.y).toFixed(2)}°, ` +
              `Z=${THREE.MathUtils.radToDeg(euler.z).toFixed(2)}°`
          );
        }}
      />
      <DieModel
        ref={dieRef}
        dieType={dieType}
        scale={200}
        position={position}
      />
    </>
  );
}
