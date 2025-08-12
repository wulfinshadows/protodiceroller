import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRef, useEffect } from "react";
import * as THREE from "three";

function Model() {
  const model = useLoader(GLTFLoader, "/models/3D/Gayuma_256/D100_256.glb");
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      // Compute bounding box
      const box = new THREE.Box3().setFromObject(ref.current);
      const center = new THREE.Vector3();
      box.getCenter(center);
      // Offset the model so it's centered at the origin
      ref.current.position.x = ref.current.position.x - center.x;
      ref.current.position.y = ref.current.position.y - center.y;
      ref.current.position.z = ref.current.position.z - center.z;
    }
  }, [model]);
  return (
    <primitive
      ref={ref}
      object={model.scene}
      scale={200}
      position={[0, 0, 0]}
    />
  );
}

export default function ThreeDTest() {
  return (
    <Canvas>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <Model />
      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh> */}
      <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={50} />
      <OrbitControls />
    </Canvas>
  );
}
