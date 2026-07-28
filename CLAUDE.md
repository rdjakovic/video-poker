# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A single-page Video Poker game (React + TypeScript + Vite), implementing three game modes (Jacks or Better, Joker's Wild, Deuces Wild) with full poker hand evaluation, betting, and casino-styled UI. See [PRD.md](PRD.md) for the original feature spec and [docs/history.md](docs/history.md) for a chronological log of past implementation work — check it before assuming a feature is unimplemented.

## Commands

```bash
pnpm dev             # start Vite dev server
pnpm build            # tsc typecheck, then vite build
pnpm build-no-errors  # same as build (tsc errors don't currently fail it — noEmitOnError: false)
pnpm lint              # eslint on .ts/.tsx, zero warnings allowed
pnpm preview           # preview the production build
```

There is no test suite/runner configured in this repo (no jest/vitest, no `*.test.*` files).

**Package manager: pnpm** (pinned via `packageManager` in `package.json`). `package-lock.json` was removed — don't regenerate it or run `npm install`. `eslint` (with `.eslintrc.cjs`, legacy config format) was newly added; running `pnpm lint` currently surfaces a backlog of pre-existing errors/warnings, mostly `@typescript-eslint/no-explicit-any` in the vendored `src/stories/*.stories.tsx` files — those aren't regressions from any single change.

## Architecture

**State management**: All game state lives in one hook, [src/hooks/useVideoPoker.ts](src/hooks/useVideoPoker.ts), which owns a single `GameState` object (`credits`, `bet`, `phase`, `mode`, `hand`, `deck`, `lastHandEvaluation`, `totalWinnings`) and exposes `actions` (dealHand, toggleHold, drawCards, newGame, adjustBet, etc.) and `computed` values. There is no global store — [src/components/home.tsx](src/components/home.tsx) instantiates one `GameBoard` per tab/game mode, each with its own independent hook instance and credit pool passed down as `initialCredits`/`onCreditsChange`.

**Game phase machine**: `phase` drives what's legal — `betting → dealt → complete → betting (newGame)`. Actions early-return (no-op) if called in the wrong phase (e.g. `dealHand` only works during `"betting"`, `toggleHold`/`drawCards` only during `"dealt"`). When adding new actions, follow this guard pattern rather than relying on UI to prevent invalid calls.

**Game logic is pure and phase-agnostic**, split across two files under `src/lib/`:
- [gameLogic.ts](src/lib/gameLogic.ts) — deck creation/shuffling/dealing, card value helpers, wild-card detection (`isWildCard`, mode-dependent: Jokers in "jokers" mode, 2s in "deuces" mode), and the three `getPayoutTable(mode)` payout tables.
- [handEvaluator.ts](src/lib/handEvaluator.ts) — `evaluateHand(cards, mode, bet)` ranks a 5-card hand (checked in payout order from best to worst: five-of-a-kind → royal flush → straight flush → four of a kind → ... → jacks-or-better/pair) and computes `winningCardIndices` for highlighting. Wild-card logic (jokers/deuces) is threaded through every check (flush, straight, N-of-a-kind) rather than handled as a special case.

When changing hand-ranking or payout logic, both files usually need to move together, and the check order in `evaluateHand` matters (it's a series of `else if`s from best hand to worst).

**Types**: [src/types/game.ts](src/types/game.ts) is the single source of truth for `Card`, `GameState`, `GameMode`, `HandRank`, `HandEvaluation`, and shared constants (`MIN_BET`, `MAX_BET`, `BET_INCREMENT`, `GAME_MODE_DESCRIPTIONS`).

**UI composition**: [src/components/VideoPoker/GameBoard.tsx](src/components/VideoPoker/GameBoard.tsx) is the per-mode container wiring `useVideoPoker` to `CardHand` (cards + hold/animation), `PayoutTable` (mode-specific table, highlights the achieved rank), `WinNotification`, `GameStatus`, and `CreditsManager`. Card-back vs. card-front rendering is driven by `card.isDealt`, not by phase directly. Card animations use Framer Motion.

**Styling**: Tailwind CSS with shadcn/ui components (`src/components/ui/`, "new-york" style, see [components.json](components.json)) — those are generated/vendored primitives, prefer composing them over editing them. Casino theme is deliberate: green felt (`bg-green-700`/`800`) + gold/yellow accents; keep new UI consistent with this palette. Path alias `@/*` → `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

**Tooling quirks specific to this repo**:
- **Codux** ([codux.config.json](codux.config.json)) board files live in `src/_codux/`; `src/stories/*.stories.tsx` are Codux/component stories for the shadcn primitives, not app-specific tests.

Tempo devtools and the Supabase dependency were part of the original starter template but were unused by the game — both have been removed.
