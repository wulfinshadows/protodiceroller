import { useGLTF } from "@react-three/drei";
import { GAYUMA_MODEL_PATH } from "../domain/GAYUMA_MODEL_PATH";
import {
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
  useLayoutEffect,
} from "react";
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
const DieModel = forwardRef(function DieModel(
  { isStatic = false, dieType, dieValue = 1, position = [0, 0, 0], ...props },
  ref
) {
  const dieModel = new ThreeDDie(dieType);
  const path = dieModel.modelPath;
  const { scene } = useGLTF(path);

  const groupRef = useRef();

  const rolling = useRef(false);
  const animation = useRef({
    axis: new THREE.Vector3(),
    end: new THREE.Quaternion(),
    progress: 1,
    duration: 2,
    totalSpins: 5,
  });

  // Center and clone once
  const centered = useMemo(() => {
    return cloneAndFullyCenter(scene, dieType);
  }, [scene, dieType]);

  // 🔑 Store stable d4 orientations so they don't repick on re-render
  const chosenD4Rotations = useRef({});

  useLayoutEffect(() => {
    if (!groupRef.current || !centered || rolling.current) return;

    const faceKey = dieValue ?? 1;
    let faceRotation;

    if (dieType === 4 && Array.isArray(dieModel.faceRotations[faceKey])) {
      if (!chosenD4Rotations.current[faceKey]) {
        const allOptions = dieModel.faceRotations[faceKey];
        chosenD4Rotations.current[faceKey] =
          allOptions[Math.floor(Math.random() * allOptions.length)];
      }
      faceRotation = chosenD4Rotations.current[faceKey];
    } else {
      faceRotation = dieModel.faceRotations[faceKey];
    }

    if (!faceRotation) return;

    const [x, y, z] = faceRotation; // radians
    groupRef.current.quaternion.setFromEuler(new THREE.Euler(x, y, z));
  }, [centered, dieType, dieValue, dieModel]);

  // 🔥 Expose roll(value) to parent
  useImperativeHandle(ref, () => ({
    roll: (value) => {
      if (isStatic) return;

      const faceRotation =
        dieType === 4
          ? dieModel.faceRotations[value][
              Math.floor(Math.random() * dieModel.faceRotations[value].length)
            ]
          : dieModel.faceRotations[value];

      const [x, y, z] = faceRotation;
      const endQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(x, y, z)
      );

      animation.current = {
        axis: new THREE.Vector3(
          Math.random(),
          Math.random(),
          Math.random()
        ).normalize(),
        end: endQuat,
        progress: 0,
        duration: 2.5, // roll duration
        totalSpins: 8, // spin count
      };

      rolling.current = true;
    },
  }));

  // 🎬 Smooth animation loop
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

  return (
    <group ref={groupRef} position={position} {...props}>
      <primitive object={centered} />
    </group>
  );
});

export default DieModel;
