import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Plus, Coins } from "lucide-react";

interface CreditsManagerProps {
  currentCredits: number;
  onAddCredits: (amount: number) => void;
  minBet: number;
}

const CreditsManager: React.FC<CreditsManagerProps> = ({
  currentCredits,
  onAddCredits,
  minBet,
}) => {
  const [customAmount, setCustomAmount] = useState<string>("100");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isLowOnCredits = currentCredits < minBet * 5; // Less than 5 bets remaining
  const cannotAffordBet = currentCredits < minBet;

  const predefinedAmounts = [50, 100, 250, 500, 1000];

  const handleAddCredits = (amount: number) => {
    onAddCredits(amount);
    setIsDialogOpen(false);
  };

  const handleCustomAdd = () => {
    const amount = parseInt(customAmount);
    if (amount > 0 && amount <= 10000) {
      handleAddCredits(amount);
    }
  };

  if (cannotAffordBet) {
    return (
      <Card className="bg-red-800 border-red-600 border-2 text-white">
        <CardContent className="p-4 text-center">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-300" />
          <h3 className="text-lg font-bold mb-2">Out of Credits!</h3>
          <p className="text-sm mb-4">
            You need at least {minBet} credits to place a bet.
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Credits
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-green-800 text-white border-yellow-500">
              <DialogHeader>
                <DialogTitle className="text-yellow-400">Add Credits</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {predefinedAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      className="bg-green-700 text-white border-green-600 hover:bg-green-600"
                      onClick={() => handleAddCredits(amount)}
                    >
                      <Coins className="w-4 h-4 mr-2" />
                      {amount}
                    </Button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-amount">Custom Amount (1-10,000)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="custom-amount"
                      type="number"
                      min="1"
                      max="10000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="bg-green-700 text-white border-green-600"
                    />
                    <Button
                      variant="default"
                      className="bg-yellow-500 hover:bg-yellow-600 text-black"
                      onClick={handleCustomAdd}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  }

  if (isLowOnCredits) {
    return (
      <Card className="bg-yellow-800 border-yellow-600 border-2 text-white">
        <CardContent className="p-3 text-center">
          <AlertCircle className="w-6 h-6 mx-auto mb-1 text-yellow-300" />
          <p className="text-sm mb-2">Running low on credits!</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="bg-yellow-700 text-white border-yellow-600 hover:bg-yellow-600">
                <Plus className="w-3 h-3 mr-1" />
                Add More
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-green-800 text-white border-yellow-500">
              <DialogHeader>
                <DialogTitle className="text-yellow-400">Add Credits</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {predefinedAmounts.map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      className="bg-green-700 text-white border-green-600 hover:bg-green-600"
                      onClick={() => handleAddCredits(amount)}
                    >
                      <Coins className="w-4 h-4 mr-2" />
                      {amount}
                    </Button>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-amount">Custom Amount (1-10,000)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="custom-amount"
                      type="number"
                      min="1"
                      max="10000"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="bg-green-700 text-white border-green-600"
                    />
                    <Button
                      variant="default"
                      className="bg-yellow-500 hover:bg-yellow-600 text-black"
                      onClick={handleCustomAdd}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default CreditsManager;
