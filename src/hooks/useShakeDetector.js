"use client";
import { useEffect, useState } from "react";

export function useShakeDetector(
  onShake = () => {},
  threshold = 12, // how strong the shake must be
  cooldown = 1000 // ms between shakes
) {
  let lastShake = 0;

  useEffect(() => {
    function handleMotion(e) {
      if (!e.accelerationIncludingGravity) return;

      const { x = 0, y = 0, z = 0 } = e.accelerationIncludingGravity;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      if (magnitude > threshold) {
        const now = Date.now();
        if (now - lastShake > cooldown) {
          lastShake = now;
          onShake();
        }
      }
    }

    window.addEventListener("devicemotion", handleMotion);
    return () => {
      window.removeEventListener("devicemotion", handleMotion);
    };
  }, [onShake, threshold, cooldown]);
}

// ✅ Call this once from a button click on iOS
export async function requestMotionPermission() {
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    try {
      const response = await DeviceMotionEvent.requestPermission();
      if (response !== "granted") {
        alert("Permission denied for motion sensors.");
      }
    } catch (err) {
      console.error("Permission request failed:", err);
    }
  }
}

export function MotionPermissionModal() {
  const [visible, setVisible] = useState(true);

  const handleGrant = async () => {
    await requestMotionPermission();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80 text-center">
        <h2 className="text-lg font-semibold mb-4">Enable Motion Access</h2>
        <p className="text-gray-600 mb-6">
          This app needs access to motion sensors to detect shakes.
        </p>
        <button
          onClick={handleGrant}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Allow Motion Access
        </button>
      </div>
    </div>
  );
}
