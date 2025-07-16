import { createContext } from "react";
import { useDiceHandler } from "../Hooks/useDiceHandler";
import Die from "../../Domain/Objects/Die";

import "../Pages/Revamped.css";

const DieContext = createContext([new Die(20)]);

export default function DieProvider({ children }) {
  const {
    dice,
    isRolling,
    setIsRolling,
    handleAddDie,
    handleRemoveDie,
    handleRollDice,
    handleResetDice,
  } = useDiceHandler();
  return (
    <DieContext.Provider
      value={{
        dice,
        isRolling,
        setIsRolling,
        handleAddDie,
        handleRemoveDie,
        handleRollDice,
        handleResetDice,
      }}
    >
      {children}
    </DieContext.Provider>
  );
}
