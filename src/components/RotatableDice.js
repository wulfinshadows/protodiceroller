import { TransformControls } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import DieModel from "./DieModel";

export default function RotatableDie({ dieType, position }) {
  const groupRef = useRef();
  const controlsRef = useRef();
  const hasAttached = useRef(false);

  // Try to attach after the first frame when group is ready
  useFrame(() => {
    if (!hasAttached.current && groupRef.current && controlsRef.current) {
      groupRef.current.updateMatrixWorld(); // ensure position is baked in
      controlsRef.current.attach(groupRef.current);
      hasAttached.current = true;
    }
  });

  useEffect(() => {
    return () => {
      controlsRef.current?.detach();
    };
  }, []);

  return (
    <>
      <TransformControls
        ref={controlsRef}
        mode="rotate"
        onObjectChange={() => {
          if (!groupRef.current) return;
          const euler = groupRef.current.rotation;
          console.log(
            `Rotation: X=${THREE.MathUtils.radToDeg(euler.x).toFixed(2)}°, ` +
              `Y=${THREE.MathUtils.radToDeg(euler.y).toFixed(2)}°, ` +
              `Z=${THREE.MathUtils.radToDeg(euler.z).toFixed(2)}°`
          );
        }}
      />
      <group ref={groupRef} position={position} scale={200}>
        <DieModel dieType={dieType} />
      </group>
    </>
  );
}
