# Claude Code Handoff - French Tutor + Proposal Generator

## French Tutor — Current State
- **Live URL**: https://alfred-canada-hub.vercel.app (phone/iPad/desktop)
- **Local**: `npm start` → http://localhost:3000
- Frontend split into modular files:
  - `frontend/index.html` — HTML structure
  - `frontend/styles.css` — all styles
  - `frontend/app.js` — all JavaScript
- `backend/server.js` exports `app` (supports Vercel serverless + tests)
- `vercel.json` routes all requests through `backend/server.js`

## Proposal Generator — Current State
- **Live URL**: https://script.google.com/macros/s/AKfycbxAYB3aNsNVZuVthF_oaGoncfzRQyGCTJSu3BVUZvdPf5QZDXOQ1UJzLt9J7aSAg9j7/exec
- GAS project ID: `1H0iBjViApuIdB4VSnVaeG0JKFbzHvlLn8QaXzmkzJ_djawjO_47lkW08`
- Script Properties set: CLAUDE_API_KEY ✓, SHEET_ID ✓
- Sheet ID: `1EZsLZd9jRwmCucgL70LotOCteZPt4VZXOG0sylMuHvYRhNDut5OMxDxI`
- To push updates: `cd proposal-gen && clasp push --force && clasp deploy --description "v2"`

## Run Locally
1. `npm install`
2. `npm start`
3. Open http://localhost:3000

## API Endpoints
- `GET /api/health`
- `GET /api/quiz/meta`
- `GET /api/content`

## Suggested Next Steps
1. **Add backend tests** (`backend/server.test.js`) using `node:test` — see previous handoff for exact test code. The server already exports `app` so this is ready to go.
2. **Delete `french-tutor.html`** from root — replaced by `frontend/index.html`
3. **Add CI** (`.github/workflows/ci.yml`) — `npm install && npm test` on push
4. **Vercel auto-deploy**: connect the GitHub repo in Vercel dashboard so every push to main auto-deploys

## Notes
- GitHub remote: `https://github.com/redreach-repo/alfred-hub.git`
- 4 commits ahead of origin/main — push when ready: `git push origin main`
- `gh` CLI not installed — use `git` directly
- `._*` macOS files are gitignored
