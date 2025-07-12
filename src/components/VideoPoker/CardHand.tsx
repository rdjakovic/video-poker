import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import CardBack from "./CardBack";
import { Card as GameCard } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";

interface PlayingCardProps {
  suit: "hearts" | "diamonds" | "clubs" | "spades";
  value: string;
  isHeld: boolean;
  isDealt: boolean;
  showBack?: boolean;
  index: number;
  onToggleHold: (index: number) => void;
  isWinning?: boolean;
}

interface CardHandProps {
  cards: GameCard[];
  canHold?: boolean;
  showBacks?: boolean;
  onCardClick?: (index: number) => void;
  winningCardIndices?: number[];
}

const PlayingCard: React.FC<PlayingCardProps> = ({
  suit,
  value,
  isHeld,
  isDealt,
  showBack = false,
  index,
  onToggleHold,
  isWinning = false,
}) => {
  const suitSymbol = {
    hearts: "♥",
    diamonds: "♦",
    clubs: "♣",
    spades: "♠",
  };

  const suitColor =
    suit === "hearts" || suit === "diamonds" ? "text-red-600" : "text-black";

  if (showBack || !isDealt) {
    return (
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: -50, rotateY: 180 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{
          duration: 0.6,
          delay: index * 0.1,
          ease: "easeOut"
        }}
      >
        <CardBack onClick={() => onToggleHold(index)} />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="relative"
      initial={{ rotateY: 180 }}
      animate={{ rotateY: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <motion.div
        animate={
          isWinning
            ? { y: -8, scale: 1.05 }
            : isHeld
            ? { y: -8, scale: 1.05 }
            : { y: 0, scale: 1 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Card
          className={`w-20 h-28 sm:w-32 sm:h-44 flex flex-col justify-between p-1 sm:p-2 bg-white border-2 cursor-pointer transition-all duration-200 ${
            isWinning
              ? "border-yellow-400 shadow-2xl shadow-yellow-400/50 ring-2 ring-yellow-300 animate-pulse"
              : isHeld
              ? "border-yellow-400 shadow-lg"
              : "border-gray-200 hover:border-gray-400"
          }`}
          onClick={() => onToggleHold(index)}
        >
          <CardContent className="p-0 flex flex-col h-full justify-between">
            <div className={`text-sm sm:text-lg font-bold ${suitColor}`}>
              <div className="flex flex-col items-start">
                <span>{value}</span>
                <span className="text-base sm:text-xl">{suitSymbol[suit]}</span>
              </div>
            </div>
            <div className={`text-2xl sm:text-4xl ${suitColor} self-center`}>
              {suitSymbol[suit]}
            </div>
            <div className={`text-sm sm:text-lg font-bold ${suitColor} self-end rotate-180`}>
              <div className="flex flex-col items-start">
                <span>{value}</span>
                <span className="text-base sm:text-xl">{suitSymbol[suit]}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        {isHeld && (
          <motion.div
            className="absolute -bottom-6 left-0 right-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded-md">
              HELD
            </span>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

const CardHand: React.FC<CardHandProps> = ({
  cards,
  canHold = true,
  showBacks = false,
  onCardClick = () => {},
  winningCardIndices = [],
}) => {
  const handleCardClick = (index: number) => {
    if (!canHold) return;
    onCardClick(index);
  };

  return (
    <motion.div
      className="bg-green-800 p-6 rounded-lg mb-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-center gap-4 mb-4">
        <AnimatePresence mode="wait">
          {cards.map((card: GameCard, index: number) => (
            <PlayingCard
              key={card.id || `${card.suit}-${card.value}-${index}`}
              suit={card.suit}
              value={card.value}
              isHeld={card.isHeld}
              isDealt={card.isDealt}
              showBack={showBacks}
              index={index}
              onToggleHold={handleCardClick}
              isWinning={winningCardIndices.includes(index)}
            />
          ))}
        </AnimatePresence>
      </div>
      {/**
      {canHold && (
        <motion.div
          className="text-center text-white text-sm mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          Select cards to hold before drawing. Good luck!
        </motion.div>
      )}
      */}
    </motion.div>
  );
};

export default CardHand;
