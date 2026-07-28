import React from "react";
import { motion } from "framer-motion";
import { GamePhase, HandEvaluation } from "@/types/game";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Target, Trophy, RefreshCw } from "lucide-react";

interface GameStatusProps {
  phase: GamePhase;
  handEvaluation: HandEvaluation | null;
  credits: number;
  bet: number;
}

const GameStatus: React.FC<GameStatusProps> = ({
  phase,
  handEvaluation,
  credits,
  bet,
}) => {
  const getStatusContent = () => {
    switch (phase) {
      case "betting":
        return {
          icon: <Target className="w-6 h-6" />,
          title: "Place Your Bet",
          message: "Choose your bet amount and deal the cards!",
          color: "bg-blue-600",
          textColor: "text-blue-100"
        };
      case "dealt":
        return {
          icon: <Sparkles className="w-6 h-6" />,
          title: "Select Cards to Hold",
          message: "Click on cards you want to keep, then draw!",
          color: "bg-purple-600",
          textColor: "text-purple-100"
        };
      case "complete":
        if (handEvaluation?.isWinning) {
          return {
            icon: <Trophy className="w-6 h-6" />,
            title: "Winner!",
            message: `${handEvaluation.description} - Won ${handEvaluation.payout} credits!`,
            color: "bg-green-600",
            textColor: "text-green-100"
          };
        } else {
          return {
            icon: <RefreshCw className="w-6 h-6" />,
            title: "Try Again",
            message: "Better luck next time! Ready for another hand?",
            color: "bg-gray-600",
            textColor: "text-gray-100"
          };
        }
      default:
        return {
          icon: <Target className="w-6 h-6" />,
          title: "Video Poker",
          message: "Ready to play!",
          color: "bg-blue-600",
          textColor: "text-blue-100"
        };
    }
  };

  const status = getStatusContent();

  return (
    <motion.div
      key={phase}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className={`${status.color} border-2 border-opacity-50 border-white`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-center space-x-3">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: phase === "complete" && handEvaluation?.isWinning ? 360 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className={status.textColor}
            >
              {status.icon}
            </motion.div>

            <div className="text-center">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className={`font-bold text-lg ${status.textColor}`}
              >
                {status.title}
              </motion.h3>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className={`text-sm ${status.textColor} opacity-90`}
              >
                {status.message}
              </motion.p>
            </div>
          </div>

          {/* Game stats */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className={`flex justify-between mt-3 pt-3 border-t border-white border-opacity-20 text-sm ${status.textColor}`}
          >
            <span>Credits: {credits}</span>
            <span>Current Bet: {bet}</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GameStatus;
