import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PayoutTableProps {
  gameMode?: "regular" | "jokers-wild" | "deuces-wild";
  currentBet?: number;
  highlightedHand?: string | null;
}

const PayoutTable = ({
  gameMode = "regular",
  currentBet = 1,
  highlightedHand = null,
}: PayoutTableProps) => {
  // Define payout multipliers for different game modes
  const payouts = {
    regular: {
      "Royal Flush": 800,
      "Straight Flush": 50,
      "Four of a Kind": 25,
      "Full House": 9,
      Flush: 6,
      Straight: 4,
      "Three of a Kind": 3,
      "Two Pair": 2,
      "Jacks or Better": 1,
    },
    "jokers-wild": {
      "Royal Flush": 1000,
      "Five of a Kind": 200,
      "Straight Flush": 50,
      "Four of a Kind": 20,
      "Full House": 7,
      Flush: 5,
      Straight: 3,
      "Three of a Kind": 2,
      "Two Pair": 1,
    },
    "deuces-wild": {
      "Natural Royal Flush": 800,
      "Four Deuces": 200,
      "Wild Royal Flush": 25,
      "Five of a Kind": 15,
      "Straight Flush": 9,
      "Four of a Kind": 5,
      "Full House": 3,
      Flush: 2,
      Straight: 2,
      "Three of a Kind": 1,
    },
  };

  const currentPayouts = payouts[gameMode];

  return (
    <Card className="bg-green-800 border-yellow-500 border-2 text-white w-full max-w-xs">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-yellow-400 text-lg">
          {gameMode === "regular"
            ? "Regular 5 Card Draw"
            : gameMode === "jokers-wild"
              ? "Joker's Wild"
              : "Deuces Wild"}{" "}
          Payouts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div className="font-semibold text-yellow-200">Hand</div>
          <div className="font-semibold text-yellow-200 text-right">Payout</div>

          {Object.entries(currentPayouts).map(([hand, multiplier]) => (
            <React.Fragment key={hand}>
              <div
                className={cn(
                  "text-left",
                  highlightedHand === hand
                    ? "bg-yellow-600 text-white font-bold rounded px-1"
                    : "",
                )}
              >
                {hand}
              </div>
              <div
                className={cn(
                  "text-right",
                  highlightedHand === hand
                    ? "bg-yellow-600 text-white font-bold rounded px-1"
                    : "",
                )}
              >
                {(multiplier as number) * currentBet}
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayoutTable;
