export default function HowTo({ onExit = () => {} }) {
  return (
    <div className="how-to-container">
      <div>
        <h2 className="font-[TWBOZ]">HOW TO PLAY</h2>
        <hr></hr>
        <li>Click on a dice to add it to the dice tray</li>
        <li>Click the “Roll” button to roll</li>
        <li>If you're on mobile, alternatively you can shake to roll!</li>
        <li>Check the results in History</li>
        <li>Choosing themes will change the dice and dice tray skins</li>
        <button onClick={() => onExit()}>✕</button>
      </div>
    </div>
  );
}
