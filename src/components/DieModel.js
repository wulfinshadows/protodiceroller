import { useGLTF } from "@react-three/drei";
import { GAYUMA_MODEL_PATH } from "../domain/GAYUMA_MODEL_PATH";
import { useMemo } from "react";
import * as THREE from "three";
import { radToDeg } from "three/src/math/MathUtils.js";
import ThreeDDie from "../domain/objects/ThreeDDie";

function cloneAndFullyCenter(scene, dieType) {
  const cloned = scene.clone(true);

  // Ensure world matrices are fresh
  cloned.updateMatrixWorld(true);

  // Step 1: Get bounding box of the entire model
  const box = new THREE.Box3().setFromObject(cloned);
  const center = new THREE.Vector3();
  box.getCenter(center);

  // Step 2: Subtract box center so object is centered at (0,0,0)
  cloned.position.sub(center);

  // Step 3: Special handling for d4 (align it flat on Y axis)
  if (dieType === 4) {
    // Rotate so one face lies flat
    cloned.rotation.set(
      THREE.MathUtils.degToRad(-90), // tilt sideways
      THREE.MathUtils.degToRad(0), // no spin
      THREE.MathUtils.degToRad(0) // upright
    );

    cloned.updateMatrixWorld(true);

    // Recompute bounding box after rotation
    const box4 = new THREE.Box3().setFromObject(cloned);
    const center4 = new THREE.Vector3();
    box4.getCenter(center4);

    cloned.position.sub(center4); // recenter again
    cloned.position.y -= box4.min.y; // shift up so it sits on ground plane
  }

  return cloned;
}
export default function DieModel({
  dieType,
  dieValue,
  position = [0, 0, 0],
  ...props
}) {
  const dieModel = new ThreeDDie(dieType);
  const path = dieModel.modelPath;

  const { scene } = useGLTF(path);

  // Pick rotation for die face
  const rotation = useMemo(() => {
    if (dieValue && dieModel.faceRotations[dieValue]) {
      return dieModel.faceRotations[dieValue];
    }
    return [0, 0, 0];
  }, [dieValue, dieModel]);

  // Center and clone once
  const centered = useMemo(() => {
    return cloneAndFullyCenter(scene, dieType);
  }, [scene, dieType]);

  return (
    <group position={position} rotation={rotation} {...props}>
      <primitive object={centered} />
    </group>
  );
}
