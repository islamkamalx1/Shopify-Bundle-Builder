# Bundle Builder

A multi-step security-system bundle builder: a 4-step accordion (cameras → plan → sensors → accessories) with a live review panel that tracks selections, variants, quantities, and pricing in real time.

## Tech stack

- React 19 + TypeScript
- Vite
- Zustand (with `persist` for localStorage)a
- Zod
- Tailwind CSS v4 + Base UI + shadcn/ui
- Sonner

## Getting started

```bash
pnpm install
pnpm dev
```

Other scripts:

```bash
pnpm build     # type-checks then builds for production
pnpm preview   # serves the production build locally
pnpm lint      # eslint
```

No environment variables or backend are required — the app is fully data-driven from a local JSON file at `src/data/bundle.json`.

## Project structure

```
src/
  data/bundle.json     # data source
  lib/                 # zod schema, store, selectors, business rules
  types/                # shared types
  components/           # accordion, product cards, review panel, checkout
```