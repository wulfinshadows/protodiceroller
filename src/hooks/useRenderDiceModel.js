import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";
import { GAYUMA_MODEL_PATH } from "../domain/GAYUMA_MODEL_PATH";
import usePreloadDiceModels from "./usePreloadDiceModels";
import * as THREE from "three";

function cloneAndCenter(scene) {
  const cloned = scene.clone(true);
  const box = new THREE.Box3().setFromObject(cloned);
  const center = new THREE.Vector3();
  box.getCenter(center);
  cloned.position.x -= center.x;
  cloned.position.y -= center.y;
  cloned.position.z -= center.z;
  return cloned;
}

export default function useRenderDiceModel() {
  usePreloadDiceModels();

  const paths = Object.values(GAYUMA_MODEL_PATH);
  const models = useLoader(GLTFLoader, paths);

  const loadStaticModel = (dieType) => {
    const path = GAYUMA_MODEL_PATH[dieType];
    return useGLTF(path);
  };
  const renderAllModels = (props = {}) => {
    return models.map((model, idx) => (
      <primitive key={paths[idx]} object={model.scene.clone(true)} {...props} />
    ));
  };

  return { loadStaticModel, renderAllModels };
}
