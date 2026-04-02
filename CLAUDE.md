# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Mario-style 3D platformer game built with Three.js and bundled with Vite. The project uses vanilla JavaScript (ES modules).

## Commands

- **Dev server:** `npm run dev` — starts Vite dev server with HMR
- **Build:** `npm run build` — produces production bundle in `dist/`

## Architecture

- `index.html` — entry point, loads `src/main.js` as ES module
- `src/main.js` — main game file (Three.js scene setup, game loop, player/level logic)
- No test framework is currently configured

## Commit Message Guidelines

Use conventional commit format:

- `feat: description` — new game feature (e.g., new enemy type, power-up)
- `fix: description` — bug fix
- `refactor: description` — code restructuring without behavior change
- `chore: description` — build config, dependencies, tooling
- `style: description` — visual/CSS changes, formatting

Keep the subject line under 72 characters. Use imperative mood ("add jumping mechanic" not "added jumping mechanic").
