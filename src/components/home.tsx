import React, { useState } from "react";
import GameBoard from "./VideoPoker/GameBoard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const [gameMode, setGameMode] = useState<"regular" | "jokers" | "deuces">(
    "regular",
  );
  const [credits, setCredits] = useState<number>(1000);

  const handleGameModeChange = (value: string) => {
    setGameMode(value as "regular" | "jokers" | "deuces");
  };

  const handleCreditsChange = (amount: number) => {
    setCredits((prevCredits) => prevCredits + amount);
  };

  return (
    <div className="min-h-screen bg-green-800 p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-4">Video Poker</h1>

      <Card className="w-full max-w-5xl bg-green-700 border-yellow-500 border-2 rounded-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="p-2">
            <Tabs
              defaultValue="regular"
              onValueChange={handleGameModeChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="regular" className="text-sm">
                  Regular 5 Card Draw
                </TabsTrigger>
                <TabsTrigger value="jokers" className="text-sm">
                  Joker's Wild
                </TabsTrigger>
                <TabsTrigger value="deuces" className="text-sm">
                  Deuces Wild
                </TabsTrigger>
              </TabsList>

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

      <div className="mt-4 text-white text-sm">
        <p>Select cards to hold before drawing. Good luck!</p>
      </div>
    </div>
  );
};

export default Home;
