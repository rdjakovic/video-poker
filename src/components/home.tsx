import React, { useState } from "react";
import GameBoard from "./VideoPoker/GameBoard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { GameMode, GAME_MODE_DESCRIPTIONS } from "@/types/game";

const Home = () => {
  const [gameMode, setGameMode] = useState<GameMode>("regular");
  const [credits, setCredits] = useState<number>(1000);

  const handleGameModeChange = (value: string) => {
    setGameMode(value as GameMode);
  };

  const handleCreditsChange = (amount: number) => {
    setCredits((prevCredits) => prevCredits + amount);
  };

  return (
    <div className="min-h-screen bg-green-800 p-2 sm:p-4 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-4">Video Poker</h1>

      <Card className="w-full max-w-6xl bg-green-700 border-yellow-500 border-2 rounded-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="p-2 sm:p-4">
            <Tabs
              defaultValue="regular"
              onValueChange={handleGameModeChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-2 bg-green-600">
                <TabsTrigger
                  value="regular"
                  className="text-sm data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=inactive]:text-green-100 data-[state=inactive]:hover:text-white"
                >
                  Regular 5 Card Draw
                </TabsTrigger>
                <TabsTrigger
                  value="jokers"
                  className="text-sm data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=inactive]:text-green-100 data-[state=inactive]:hover:text-white"
                >
                  Joker's Wild
                </TabsTrigger>
                <TabsTrigger
                  value="deuces"
                  className="text-sm data-[state=active]:bg-white data-[state=active]:text-green-800 data-[state=inactive]:text-green-100 data-[state=inactive]:hover:text-white"
                >
                  Deuces Wild
                </TabsTrigger>
              </TabsList>

              {/* Game mode description */}
              <div className="text-center text-yellow-200 mb-4 text-sm italic">
                {GAME_MODE_DESCRIPTIONS[gameMode]}
              </div>

              <TabsContent value="regular">
                <GameBoard
                  gameMode="regular"
                  initialCredits={credits}
                  onCreditsChange={handleCreditsChange}
                />
              </TabsContent>

              <TabsContent value="jokers">
                <GameBoard
                  gameMode="jokers"
                  initialCredits={credits}
                  onCreditsChange={handleCreditsChange}
                />
              </TabsContent>

              <TabsContent value="deuces">
                <GameBoard
                  gameMode="deuces"
                  initialCredits={credits}
                  onCreditsChange={handleCreditsChange}
                />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
