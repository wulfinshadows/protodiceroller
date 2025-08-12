import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { GAYUMA_MODEL_PATH } from "../domain/GAYUMA_MODEL_PATH";

export default function usePreloadDiceModels() {
  useEffect(() => {
    Object.values(GAYUMA_MODEL_PATH).forEach((path) => useGLTF.preload(path));
  }, []);
}
