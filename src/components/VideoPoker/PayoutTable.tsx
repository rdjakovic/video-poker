import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GameMode, HandRank } from "@/types/game";
import { getPayoutTable } from "@/lib/gameLogic";
import { useLanguage } from "@/i18n/useLanguage";

interface PayoutTableProps {
  gameMode?: GameMode;
  currentBet?: number;
  highlightedHand?: HandRank | null;
}

const GAME_MODE_TITLE_KEYS = {
  regular: "gameModeRegular",
  jokers: "gameModeJokers",
  deuces: "gameModeDeuces",
} as const;

const PayoutTable = ({
  gameMode = "regular",
  currentBet = 1,
  highlightedHand = null,
}: PayoutTableProps) => {
  const { t, tHandRank } = useLanguage();
  const payoutTable = getPayoutTable(gameMode);

  return (
    <Card className="bg-green-800 border-yellow-500 border-2 text-white w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-yellow-400 text-base sm:text-lg">
          {t("payoutTableTitle", { mode: t(GAME_MODE_TITLE_KEYS[gameMode]) })}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">
        <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
          <div className="font-semibold text-yellow-200">{t("payoutTableHand")}</div>
          <div className="font-semibold text-yellow-200 text-right">{t("payoutTablePayout")}</div>

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
                {tHandRank(rank)}
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
