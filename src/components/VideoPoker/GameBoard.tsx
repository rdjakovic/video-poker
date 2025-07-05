import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CardHand from "./CardHand";
import PayoutTable from "./PayoutTable";
import { MinusIcon, PlusIcon } from "lucide-react";

interface GameBoardProps {
  initialCredits?: number;
}

const GameBoard = ({ initialCredits = 1000 }: GameBoardProps) => {
  // Game state
  const [credits, setCredits] = useState(initialCredits);
  const [bet, setBet] = useState(10);
  const [gameMode, setGameMode] = useState("regular");
  const [isDealt, setIsDealt] = useState(false);

  // Mock cards for UI scaffolding
  const mockCards = [
    { suit: "diamonds", value: "3", isHeld: false },
    { suit: "spades", value: "K", isHeld: false },
    { suit: "spades", value: "6", isHeld: false },
    { suit: "diamonds", value: "6", isHeld: false },
    { suit: "spades", value: "6", isHeld: false },
  ];

  const [cards, setCards] = useState(mockCards);

  // Handle bet changes
  const increaseBet = () => {
    if (bet < 100) setBet(bet + 5);
  };

  const decreaseBet = () => {
    if (bet > 5) setBet(bet - 5);
  };

  const maxBet = () => {
    setBet(100);
  };

  // Handle game actions
  const handleDeal = () => {
    if (!isDealt) {
      // Initial deal
      setCredits(credits - bet);
      setIsDealt(true);
      // In a real implementation, we would deal cards here
    } else {
      // Draw new cards
      setIsDealt(false);
      // In a real implementation, we would evaluate the hand and award winnings here
    }
  };

  const handleCardClick = (index: number) => {
    if (isDealt) {
      const updatedCards = [...cards];
      updatedCards[index].isHeld = !updatedCards[index].isHeld;
      setCards(updatedCards);
    }
  };

  const handleGameModeChange = (mode: string) => {
    setGameMode(mode);
    setIsDealt(false);
    // Reset the game when changing modes
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto bg-green-800 p-6 rounded-lg shadow-lg">
      {/* Game title */}
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">Video Poker</h1>

      {/* Game mode selection */}
      <Tabs
        defaultValue="regular"
        className="w-full max-w-md mb-4"
        onValueChange={handleGameModeChange}
      >
        <TabsList className="grid grid-cols-3 w-full bg-green-700">
          <TabsTrigger value="regular" className="text-white">
            Regular 5 Card Draw
          </TabsTrigger>
          <TabsTrigger value="jokers" className="text-white">
            Joker's Wild
          </TabsTrigger>
          <TabsTrigger value="deuces" className="text-white">
            Deuces Wild
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Credits display */}
      <div className="self-end text-white mb-2">
        <span className="font-bold">Credits: {credits}</span>
      </div>

      <div className="flex w-full gap-4">
        <div className="flex-1 bg-green-700 border-2 border-yellow-500 rounded-lg p-4">
          {/* Main game area */}
          <div className="text-center text-white mb-4">
            <h2 className="text-xl">Place Your Bet and Deal</h2>
          </div>

          {/* Card display */}
          <CardHand cards={cards} onCardClick={handleCardClick} />

          {/* Deal/Draw button */}
          <div className="flex justify-center mt-4 mb-4">
            <Button
              variant="outline"
              className="bg-gray-800 text-white hover:bg-gray-700 border-gray-600"
              onClick={handleDeal}
            >
              {isDealt ? "Draw" : "Deal"}
            </Button>
          </div>

          {/* Bet controls */}
          <div className="flex justify-between items-center bg-green-900 p-4 rounded-lg">
            <div className="flex-1">
              <h3 className="text-white mb-2">Bet Controls</h3>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 text-white"
                  onClick={decreaseBet}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>

                <div className="bg-gray-800 text-white px-4 py-1 rounded-md min-w-16 text-center">
                  {bet}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 text-white"
                  onClick={increaseBet}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-2"
                  onClick={maxBet}
                >
                  Max Bet
                </Button>
              </div>
            </div>

            <div className="flex-1 flex justify-end items-center">
              <div className="mr-4">
                <h3 className="text-white">Credits</h3>
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl mr-2">💰</span>
                  <span className="text-white">{credits}</span>
                </div>
              </div>

              <Button
                variant="default"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={handleDeal}
              >
                Deal
              </Button>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center text-white text-sm mt-4">
            <p>Select cards to hold before drawing. Good luck!</p>
          </div>
        </div>

        {/* Payout table */}
        <div className="w-64">
          <PayoutTable gameMode={gameMode} currentBet={bet} />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
