import { useGLTF } from "@react-three/drei";
import { GAYUMA_MODEL_PATH } from "../domain/GAYUMA_MODEL_PATH";
import { useMemo } from "react";
import * as THREE from "three";
import { radToDeg } from "three/src/math/MathUtils.js";
import ThreeDDie from "../domain/objects/ThreeDDie";

function cloneAndFullyCenter(scene, dieType) {
  const cloned = scene.clone(true);
  cloned.updateMatrixWorld(true);

  // Step 1: Get bounding box of the entire model
  const box = new THREE.Box3().setFromObject(cloned);
  const center = new THREE.Vector3();
  box.getCenter(center);

  // Step 2: Subtract box center so object is centered at (0,0,0)
  cloned.position.sub(center);

  // Step 3: Special handling for d4 (align flat + fix pivot)
  if (dieType === 4) {
    // Recompute bounding box after rotation
    const box4 = new THREE.Box3().setFromObject(cloned);
    const size4 = new THREE.Vector3();
    box4.getSize(size4);

    // Compute the "true centroid" of the pyramid
    const center4 = new THREE.Vector3();
    box4.getCenter(center4);

    // Shift so pivot is dead center of pyramid volume
    cloned.position.sub(center4);

    // Move it up so bottom face sits on ground plane (y=0)
    cloned.position.y -= box4.min.y;

    // Extra tweak: nudge pivot slightly down so it spins from the center
    // (the centroid of a tetrahedron is ~1/4 of its height up from the base)
    cloned.position.y += size4.y * -0.27;
    cloned.position.x += size4.x * 0.16;
    cloned.position.z += size4.z * 0.01;
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
      if (dieType === 4) {
        var randomFace = Math.floor(Math.random() * 3);
        return dieModel.faceRotations[dieValue][randomFace];
      } else {
        return dieModel.faceRotations[dieValue];
      }
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
