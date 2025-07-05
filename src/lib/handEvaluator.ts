import { Card, GameMode, HandRank, HandEvaluation } from "@/types/game";
import { getCardValue, isWildCard, countWildCards, getPayoutTable, getHandDescription } from "./gameLogic";

// Sort cards by value for easier evaluation
const sortCardsByValue = (cards: Card[]): Card[] => {
  return [...cards].sort((a, b) => getCardValue(a) - getCardValue(b));
};

// Count occurrences of each card value
const getValueCounts = (cards: Card[], gameMode: GameMode): Map<number, number> => {
  const counts = new Map<number, number>();
  const wildCount = countWildCards(cards, gameMode);

  cards.forEach(card => {
    if (!isWildCard(card, gameMode)) {
      const value = getCardValue(card);
      counts.set(value, (counts.get(value) || 0) + 1);
    }
  });

  return counts;
};

// Check for flush
const isFlush = (cards: Card[], gameMode: GameMode): boolean => {
  const nonWildCards = cards.filter(card => !isWildCard(card, gameMode));
  if (nonWildCards.length === 0) return true; // All wild cards

  const firstSuit = nonWildCards[0].suit;
  return nonWildCards.every(card => card.suit === firstSuit);
};

// Check for straight
const isStraight = (cards: Card[], gameMode: GameMode): boolean => {
  const wildCount = countWildCards(cards, gameMode);
  const nonWildValues = cards
    .filter(card => !isWildCard(card, gameMode))
    .map(card => getCardValue(card))
    .sort((a, b) => a - b);

  if (nonWildValues.length === 0) return true; // All wild cards

  // Remove duplicates
  const uniqueValues = [...new Set(nonWildValues)];

  // Special case: Check for A-2-3-4-5 straight (wheel)
  const wheelValues = [14, 2, 3, 4, 5]; // A, 2, 3, 4, 5
  const hasWheelCards = wheelValues.filter(val => uniqueValues.includes(val));
  if (hasWheelCards.length + wildCount >= 5) {
    const missingWheelCards = wheelValues.filter(val => !uniqueValues.includes(val));
    if (missingWheelCards.length <= wildCount) return true;
  }

  // Check if we can make a straight with wild cards
  const minValue = uniqueValues[0];
  const maxValue = uniqueValues[uniqueValues.length - 1];
  const neededCards = maxValue - minValue + 1 - uniqueValues.length;

  return neededCards <= wildCount && (maxValue - minValue) <= 4;
};

// Check for royal flush (A, K, Q, J, 10 of same suit)
const isRoyalFlush = (cards: Card[], gameMode: GameMode): boolean => {
  if (!isFlush(cards, gameMode)) return false;

  const wildCount = countWildCards(cards, gameMode);
  const nonWildValues = cards
    .filter(card => !isWildCard(card, gameMode))
    .map(card => getCardValue(card))
    .sort((a, b) => b - a);

  const royalValues = [14, 13, 12, 11, 10]; // A, K, Q, J, 10
  const hasRoyalCards = royalValues.filter(val => nonWildValues.includes(val));
  const missingRoyalCards = royalValues.filter(val => !nonWildValues.includes(val));

  // Need at least the royal values and enough wild cards to fill gaps
  return hasRoyalCards.length + wildCount >= 5 && missingRoyalCards.length <= wildCount;
};

// Evaluate poker hand
export const evaluateHand = (cards: Card[], gameMode: GameMode, bet: number): HandEvaluation => {
  if (cards.length !== 5) {
    return {
      rank: "high-card",
      description: "Invalid Hand",
      payout: 0,
      isWinning: false
    };
  }

  const wildCount = countWildCards(cards, gameMode);
  const valueCounts = getValueCounts(cards, gameMode);
  const countValues = Array.from(valueCounts.values()).sort((a, b) => b - a);
  const payoutTable = getPayoutTable(gameMode);

  let rank: HandRank = "high-card";
  let payout = 0;

  // Special case: Four deuces in Deuces Wild
  if (gameMode === "deuces" && wildCount === 4) {
    rank = "four-of-a-kind"; // Treated as special "four deuces"
    payout = (payoutTable["four-deuces"] || 0) * bet;
  }
  // Five of a kind (only possible with wild cards)
  else if (wildCount > 0 && countValues.length > 0 && countValues[0] + wildCount >= 5) {
    rank = "five-of-a-kind";
    payout = (payoutTable["five-of-a-kind"] || 0) * bet;
  }
  // Natural royal flush (no wild cards)
  else if (wildCount === 0 && isRoyalFlush(cards, gameMode)) {
    rank = "royal-flush";
    payout = (payoutTable["royal-flush"] || 0) * bet;
  }
  // Wild royal flush (with wild cards)
  else if (wildCount > 0 && isRoyalFlush(cards, gameMode)) {
    rank = "royal-flush";
    const wildRoyalPayout = payoutTable["wild-royal-flush"] || payoutTable["royal-flush"] || 0;
    payout = wildRoyalPayout * bet;
  }
  // Straight flush (but not royal)
  else if (isFlush(cards, gameMode) && isStraight(cards, gameMode)) {
    rank = "straight-flush";
    payout = (payoutTable["straight-flush"] || 0) * bet;
  }
  // Four of a kind
  else if (countValues.length > 0 && countValues[0] + wildCount >= 4) {
    rank = "four-of-a-kind";
    payout = (payoutTable["four-of-a-kind"] || 0) * bet;
  }
  // Full house
  else if (countValues.length >= 2 && countValues[0] + countValues[1] + wildCount >= 5 &&
           countValues[0] + wildCount >= 3) {
    rank = "full-house";
    payout = (payoutTable["full-house"] || 0) * bet;
  }
  // Flush
  else if (isFlush(cards, gameMode)) {
    rank = "flush";
    payout = (payoutTable["flush"] || 0) * bet;
  }
  // Straight
  else if (isStraight(cards, gameMode)) {
    rank = "straight";
    payout = (payoutTable["straight"] || 0) * bet;
  }
  // Three of a kind
  else if (countValues.length > 0 && countValues[0] + wildCount >= 3) {
    rank = "three-of-a-kind";
    payout = (payoutTable["three-of-a-kind"] || 0) * bet;
  }
  // Two pair
  else if (countValues.length >= 2 && countValues[0] + countValues[1] + wildCount >= 4) {
    rank = "two-pair";
    payout = (payoutTable["two-pair"] || 0) * bet;
  }
  // Jacks or better (for regular mode)
  else if (gameMode === "regular" && countValues.length > 0) {
    const highPairValues = Array.from(valueCounts.keys()).filter(val => val >= 11); // J, Q, K, A
    if (highPairValues.length > 0 && countValues[0] + wildCount >= 2) {
      rank = "jacks-or-better";
      payout = (payoutTable["jacks-or-better"] || 0) * bet;
    }
  }
  // Any pair (for wild card games)
  else if ((gameMode === "jokers" || gameMode === "deuces") && countValues.length > 0 && countValues[0] + wildCount >= 2) {
    rank = "pair";
    payout = (payoutTable["pair"] || 0) * bet;
  }

  return {
    rank,
    description: getHandDescription(rank),
    payout,
    isWinning: payout > 0
  };
};
