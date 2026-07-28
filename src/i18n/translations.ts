export type Language = "en" | "sr";

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  sr: "Srpski",
};

const en = {
  title: "Video Poker",

  tabRegular: "Regular 5 Card Draw",
  tabJokers: "Joker's Wild",
  tabDeuces: "Deuces Wild",

  modeDescriptionRegular: "Classic video poker - pair of Jacks or higher to win!",
  modeDescriptionJokers: "Includes a wild Joker card - any pair wins!",
  modeDescriptionDeuces: "All 2s are wild cards - three of a kind minimum to win!",

  gameModeRegular: "Regular 5 Card Draw",
  gameModeJokers: "Joker's Wild",
  gameModeDeuces: "Deuces Wild",

  credits: "Credits",
  betControls: "Bet Controls",
  maxBet: "Max Bet",
  dealCards: "Deal Cards",
  drawCards: "Draw Cards",
  newGame: "New Game",
  held: "HELD",

  instructionsBetting: "Place your bet and deal cards!",
  instructionsDealt: "Select cards to hold before drawing. Good luck!",
  instructionsCompleteWin: "{hand} - You won {amount} credits!",
  instructionsCompleteLoss: "Better luck next time!",

  statusBettingTitle: "Place Your Bet",
  statusBettingMessage: "Choose your bet amount and deal the cards!",
  statusDealtTitle: "Select Cards to Hold",
  statusDealtMessage: "Click on cards you want to keep, then draw!",
  statusWinnerTitle: "Winner!",
  statusWinnerMessage: "{hand} - Won {amount} credits!",
  statusTryAgainTitle: "Try Again",
  statusTryAgainMessage: "Better luck next time! Ready for another hand?",
  statusDefaultTitle: "Video Poker",
  statusDefaultMessage: "Ready to play!",
  statusCurrentBet: "Current Bet",

  payoutTableHand: "Hand",
  payoutTablePayout: "Payout",
  payoutTableTitle: "{mode} Payouts",

  outOfCreditsTitle: "Out of Credits!",
  outOfCreditsMessage: "You need at least {minBet} credits to place a bet.",
  addCredits: "Add Credits",
  customAmountLabel: "Custom Amount (1-10,000)",
  add: "Add",
  lowOnCredits: "Running low on credits!",
  addMore: "Add More",

  winnerBanner: "WINNER!",
  wonCreditsMessage: "You won {amount} credits!",
} as const;

const sr: Record<keyof typeof en, string> = {
  title: "Video Poker",

  tabRegular: "Klasični Poker",
  tabJokers: "Divlji Džoker",
  tabDeuces: "Divlje Dvojke",

  modeDescriptionRegular: "Klasičan video poker - par žandara ili jači par za pobedu!",
  modeDescriptionJokers: "Sadrži divlju džoker kartu - bilo koji par pobeđuje!",
  modeDescriptionDeuces: "Sve dvojke su divlje karte - minimum tris za pobedu!",

  gameModeRegular: "Klasični Poker",
  gameModeJokers: "Divlji Džoker",
  gameModeDeuces: "Divlje Dvojke",

  credits: "Krediti",
  betControls: "Kontrola uloga",
  maxBet: "Maks. ulog",
  dealCards: "Podeli karte",
  drawCards: "Izvuci karte",
  newGame: "Nova igra",
  held: "ZADRŽANO",

  instructionsBetting: "Postavi ulog i podeli karte!",
  instructionsDealt: "Izaberi karte koje zadržavaš pre izvlačenja. Srećno!",
  instructionsCompleteWin: "{hand} - Osvojio si {amount} kredita!",
  instructionsCompleteLoss: "Sledeći put više sreće!",

  statusBettingTitle: "Postavi ulog",
  statusBettingMessage: "Izaberi iznos uloga i podeli karte!",
  statusDealtTitle: "Izaberi karte za zadržavanje",
  statusDealtMessage: "Klikni na karte koje želiš da zadržiš, pa izvuci!",
  statusWinnerTitle: "Pobednik!",
  statusWinnerMessage: "{hand} - Osvojeno {amount} kredita!",
  statusTryAgainTitle: "Pokušaj ponovo",
  statusTryAgainMessage: "Sledeći put više sreće! Spreman za novu ruku?",
  statusDefaultTitle: "Video Poker",
  statusDefaultMessage: "Spreman za igru!",
  statusCurrentBet: "Trenutni ulog",

  payoutTableHand: "Kombinacija",
  payoutTablePayout: "Isplata",
  payoutTableTitle: "Isplate - {mode}",

  outOfCreditsTitle: "Nema kredita!",
  outOfCreditsMessage: "Potrebno ti je najmanje {minBet} kredita da postaviš ulog.",
  addCredits: "Dodaj kredite",
  customAmountLabel: "Proizvoljan iznos (1-10.000)",
  add: "Dodaj",
  lowOnCredits: "Ostaje ti malo kredita!",
  addMore: "Dodaj još",

  winnerBanner: "POBEDA!",
  wonCreditsMessage: "Osvojio si {amount} kredita!",
};

export const translations: Record<Language, Record<keyof typeof en, string>> = { en, sr };

export type TranslationKey = keyof typeof en;

// Display names for poker hand ranks - keyed by HandRank plus a few
// payout-table-only rows (e.g. Deuces Wild's "four-deuces").
export const HAND_RANK_NAMES: Record<Language, Record<string, string>> = {
  en: {
    "high-card": "High Card",
    "pair": "Any Pair",
    "two-pair": "Two Pair",
    "three-of-a-kind": "Three of a Kind",
    "straight": "Straight",
    "flush": "Flush",
    "full-house": "Full House",
    "four-of-a-kind": "Four of a Kind",
    "straight-flush": "Straight Flush",
    "royal-flush": "Royal Flush",
    "five-of-a-kind": "Five of a Kind",
    "jacks-or-better": "Jacks or Better",
    "four-deuces": "Four Deuces",
    "wild-royal-flush": "Wild Royal Flush",
  },
  sr: {
    "high-card": "Najviša karta",
    "pair": "Bilo koji par",
    "two-pair": "Dva para",
    "three-of-a-kind": "Tris",
    "straight": "Stret",
    "flush": "Fleš",
    "full-house": "Ful",
    "four-of-a-kind": "Kare",
    "straight-flush": "Stret fleš",
    "royal-flush": "Rojal fleš",
    "five-of-a-kind": "Pet iste vrednosti",
    "jacks-or-better": "Žandari ili bolje",
    "four-deuces": "Četiri dvojke",
    "wild-royal-flush": "Divlji rojal fleš",
  },
};
