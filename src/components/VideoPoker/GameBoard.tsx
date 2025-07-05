import React from "react";
import { Button } from "@/components/ui/button";
import CardHand from "./CardHand";
import PayoutTable from "./PayoutTable";
import WinNotification from "./WinNotification";
import CreditsManager from "./CreditsManager";
import GameStatus from "./GameStatus";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useVideoPoker } from "@/hooks/useVideoPoker";
import { GameMode } from "@/types/game";
import { motion } from "framer-motion";

interface GameBoardProps {
  initialCredits?: number;
  gameMode?: GameMode;
  onCreditsChange?: (amount: number) => void;
}

const GameBoard = ({
  initialCredits = 1000,
  gameMode = "regular",
  onCreditsChange
}: GameBoardProps) => {
  const { gameState, actions, computed } = useVideoPoker(initialCredits);

  // Sync with parent component's game mode if provided
  React.useEffect(() => {
    if (gameMode !== gameState.mode) {
      actions.changeGameMode(gameMode);
    }
  }, [gameMode, gameState.mode, actions]);

  // Notify parent of credits changes
  React.useEffect(() => {
    if (onCreditsChange) {
      onCreditsChange(gameState.credits - initialCredits);
    }
  }, [gameState.credits, initialCredits, onCreditsChange]);

  const handleNewGame = () => {
    actions.newGame();
  };

  const handleDeal = () => {
    if (gameState.phase === "betting") {
      actions.dealHand();
    } else if (gameState.phase === "dealt") {
      actions.drawCards();
    }
  };

  const getInstructionText = () => {
    switch (gameState.phase) {
      case "betting":
        return "Place your bet and deal cards!";
      case "dealt":
        return "Select cards to hold before drawing. Good luck!";
      case "complete":
        return gameState.lastHandEvaluation?.isWinning
          ? `${gameState.lastHandEvaluation.description} - You won ${gameState.lastHandEvaluation.payout} credits!`
          : "Better luck next time!";
      default:
        return "Place your bet and deal cards!";
    }
  };

  return (
    <div className="flex flex-col items-center w-full mx-auto bg-green-800 p-3 sm:p-6 rounded-lg shadow-lg relative">


      {/* Credits display */}
      <div className="self-end mb-2">
        <div className="bg-green-700 border-2 border-yellow-400 rounded-lg px-4 py-2 shadow-lg">
          <span className="text-yellow-400 font-bold text-lg sm:text-xl">
            Credits: <span className="text-white">{gameState.credits}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full gap-4">
        <div className="flex-1 bg-green-700 border-2 border-yellow-500 rounded-lg p-3 sm:p-4">
          {/* Credits Manager */}
          <div className="mb-4">
            <CreditsManager
              currentCredits={gameState.credits}
              onAddCredits={actions.addCredits}
              minBet={gameState.bet}
            />
          </div>

          {/* Game Status */}
          <div className="mb-4">
            <GameStatus
              phase={gameState.phase}
              handEvaluation={gameState.lastHandEvaluation}
              credits={gameState.credits}
              bet={gameState.bet}
            />
          </div>

          {/* Card display */}
          <CardHand
            cards={gameState.hand}
            onCardClick={actions.toggleHold}
            canHold={gameState.phase === "dealt"}
            showBacks={gameState.phase === "betting"}
          />

          {/* Auto-play logic for Draw only */}
          {gameState.phase === "dealt" && (
            <div className="flex justify-center mt-4 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <Button
                  variant="outline"
                  className="bg-purple-600 text-white hover:bg-purple-700 border-purple-500 text-lg px-8 py-3"
                  onClick={handleDeal}
                >
                  Draw Cards
                </Button>
              </motion.div>
            </div>
          )}

          {/* Bet controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center bg-green-900 p-3 sm:p-4 rounded-lg gap-4">
            <div className="flex-1 w-full sm:w-auto">
              <h3 className="text-white mb-2 text-sm sm:text-base">Bet Controls</h3>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 text-white"
                  onClick={actions.decreaseBet}
                  disabled={gameState.phase !== "betting"}
                >
                  <MinusIcon className="h-4 w-4" />
                </Button>

                <div className="bg-gray-800 text-white px-4 py-1 rounded-md min-w-16 text-center">
                  {gameState.bet}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 text-white"
                  onClick={actions.increaseBet}
                  disabled={gameState.phase !== "betting"}
                >
                  <PlusIcon className="h-4 w-4" />
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  className="ml-2"
                  onClick={actions.setMaxBet}
                  disabled={gameState.phase !== "betting"}
                >
                  Max Bet
                </Button>
              </div>
            </div>

            <div className="flex-1 flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4">
              <div className="text-center sm:text-right">
                <div className="bg-green-600 border-2 border-yellow-400 rounded-lg px-3 py-2 shadow-md">
                  <div className="flex items-center justify-center sm:justify-end">
                    <span className="text-yellow-400 text-lg sm:text-xl mr-2">💰</span>
                    <span className="text-yellow-400 font-bold text-sm sm:text-base mr-1">Credits:</span>
                    <span className="text-white font-bold text-sm sm:text-base">{gameState.credits}</span>
                  </div>
                </div>
              </div>

              {/* Deal Cards button for betting phase */}
              {gameState.phase === "betting" && (
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2"
                  onClick={handleDeal}
                  disabled={!computed.canAffordBet}
                >
                  Deal Cards
                </Button>
              )}

              {/* New Game button for complete phase */}
              {gameState.phase === "complete" && (
                <Button
                  variant="default"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-4 py-2"
                  onClick={handleNewGame}
                >
                  New Game
                </Button>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="text-center text-white text-sm mt-4">
            <p>{getInstructionText()}</p>
          </div>
        </div>

        {/* Payout table */}
        <div className="w-full lg:w-64 lg:flex-shrink-0">
          <PayoutTable
            gameMode={gameState.mode}
            currentBet={gameState.bet}
            highlightedHand={gameState.lastHandEvaluation?.rank || null}
          />

          {/* Win Notification below payout table */}
          <WinNotification
            handEvaluation={gameState.lastHandEvaluation}
            isVisible={gameState.phase === "complete"}
            onNewGame={handleNewGame}
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
