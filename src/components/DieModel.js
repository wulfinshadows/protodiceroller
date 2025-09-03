import { useGLTF } from "@react-three/drei";
import { GAYUMA_MODEL_PATH } from "../domain/GAYUMA_MODEL_PATH";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { radToDeg } from "three/src/math/MathUtils.js";
import ThreeDDie from "../domain/objects/ThreeDDie";
import { useFrame } from "@react-three/fiber";

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
  isStatic = false,
  dieType,
  dieValue,
  position = [0, 0, 0],
  ...props
}) {
  const dieModel = new ThreeDDie(dieType);
  const path = dieModel.modelPath;
  const { scene } = useGLTF(path);

  const groupRef = useRef();

  const rolling = useRef(false);
  const spinAxis = useRef(new THREE.Vector3(0, 1, 0));

  const animation = useRef({
    progress: 0,
    duration: 3,
    end: new THREE.Quaternion(),
    axis: new THREE.Vector3(),
    totalSpins: 6, // number of random spins before stopping
  });

  // Center and clone once
  const centered = useMemo(
    () => cloneAndFullyCenter(scene, dieType),
    [scene, dieType]
  );

  // fallback rotation
  let rotation = dieModel.faceRotations[1];
  if (dieType === 4) {
    const randomFace = Math.floor(Math.random() * 3);
    rotation = dieModel.faceRotations[1][randomFace];
  }

  // trigger roll on dieValue change
  useEffect(() => {
    if (!dieValue || !dieModel.faceRotations[dieValue] || isStatic) return;

    let faceRotation =
      dieType === 4
        ? dieModel.faceRotations[dieValue][Math.floor(Math.random() * 3)]
        : dieModel.faceRotations[dieValue];

    const [x, y, z] = faceRotation;
    const finalQuat = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(x, y, z)
    );

    // pick random spin axis
    spinAxis.current = new THREE.Vector3(
      Math.random(),
      Math.random(),
      Math.random()
    ).normalize();

    animation.current = {
      progress: 0,
      duration: 3, // total roll duration
      end: finalQuat,
      axis: spinAxis.current.clone(),
      totalSpins: 16, // higher = more chaotic spin before settling
    };

    rolling.current = true;
  }, [dieValue, dieModel, dieType, isStatic]);

  // main loop
  useFrame((state, delta) => {
    if (!groupRef.current || isStatic) return;
    if (!rolling.current) return;

    const anim = animation.current;

    if (anim.progress < 1) {
      anim.progress = Math.min(1, anim.progress + delta / anim.duration);

      const t = anim.progress;
      const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic

      // Spin amount decays to 0
      const spinAmount = (1 - ease) * Math.PI * anim.totalSpins;
      const spinQuat = new THREE.Quaternion().setFromAxisAngle(
        anim.axis,
        spinAmount
      );

      // Apply spin offset relative to final target
      const currentQuat = anim.end.clone().multiply(spinQuat);

      // Interpolate smoothly toward the final face
      groupRef.current.quaternion.slerpQuaternions(
        groupRef.current.quaternion,
        currentQuat,
        0.3
      );
    } else {
      groupRef.current.quaternion.copy(anim.end);
      rolling.current = false;
    }
  });

  if (isStatic) {
    return (
      <group ref={groupRef} position={position} rotation={rotation} {...props}>
        <primitive object={centered} />
      </group>
    );
  } else {
    return (
      <group ref={groupRef} position={position} {...props}>
        <primitive object={centered} />
      </group>
    );
  }
}
