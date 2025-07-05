import { useState, useCallback } from "react";
import { GameState, GameMode, GamePhase, Card, HandEvaluation, MIN_BET, MAX_BET, BET_INCREMENT } from "@/types/game";
import { createDeck, shuffleDeck, dealCards } from "@/lib/gameLogic";
import { evaluateHand } from "@/lib/handEvaluator";

const createInitialGameState = (mode: GameMode, initialCredits: number): GameState => ({
  credits: initialCredits,
  bet: MIN_BET,
  phase: "betting",
  mode,
  hand: [],
  deck: [],
  lastHandEvaluation: null,
  totalWinnings: 0,
});

export const useVideoPoker = (initialCredits: number = 1000) => {
  const [gameState, setGameState] = useState<GameState>(
    createInitialGameState("regular", initialCredits)
  );

  // Change game mode
  const changeGameMode = useCallback((mode: GameMode) => {
    setGameState(prev => ({
      ...createInitialGameState(mode, prev.credits),
      totalWinnings: prev.totalWinnings,
    }));
  }, []);

  // Adjust bet amount
  const adjustBet = useCallback((amount: number) => {
    setGameState(prev => {
      if (prev.phase !== "betting") return prev;
      
      const newBet = Math.max(MIN_BET, Math.min(MAX_BET, amount));
      return {
        ...prev,
        bet: newBet,
      };
    });
  }, []);

  const increaseBet = useCallback(() => {
    setGameState(prev => {
      if (prev.phase !== "betting") return prev;
      
      const newBet = Math.min(MAX_BET, prev.bet + BET_INCREMENT);
      return {
        ...prev,
        bet: newBet,
      };
    });
  }, []);

  const decreaseBet = useCallback(() => {
    setGameState(prev => {
      if (prev.phase !== "betting") return prev;
      
      const newBet = Math.max(MIN_BET, prev.bet - BET_INCREMENT);
      return {
        ...prev,
        bet: newBet,
      };
    });
  }, []);

  const setMaxBet = useCallback(() => {
    setGameState(prev => {
      if (prev.phase !== "betting") return prev;
      
      return {
        ...prev,
        bet: MAX_BET,
      };
    });
  }, []);

  // Deal initial hand
  const dealHand = useCallback(() => {
    setGameState(prev => {
      if (prev.phase !== "betting" || prev.credits < prev.bet) return prev;

      const includeJokers = prev.mode === "jokers";
      const newDeck = shuffleDeck(createDeck(includeJokers));
      const { hand, remainingDeck } = dealCards(newDeck, 5);

      return {
        ...prev,
        credits: prev.credits - prev.bet,
        phase: "dealt",
        hand,
        deck: remainingDeck,
        lastHandEvaluation: null,
      };
    });
  }, []);

  // Toggle hold status of a card
  const toggleHold = useCallback((cardIndex: number) => {
    setGameState(prev => {
      if (prev.phase !== "dealt" || cardIndex < 0 || cardIndex >= prev.hand.length) {
        return prev;
      }

      const newHand = [...prev.hand];
      newHand[cardIndex] = {
        ...newHand[cardIndex],
        isHeld: !newHand[cardIndex].isHeld,
      };

      return {
        ...prev,
        hand: newHand,
      };
    });
  }, []);

  // Draw replacement cards
  const drawCards = useCallback(() => {
    setGameState(prev => {
      if (prev.phase !== "dealt") return prev;

      let newDeck = [...prev.deck];
      const newHand = [...prev.hand];
      
      // Replace non-held cards
      for (let i = 0; i < newHand.length; i++) {
        if (!newHand[i].isHeld && newDeck.length > 0) {
          newHand[i] = {
            ...newDeck[0],
            isDealt: true,
            isHeld: false,
          };
          newDeck = newDeck.slice(1);
        }
      }

      // Evaluate the final hand
      const handEvaluation = evaluateHand(newHand, prev.mode, prev.bet);
      const newCredits = prev.credits + handEvaluation.payout;
      const newTotalWinnings = prev.totalWinnings + handEvaluation.payout;

      return {
        ...prev,
        phase: "complete",
        hand: newHand,
        deck: newDeck,
        credits: newCredits,
        totalWinnings: newTotalWinnings,
        lastHandEvaluation: handEvaluation,
      };
    });
  }, []);

  // Start new game
  const newGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      phase: "betting",
      hand: [],
      deck: [],
      lastHandEvaluation: null,
    }));
  }, []);

  // Add credits (for when player runs low)
  const addCredits = useCallback((amount: number) => {
    setGameState(prev => ({
      ...prev,
      credits: prev.credits + amount,
    }));
  }, []);

  // Check if player can afford current bet
  const canAffordBet = gameState.credits >= gameState.bet;

  // Check if game is in progress
  const isGameInProgress = gameState.phase === "dealt" || gameState.phase === "drawing";

  return {
    gameState,
    actions: {
      changeGameMode,
      adjustBet,
      increaseBet,
      decreaseBet,
      setMaxBet,
      dealHand,
      toggleHold,
      drawCards,
      newGame,
      addCredits,
    },
    computed: {
      canAffordBet,
      isGameInProgress,
    },
  };
};
