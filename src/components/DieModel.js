import { useGLTF } from "@react-three/drei";
import { GAYUMA_MODEL_PATH } from "../domain/GAYUMA_MODEL_PATH";
import { useMemo } from "react";
import * as THREE from "three";
import { radToDeg } from "three/src/math/MathUtils.js";
import ThreeDDie from "../domain/objects/ThreeDDie";

function cloneAndFullyCenter(scene, dieType) {
  const cloned = scene.clone(true);

  // Step 1: Local mesh centering
  cloned.traverse((child) => {
    if (child.isMesh && child.geometry) {
      child.geometry.computeBoundingBox();
      const box = child.geometry.boundingBox;
      const center = new THREE.Vector3();
      box.getCenter(center);
      child.geometry.translate(-center.x, -center.y, -center.z);
    }
  });

  // Step 2: Vertex-average centroid
  const vertexSum = new THREE.Vector3();
  let vertexCount = 0;
  cloned.traverse((child) => {
    if (child.isMesh && child.geometry) {
      const pos = child.geometry.attributes.position;
      const temp = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
        temp.fromBufferAttribute(pos, i);
        child.localToWorld(temp);
        vertexSum.add(temp);
        vertexCount++;
      }
    }
  });
  const centroid = vertexSum.divideScalar(vertexCount);
  cloned.position.sub(centroid);

  // Step 3: Special handling for d4
  // if (dieType === 4) {
  //   const originalRotation = cloned.rotation.clone();

  //   let bestAngle = 0;
  //   let smallestDiff = Infinity;

  //   // Try small rotations around Y-axis to make box square
  //   for (let deg = 0; deg < 90; deg += 0.5) {
  //     // 0.5° precision
  //     cloned.rotation.set(
  //       originalRotation.x,
  //       THREE.MathUtils.degToRad(deg),
  //       originalRotation.z
  //     );
  //     cloned.updateMatrixWorld(true);

  //     const box = new THREE.Box3().setFromObject(cloned);
  //     const size = new THREE.Vector3();
  //     box.getSize(size);

  //     const diff = Math.abs(size.x - size.z);
  //     if (diff < smallestDiff) {
  //       smallestDiff = diff;
  //       bestAngle = deg;
  //     }
  //   }

  //   // Apply the best found rotation
  //   cloned.rotation.set(
  //     originalRotation.x,
  //     THREE.MathUtils.degToRad(bestAngle),
  //     originalRotation.z
  //   );

  //   // Recenter after rotation
  //   const box = new THREE.Box3().setFromObject(cloned);
  //   const center = new THREE.Vector3();
  //   box.getCenter(center);
  //   cloned.position.sub(center);
  //   cloned.position.x += 0.0015;
  //   cloned.position.z += -0.0015;
  //   cloned.position.y += 0.0015; // Adjust to avoid z-fighting
  // }
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

  var rotation = [0, 0, 0];
  if (dieValue) {
    // if dieValue is provided, use it to set rotation
    rotation = dieModel.faceRotations[dieValue];
  }

  const { centered, helper } = useMemo(() => {
    const centeredModel = cloneAndFullyCenter(scene, dieType);

    // Compute bounding box for the centered model
    const box = new THREE.Box3().setFromObject(centeredModel);

    // Create a Box3Helper to visualize it
    const helper = new THREE.Box3Helper(box, 0xff0000); // red outline

    // Keep helper in same group as model
    const group = new THREE.Group();
    group.add(centeredModel);
    group.add(helper);

    return { centered: group, helper };
  }, [scene]);
  return (
    <group position={position}>
      <primitive object={centered} rotation={rotation} {...props} />
    </group>
  );
}
