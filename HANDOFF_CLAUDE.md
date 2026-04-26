# Claude Code Handoff - French Tutor

## Current State
- Frontend is now split into modular files under `frontend/`:
  - `frontend/index.html` — HTML structure only
  - `frontend/styles.css` — all styles
  - `frontend/app.js` — all JavaScript
- `backend/server.js` updated to serve `frontend/index.html` at `/`
- `french-tutor.html` (monolithic) still exists in root — safe to delete once verified
- Static files served from ROOT_DIR so `/frontend/styles.css` and `/frontend/app.js` resolve correctly

## Run
1. `npm install`
2. `npm start`
3. Open `http://localhost:3000`

## Implemented API Endpoints
- `GET /api/health`
- `GET /api/quiz/meta`
- `GET /api/content`

## Suggested Next Steps
1. **Delete `french-tutor.html`** from root once you've verified the new modular version works in browser.
2. **Add lightweight tests** (use Node's built-in `node:test` — no extra dependency needed):
   - `GET /api/health` returns `{ ok: true }`
   - `GET /api/content` returns `{ lessons: [...], allQuestions: [...] }`
   - Add `"test": "node --test"` to `package.json` scripts
3. **Add CI workflow** (`.github/workflows/ci.yml`): install + test on push.
4. **Branch hygiene**: repo is currently committing directly to `main`. Consider switching to `dev` branch for active work per the project branching strategy.

## Notes
- GitHub remote: `https://github.com/redreach-repo/alfred-hub.git`
- `gh` CLI is not installed on this machine — use `git` directly or install via `brew install gh`
- macOS `._*` metadata files are excluded via `.gitignore` — no action needed
