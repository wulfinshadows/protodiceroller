import { useGLTF } from "@react-three/drei";
import { GAYUMA_MODEL_PATH } from "../domain/GAYUMA_MODEL_PATH";
import { useMemo } from "react";
import * as THREE from "three";

function cloneAndFullyCenter(scene) {
  const cloned = scene.clone(true);

  // Step 1: Per-mesh local centering
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

  // Step 3: Shift entire model to center
  cloned.position.sub(centroid);

  // Step 4 (optional for D4 and similar): Move pivot to center of bounding box height
  const box = new THREE.Box3().setFromObject(cloned);
  const height = box.max.y - box.min.y;
  const boxCenterY = (box.max.y + box.min.y) / 2;

  // You can decide conditionally per dieType if you want this shift
  cloned.position.y -= boxCenterY; // moves pivot to vertical center

  return cloned;
}
export default function DieModel({ dieType, position = [0, 0, 0], ...props }) {
  const path = GAYUMA_MODEL_PATH[dieType];
  const { scene } = useGLTF(path);
  const { centered, helper } = useMemo(() => {
    const centeredModel = cloneAndFullyCenter(scene);

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
      <primitive object={centered} {...props} />
    </group>
  );
}
