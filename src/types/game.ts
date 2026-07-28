export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Value = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "JOKER";

export interface Card {
  suit: Suit;
  value: Value;
  isHeld: boolean;
  isDealt: boolean;
  id: string;
}

export type GameMode = "regular" | "jokers" | "deuces";

export type GamePhase = "betting" | "dealt" | "drawing" | "complete";

export type HandRank =
  | "high-card"
  | "pair"
  | "two-pair"
  | "three-of-a-kind"
  | "straight"
  | "flush"
  | "full-house"
  | "four-of-a-kind"
  | "straight-flush"
  | "royal-flush"
  | "five-of-a-kind"
  | "jacks-or-better";

export interface HandEvaluation {
  rank: HandRank;
  payout: number;
  isWinning: boolean;
  winningCardIndices?: number[]; // Indices of cards that contribute to the winning hand
}

export interface GameState {
  credits: number;
  bet: number;
  phase: GamePhase;
  mode: GameMode;
  hand: Card[];
  deck: Card[];
  lastHandEvaluation: HandEvaluation | null;
  totalWinnings: number;
}

export interface PayoutTable {
  [key: string]: number;
}

export const MIN_BET = 5;
export const MAX_BET = 100;
export const BET_INCREMENT = 5;
