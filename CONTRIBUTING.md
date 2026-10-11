# Contributing

Thanks for your interest in Explore Commerce.

## Development

Requires Node.js ≥ 20 and [pnpm](https://pnpm.io/) ^10 (see `package.json`
engines and `.nvmrc`).

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm typecheck
pnpm lint
```

## Pull requests

1. Branch from `main` (or the active stack tip for dependent work).
2. Keep changes focused; match the existing monorepo layout
   (`apps/` / `packages/` / `docs/`).
3. Ensure `pnpm typecheck` and `pnpm lint` pass before opening a PR.
4. Open a PR against `main` with a clear description of why the change is
   needed.

## Code of Conduct

Participation is governed by our [Code of Conduct](CODE_OF_CONDUCT.md).
