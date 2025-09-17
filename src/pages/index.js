import TopBar from "../components/TopBar";
import DiceCanvas from "../components/DiceCanvas";

export default function FrontPage() {
  return (
    <div className="screen-container">
      <TopBar />
      <DiceCanvas />
    </div>
  );
}
