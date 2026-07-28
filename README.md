# Video Poker

An interactive video poker game with a classic casino feel — place bets, draw cards, hold your favorites, and win credits based on poker hand rankings.

## Features

- **Three game modes**: Jacks or Better, Joker's Wild, and Deuces Wild, each with its own payout table and wild-card rules
- **Full hand evaluation**: accurate poker hand ranking with wild-card support, from a pair up through royal flush (and five-of-a-kind in the wild-card modes)
- **Betting & credits**: adjustable bet (5–100 credits), max-bet shortcut, and an add-credits option when running low
- **Hold/discard**: click cards to hold them before drawing replacements
- **Visual feedback**: card-back/card-front animations, win highlighting on the cards that make up the winning hand, and a live payout table that highlights the achieved rank

## Tech stack

React + TypeScript + Vite, Tailwind CSS with shadcn/ui components, Framer Motion for animations.

## Getting started

This project uses [pnpm](https://pnpm.io/) as its package manager.

```bash
pnpm install
pnpm dev
```

Other scripts:

```bash
pnpm build     # typecheck (tsc) then production build
pnpm preview   # preview the production build
pnpm lint      # eslint
```

## Project docs

- [PRD.md](PRD.md) — original feature spec
- [docs/history.md](docs/history.md) — chronological log of past implementation work
- [CLAUDE.md](CLAUDE.md) — architecture notes for working in this codebase
