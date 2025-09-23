# Repository Guidelines

## Project Structure & Module Organization
- App code lives in `src/`:
  - `src/app/` Next.js routes, layouts, and API routes (`api/*/route.ts`).
  - `src/components/` React components (PascalCase `.tsx`).
  - `src/hooks/` custom hooks (`use*.ts`).
  - `src/lib/` shared libs (e.g., Amplify setup).
  - `src/config/` config objects (e.g., `locationConfig.ts`).
  - `src/styles/` global and theme CSS.
- Backend lives in `amplify/` (functions, data, auth). Tests are colocated under `amplify/functions/**/__tests__/`.
- Static assets in `public/`. Utility scripts in `scripts/`.

## Build, Test, and Development Commands
- `npm run dev` — Start Next.js locally (Turbopack).
- `npm run build` — Production build. `npm start` — serve build.
- `npm run lint` — ESLint (Next core-web-vitals + TS). Add `--fix` to autofix.
- `npm run typecheck` — TypeScript in strict mode.
- `npm test` / `npm run test:watch` — Jest for Amplify functions.
- `npm run test:sms` — Run only SMS function tests.
- `npm run sandbox` — Amplify local sandbox. `npm run deploy` — pipeline deploy.

## Coding Style & Naming Conventions
- TypeScript, 2-space indent, semicolons, prefer const/let, functional React components.
- Filenames: Components PascalCase (`RegistrationForm.tsx`); hooks `useX.ts`; Next routes `page.tsx`/`route.ts`.
- Use path alias `@/*` (see `tsconfig.json`). Run `npm run lint` before PRs.

## Testing Guidelines
- Framework: Jest + ts-jest, `testEnvironment: node`.
- Location: `amplify/functions/**/__tests__/`; name tests `*.test.ts`.
- Mocks: `global.fetch` is mocked in `test/jest.setup.js`; prefer unit tests with explicit inputs/outputs.
- Coverage is reported (text/lcov/html); add tests for new logic and error paths.

## Commit & Pull Request Guidelines
- Commits: imperative, present tense, concise (e.g., "Add time slots summary").
- PRs: include description, testing steps, linked issues, and screenshots for UI. Note env/infra changes.
- CI/readiness: ensure `lint`, `typecheck`, `test`, and `build` pass locally.

## Security & Configuration Tips
- Never commit secrets. Copy `.env.example` to `.env.local`.
- Frontend env: `NEXT_PUBLIC_LOCATION` is required per campus. Optional: `RESERVE_FUNCTION_NAME` for atomic reservations.
- Amplify functions: set `CLEAR_STREAM_API_KEY` and optional `CLEARSTREAM_TEXT_HEADER` via Amplify secrets.
