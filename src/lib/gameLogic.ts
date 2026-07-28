import { Card, Suit, Value, GameMode, PayoutTable } from "@/types/game";

// Create a standard 52-card deck
export const createDeck = (includeJokers = false): Card[] => {
  const suits: Suit[] = ["hearts", "diamonds", "clubs", "spades"];
  const values: Value[] = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const deck: Card[] = [];

  suits.forEach(suit => {
    values.forEach(value => {
      deck.push({
        suit,
        value,
        isHeld: false,
        isDealt: false,
        id: `${suit}-${value}`
      });
    });
  });

  // Add jokers for Joker's Wild mode
  if (includeJokers) {
    deck.push({
      suit: "hearts", // Jokers don't have a real suit
      value: "JOKER",
      isHeld: false,
      isDealt: false,
      id: "joker-1"
    });
  }

  return deck;
};

// Shuffle deck using Fisher-Yates algorithm
export const shuffleDeck = (deck: Card[]): Card[] => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Deal cards from deck
export const dealCards = (deck: Card[], count: number): { hand: Card[], remainingDeck: Card[] } => {
  const hand = deck.slice(0, count).map(card => ({ ...card, isDealt: true }));
  const remainingDeck = deck.slice(count);
  return { hand, remainingDeck };
};

// Get numeric value for card (for hand evaluation)
export const getCardValue = (card: Card): number => {
  if (card.value === "JOKER") return 0; // Jokers are handled separately
  if (card.value === "A") return 14; // Ace high
  if (card.value === "K") return 13;
  if (card.value === "Q") return 12;
  if (card.value === "J") return 11;
  return parseInt(card.value);
};

// Check if card is wild based on game mode
export const isWildCard = (card: Card, gameMode: GameMode): boolean => {
  if (gameMode === "jokers" && card.value === "JOKER") return true;
  if (gameMode === "deuces" && card.value === "2") return true;
  return false;
};

// Count wild cards in hand
export const countWildCards = (hand: Card[], gameMode: GameMode): number => {
  return hand.filter(card => isWildCard(card, gameMode)).length;
};

// Get payout tables for different game modes
export const getPayoutTable = (gameMode: GameMode): PayoutTable => {
  switch (gameMode) {
    case "regular":
      return {
        "royal-flush": 800,
        "straight-flush": 50,
        "four-of-a-kind": 25,
        "full-house": 9,
        "flush": 6,
        "straight": 4,
        "three-of-a-kind": 3,
        "two-pair": 2,
        "jacks-or-better": 1
      };
    case "jokers":
      return {
        "royal-flush": 1000,
        "five-of-a-kind": 200,
        "straight-flush": 50,
        "four-of-a-kind": 20,
        "full-house": 7,
        "flush": 5,
        "straight": 3,
        "three-of-a-kind": 2,
        "pair": 1
      };
    case "deuces":
      return {
        "royal-flush": 800,
        "four-deuces": 200,
        "wild-royal-flush": 25,
        "five-of-a-kind": 15,
        "straight-flush": 9,
        "four-of-a-kind": 5,
        "full-house": 3,
        "flush": 2,
        "straight": 2,
        "three-of-a-kind": 1
      };
    default:
      return {};
  }
};
