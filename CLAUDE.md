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

**State management**: All game state lives in one hook, [src/hooks/useVideoPoker.ts](src/hooks/useVideoPoker.ts), which owns a single `GameState` object (`credits`, `bet`, `phase`, `mode`, `hand`, `deck`, `lastHandEvaluation`, `totalWinnings`) and exposes `actions` (dealHand, toggleHold, drawCards, newGame, adjustBet, etc.) and `computed` values. [src/components/home.tsx](src/components/home.tsx) calls this hook exactly once and passes `gameState`/`actions`/`computed` down as props to a single [GameBoard](src/components/VideoPoker/GameBoard.tsx) (a pure presentational component with no state of its own); the mode tabs just call `actions.changeGameMode()` rather than mounting separate game instances. This keeps credits consistent across mode switches — don't reintroduce per-tab hook instances or prop-sync `useEffect`s, which previously caused credits to desync across tabs. Tabs are disabled while `phase === "dealt"` so switching mode can't silently forfeit a placed bet.

**Game phase machine**: `phase` drives what's legal — `betting → dealt → complete → betting (newGame)`. Actions early-return (no-op) if called in the wrong phase (e.g. `dealHand` only works during `"betting"`, `toggleHold`/`drawCards` only during `"dealt"`). When adding new actions, follow this guard pattern rather than relying on UI to prevent invalid calls.

**Game logic is pure and phase-agnostic**, split across two files under `src/lib/`:
- [gameLogic.ts](src/lib/gameLogic.ts) — deck creation/shuffling/dealing, card value helpers, wild-card detection (`isWildCard`, mode-dependent: Jokers in "jokers" mode, 2s in "deuces" mode), and the three `getPayoutTable(mode)` payout tables.
- [handEvaluator.ts](src/lib/handEvaluator.ts) — `evaluateHand(cards, mode, bet)` ranks a 5-card hand (checked in payout order from best to worst: five-of-a-kind → royal flush → straight flush → four of a kind → ... → jacks-or-better/pair) and computes `winningCardIndices` for highlighting. Wild-card logic (jokers/deuces) is threaded through every check (flush, straight, N-of-a-kind) rather than handled as a special case.

When changing hand-ranking or payout logic, both files usually need to move together, and the check order in `evaluateHand` matters (it's a series of `else if`s from best hand to worst).

**Types**: [src/types/game.ts](src/types/game.ts) is the single source of truth for `Card`, `GameState`, `GameMode`, `HandRank`, `HandEvaluation`, and shared constants (`MIN_BET`, `MAX_BET`, `BET_INCREMENT`). `HandEvaluation` carries only `rank` (a `HandRank`) — display names are resolved at render time via i18n (`tHandRank`), never baked into game state.

**UI composition**: [src/components/VideoPoker/GameBoard.tsx](src/components/VideoPoker/GameBoard.tsx) is the per-mode container wiring `useVideoPoker` to `CardHand` (cards + hold/animation), `PayoutTable` (mode-specific table, highlights the achieved rank), `WinNotification`, `GameStatus`, and `CreditsManager`. Card-back vs. card-front rendering is driven by `card.isDealt`, not by phase directly. Card animations use Framer Motion.

**Styling**: Tailwind CSS with shadcn/ui components (`src/components/ui/`, "new-york" style, see [components.json](components.json)) — those are generated/vendored primitives, prefer composing them over editing them. Casino theme is deliberate: green felt (`bg-green-700`/`800`) + gold/yellow accents; keep new UI consistent with this palette. Path alias `@/*` → `src/*` (configured in both `tsconfig.json` and `vite.config.ts`).

**Internationalization**: English and Serbian, via a small custom Context provider (no i18next) — [src/i18n/translations.ts](src/i18n/translations.ts) holds two flat dictionaries (`en`/`sr`, typed against each other so a missing key is a compile error) plus `HAND_RANK_NAMES` (poker hand display names, keyed by the raw `HandRank`/payout-table strings, shared by the payout table and all in-game hand-name displays). [src/i18n/LanguageContext.tsx](src/i18n/LanguageContext.tsx) is the `LanguageProvider` (wraps `<Routes>` in `App.tsx`, persists the choice to `localStorage`); [src/i18n/useLanguage.ts](src/i18n/useLanguage.ts) is the consumer hook — `const { t, tHandRank } = useLanguage()`. `t(key, params?)` does `{param}` interpolation against `TranslationKey`. Every user-facing string in `src/components/**` should go through `t`/`tHandRank` — don't hardcode English. [LanguageSwitcher.tsx](src/components/LanguageSwitcher.tsx) (globe icon + shadcn `Select`) sits top-right of the title row in `home.tsx`.

**Tooling quirks specific to this repo**:
- **Codux** ([codux.config.json](codux.config.json)) board files live in `src/_codux/`; `src/stories/*.stories.tsx` are Codux/component stories for the shadcn primitives, not app-specific tests.

Tempo devtools and the Supabase dependency were part of the original starter template but were unused by the game — both have been removed.
