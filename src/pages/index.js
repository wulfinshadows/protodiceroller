import TopBar from "../components/TopBar";
import DiceCanvas from "../components/DiceCanvas";
import { MotionPermissionModal } from "../hooks/useShakeDetector";

export default function FrontPage() {
  return (
    <div className="screen-container">
      <MotionPermissionModal />
      <TopBar />
      <DiceCanvas />
    </div>
  );
}
