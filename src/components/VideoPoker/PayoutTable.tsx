import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GameMode, HandRank } from "@/types/game";
import { getPayoutTable } from "@/lib/gameLogic";

interface PayoutTableProps {
  gameMode?: GameMode;
  currentBet?: number;
  highlightedHand?: HandRank | null;
}

const PayoutTable = ({
  gameMode = "regular",
  currentBet = 1,
  highlightedHand = null,
}: PayoutTableProps) => {
  const payoutTable = getPayoutTable(gameMode);

  // Convert internal hand ranks to display names
  const getDisplayName = (rank: string): string => {
    const displayNames: Record<string, string> = {
      "royal-flush": "Royal Flush",
      "straight-flush": "Straight Flush",
      "four-of-a-kind": "Four of a Kind",
      "full-house": "Full House",
      "flush": "Flush",
      "straight": "Straight",
      "three-of-a-kind": "Three of a Kind",
      "two-pair": "Two Pair",
      "jacks-or-better": "Jacks or Better",
      "pair": "Any Pair",
      "five-of-a-kind": "Five of a Kind",
      "four-deuces": "Four Deuces",
      "wild-royal-flush": "Wild Royal Flush"
    };
    return displayNames[rank] || rank;
  };

  const getGameModeTitle = (mode: GameMode): string => {
    switch (mode) {
      case "regular":
        return "Regular 5 Card Draw";
      case "jokers":
        return "Joker's Wild";
      case "deuces":
        return "Deuces Wild";
      default:
        return "Video Poker";
    }
  };

  return (
    <Card className="bg-green-800 border-yellow-500 border-2 text-white w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-yellow-400 text-base sm:text-lg">
          {getGameModeTitle(gameMode)} Payouts
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
          <div className="font-semibold text-yellow-200">Hand</div>
          <div className="font-semibold text-yellow-200 text-right">Payout</div>

          {Object.entries(payoutTable).map(([rank, multiplier]) => (
            <React.Fragment key={rank}>
              <div
                className={cn(
                  "text-left",
                  highlightedHand === rank
                    ? "bg-yellow-600 text-white font-bold rounded px-1"
                    : "",
                )}
              >
                {getDisplayName(rank)}
              </div>
              <div
                className={cn(
                  "text-right",
                  highlightedHand === rank
                    ? "bg-yellow-600 text-white font-bold rounded px-1"
                    : "",
                )}
              >
                {multiplier * currentBet}
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PayoutTable;
