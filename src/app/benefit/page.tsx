"use client";
import React, { useState } from "react";
import GoldCard from "./GoldCard";
import DiamondCard from "./DiamondCard";
import SilverCard from "./SilverCard";
import MobileBenefits from "./mobileBenefits"; 

const Benefit: React.FC = () => {
  const [cardArray, setCardArray] = useState<number[]>([1, 2, 3]);

  const nextCard = (index: number): void => {
    setCardArray((prevArray) => {
      const newArray = [
        ...prevArray.slice(index),
        ...prevArray.slice(0, index),
      ];
      return newArray;
    });
  };

  const getCard = (card: number) => {
    switch (card) {
      case 1:
        return <GoldCard />;
      case 2:
        return <DiamondCard />;
      case 3:
        return <SilverCard />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="hidden md:block lg:h-[600px] md:h-[900px] px-40 md:px-10">
        <div className="card-stack">
          {cardArray.map((card, index) => (
            <div
              className={`card card${index + 1} rounded-lg`}
              key={card}
              onClick={() => nextCard(index)}
            >
              {getCard(card)}
            </div>
          ))}
        </div>
      </div>
      <MobileBenefits />
    </>
  );
};

export default Benefit;
