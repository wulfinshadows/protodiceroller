import { useMemo } from "react";
import Image from "next/image";
import { useDieSkinHandler } from "../hooks/useDieSkinHandler";

export default function DieComponent({
  dieType,
  currentDieFaces,
  onDieClick = () => {},
}) {
  const { getDieAssets } = useDieSkinHandler();
  const isStatic = !!dieType;
  const staticDieFace = useMemo(() => {
    const dieAssets = getDieAssets(dieType);
    return dieAssets[0];
  }, [getDieAssets, dieType]);

  if (isStatic) {
    return (
      <Image
        className="relative 2xl:w-16 2xl:h-16 xl:w-14 xl:h-14 lg:w-12 lg:h-12 md:w-10 md:h-10 cursor-pointer hover:scale-110 active:scale-125 transition"
        src={staticDieFace}
        alt={`D${dieType}`}
        onClick={() => {
          onDieClick();
        }}
      />
    );
  } else {
    return (
      <div className="display-dice-container">
        {currentDieFaces.map(([dieFace, dieType], index) => {
          return (
            <Image
              key={index}
              className="relative 2xl:w-16 2xl:h-16 xl:w-14 xl:h-14 lg:w-12 lg:h-12 md:w-10 md:h-10 cursor-pointer hover:scale-110 active:scale-125 transition"
              src={dieFace}
              alt={`D${dieType}`}
              onClick={() => {
                onDieClick(index);
              }}
            />
          );
        })}
      </div>
    );
  }
}
