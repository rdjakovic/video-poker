import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CardProps {
  suit: "hearts" | "diamonds" | "clubs" | "spades";
  value: string;
  isHeld: boolean;
  index: number;
  onToggleHold: (index: number) => void;
}

interface CardHandProps {
  cards?: CardProps[];
  canHold?: boolean;
  onToggleHold?: (index: number) => void;
}

const PlayingCard: React.FC<CardProps> = ({
  suit,
  value,
  isHeld,
  index,
  onToggleHold,
}) => {
  const suitSymbol = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
  };

  const suitColor =
    suit === "hearts" || suit === "diamonds" ? "text-red-600" : "text-black";

  return (
    <div className="relative">
      <Card
        className={`w-32 h-44 flex flex-col justify-between p-2 bg-white border-2 ${isHeld ? "border-yellow-400" : "border-gray-200"}`}
        onClick={() => onToggleHold(index)}
      >
        <CardContent className="p-0 flex flex-col h-full justify-between">
          <div className={`text-lg font-bold ${suitColor}`}>
            <div className="flex flex-col items-start">
              <span>{value}</span>
              <span className="text-xl">{suitSymbol[suit]}</span>
            </div>
          </div>
          <div className={`text-4xl ${suitColor} self-center`}>
            {suitSymbol[suit]}
          </div>
          <div className={`text-lg font-bold ${suitColor} self-end rotate-180`}>
            <div className="flex flex-col items-start">
              <span>{value}</span>
              <span className="text-xl">{suitSymbol[suit]}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      {isHeld && (
        <div className="absolute -bottom-6 left-0 right-0 flex justify-center">
          <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-md">
            HELD
          </span>
        </div>
      )}
    </div>
  );
};

const CardHand: React.FC<CardHandProps> = ({
  cards = [
    { suit: "hearts", value: "3", isHeld: false, index: 0 },
    { suit: "spades", value: "K", isHeld: false, index: 1 },
    { suit: "spades", value: "6", isHeld: false, index: 2 },
    { suit: "hearts", value: "6", isHeld: false, index: 3 },
    { suit: "spades", value: "6", isHeld: false, index: 4 },
  ],
  canHold = true,
  onToggleHold = () => {},
}) => {
  const [localCards, setLocalCards] = useState(cards);

  const handleToggleHold = (index: number) => {
    if (!canHold) return;

    const updatedCards = [...localCards];
    updatedCards[index].isHeld = !updatedCards[index].isHeld;
    setLocalCards(updatedCards);
    onToggleHold(index);
  };

  return (
    <div className="bg-green-800 p-6 rounded-lg">
      <div className="flex justify-center gap-4 mb-4">
        {localCards.map((card, index) => (
          <PlayingCard
            key={index}
            suit={card.suit}
            value={card.value}
            isHeld={card.isHeld}
            index={index}
            onToggleHold={handleToggleHold}
          />
        ))}
      </div>
      {canHold && (
        <div className="text-center text-white text-sm mt-2">
          Select cards to hold before drawing. Good luck!
        </div>
      )}
    </div>
  );
};

export default CardHand;
