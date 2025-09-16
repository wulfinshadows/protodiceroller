import TopBar from "../components/TopBar";
import DiceCanvas from "../components/DiceCanvas";

export default function FrontPage() {
  return (
    <div className="screen-container min-h-screen w-full">
      <div className="page-container">
        <TopBar />
        <DiceCanvas />
      </div>
    </div>
  );
}
