import Sidebar from "./Sidebar";
import RSidebar from "./RSidebar";
import Image from "next/image";
import { useState, useContext } from "react";
import { DieContext } from "../context/DieProvider";
import { ThemeContext } from "../context/ThemeContext";
import { useDiceRenderer } from "../hooks/useDiceRenderer";
import DieComponent from "../components/DieComponent";
import { useCollectHistory } from "../hooks/useCollectHistory";
import d20 from "../../assets/d20.svg";
import themes from "../context/themes";

export default function Mobile() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
    const [isRSidebarOpen, setIsRSidebarOpen] = useState(false);
    const toggleRSidebar = () => setIsRSidebarOpen((prev) => !prev);

    const { dice, handleAddDie, handleRemoveDie, isRolling } =
        useContext(DieContext);
    const { triggerDiceRolls, currentDieFaces, updateDieFaces } =
        useDiceRenderer();
    const { history, updateHistoryJson, updateHistoryState } =
        useCollectHistory();

    const { themeName, setThemeName } = useContext(ThemeContext);
    const theme = themes[themeName];

    const handleRollClick = async () => {
        if (dice.length !== 0) {
        //diceRollFX.play();
        const rolledDice = await triggerDiceRolls();
        updateHistoryJson(rolledDice);
        updateHistoryState();
        }
    };
    const handleAddDieClick = (dieType) => {
        if (!isRolling) {
        // dicePutFX.play();
        handleAddDie(dieType);
        }
    };
    const handleRemoveDieClick = (index) => {
        if (!isRolling) {
        // diceTakeFX.play();
        handleRemoveDie(index);
        updateDieFaces();
        }
    };
    
    return(
        <>
        <section className="grid grid-rows-7 grid-cols-9 md:hidden">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <RSidebar isOpen={isRSidebarOpen} toggleSidebar={toggleRSidebar} history={history} />
            <div className="row-start-1 col-start-2 row-span-6 col-span-7 max-[410px]:row-start-1 max-[410px]:col-start-1 max-[410px]:row-span-7 max-[410px]:col-span-9">
                <Image
                    src={theme.rotatedBackground}
                    className="w-full h-fit"
                    alt="Dice Tray"
                />
            </div>
            <div className="row-start-1 sm:col-start-3 sm:col-span-5 col-span-7 col-start-2 sm:mt-7 max-[410px]:mt-7 mt-2.5 max-[410px]:col-span-9 max-[410px]:col-start-1 items-center justify-center place-content-center place-items-center">
                <div className="flex">
                    <DieComponent
                        dieType={4}
                        onDieClick={() => {
                        handleAddDieClick(4);
                        }}
                    />
                    <DieComponent
                        dieType={6}
                        onDieClick={() => {
                        handleAddDieClick(6);
                        }}
                    />
                    <DieComponent
                        dieType={8}
                        onDieClick={() => {
                        handleAddDieClick(8);
                        }}
                    />
                    <DieComponent
                        dieType={12}
                        onDieClick={() => {
                        handleAddDieClick(12);
                        }}
                    />
                    <DieComponent
                        dieType={20}
                        onDieClick={() => {
                        handleAddDieClick(20);
                        }}
                    />
                    <DieComponent
                        dieType={100}
                        onDieClick={() => {
                        handleAddDieClick(100);
                        }}
                    />
                </div>
            </div>
            <div className="row-start-2 col-start-3 row-span-4 col-span-5 overflow-y-auto pt-10 max-[410px]:row-span-5 max-[410px]:col-span-7 max-[410px]:row-start-2 max-[410px]:col-start-2">
                <DieComponent
                    currentDieFaces={currentDieFaces}
                    onDieClick={(index) => {
                    handleRemoveDieClick(index);
                    updateDieFaces();
                    }}
                />
            </div>
            <div className="row-start-7 col-start-4 col-span-3 max-[410px]:row-start-8 max-[410px]:col-start-4 max-[410px]:col-span-3">
                <button
                    className="roll-button"
                    onClick={() => {
                    handleRollClick();
                    }}
                    >
                    <Image width={40} height={40} src={d20} alt="Roll Dice" />
                        ROLL
                </button>
            </div>
        </section>
        </>
    )
}