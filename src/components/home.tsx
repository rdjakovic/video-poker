import GameBoard from "./VideoPoker/GameBoard";
import LanguageSwitcher from "./LanguageSwitcher";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { GameMode } from "@/types/game";
import { useVideoPoker } from "@/hooks/useVideoPoker";
import { useLanguage } from "@/i18n/useLanguage";

const TAB_LABEL_KEYS = {
  regular: "tabRegular",
  jokers: "tabJokers",
  deuces: "tabDeuces",
} as const;

const MODE_DESCRIPTION_KEYS = {
  regular: "modeDescriptionRegular",
  jokers: "modeDescriptionJokers",
  deuces: "modeDescriptionDeuces",
} as const;

const Home = () => {
  const { gameState, actions, computed } = useVideoPoker(1000);
  const { t } = useLanguage();

  const handleGameModeChange = (value: string) => {
    actions.changeGameMode(value as GameMode);
  };

  return (
    <div className="min-h-screen bg-green-800 p-2 sm:p-4 flex flex-col items-center">
      <div className="w-full max-w-6xl flex items-center justify-between mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 flex-1 text-center">
          {t("title")}
        </h1>
        <LanguageSwitcher />
      </div>

      <Card className="w-full max-w-6xl bg-green-700 border-yellow-500 border-2 rounded-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="p-2 sm:p-4">
            <Tabs
              value={gameState.mode}
              onValueChange={handleGameModeChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-2 bg-green-600">
                <TabsTrigger
                  value="regular"
                  disabled={gameState.phase === "dealt"}
                  className="text-sm data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=inactive]:text-green-100 data-[state=inactive]:hover:text-white"
                >
                  {t(TAB_LABEL_KEYS.regular)}
                </TabsTrigger>
                <TabsTrigger
                  value="jokers"
                  disabled={gameState.phase === "dealt"}
                  className="text-sm data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=inactive]:text-green-100 data-[state=inactive]:hover:text-white"
                >
                  {t(TAB_LABEL_KEYS.jokers)}
                </TabsTrigger>
                <TabsTrigger
                  value="deuces"
                  disabled={gameState.phase === "dealt"}
                  className="text-sm data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=inactive]:text-green-100 data-[state=inactive]:hover:text-white"
                >
                  {t(TAB_LABEL_KEYS.deuces)}
                </TabsTrigger>
              </TabsList>

              {/* Game mode description */}
              <div className="text-center text-yellow-200 mb-4 text-sm italic">
                {t(MODE_DESCRIPTION_KEYS[gameState.mode])}
              </div>
            </Tabs>

            <GameBoard gameState={gameState} actions={actions} computed={computed} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
