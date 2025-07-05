import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandEvaluation } from "@/types/game";
import { motion, AnimatePresence } from "framer-motion";

interface WinNotificationProps {
  handEvaluation: HandEvaluation | null;
  isVisible: boolean;
  onNewGame?: () => void;
}

const WinNotification: React.FC<WinNotificationProps> = ({
  handEvaluation,
  isVisible,
  onNewGame,
}) => {
  if (!handEvaluation || !isVisible) return null;

  return (
    <AnimatePresence>
      {handEvaluation.isWinning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <Card className="bg-gradient-to-r from-yellow-400 to-yellow-600 border-4 border-yellow-300 shadow-2xl">
            <CardContent className="p-6 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-6xl mb-4"
              >
                🎉
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="text-3xl font-bold text-black mb-2"
              >
                WINNER!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-xl font-semibold text-black mb-2"
              >
                {handEvaluation.description}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="text-2xl font-bold text-green-800 mb-4"
              >
                You won {handEvaluation.payout} credits!
              </motion.p>

              {onNewGame && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.3 }}
                >
                  <Button
                    variant="default"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2"
                    onClick={onNewGame}
                  >
                    New Game
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WinNotification;
