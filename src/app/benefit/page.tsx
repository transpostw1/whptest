"use client";
import React, { useState } from "react";
import GoldCard from "./GoldCard";
import DiamondCard from "./DiamondCard";
import SilverCard from "./SilverCard";


const Benefit = () => {
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
        default :
        return null;
    }
  };

  return (
    <div className="h-[750px]">
      <div className="card-stack">
        {cardArray.map((card, index) => (
          <div
            className={`card card${index + 1}`}
            key={card}
            onClick={() => nextCard(index)}
          >
            {getCard(card)}
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benefit;
