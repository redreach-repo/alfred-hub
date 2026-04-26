# Claude Code Handoff - French Tutor

## Current State
- Frontend remains in `french-tutor.html`.
- Backend lives in `backend/server.js` with data in `backend/data.js`.
- App now loads lesson and quiz content from backend endpoint `GET /api/content`.
- TTS status indicator is visible in lesson toolbar and updates during speech playback.

## Run
1. `npm install`
2. `npm start`
3. Open `http://localhost:3000`

## Implemented API Endpoints
- `GET /api/health`
- `GET /api/quiz/meta`
- `GET /api/content`

## Suggested Next Steps
- Split `french-tutor.html` into modular frontend files (`frontend/index.html`, `frontend/styles.css`, `frontend/app.js`).
- Add API versioning and input validation (`/api/v1/...`).
- Add lightweight tests:
  - backend endpoint tests for `/api/health` and `/api/content`
  - frontend smoke test for quiz start and lesson render.
- Add CI workflow for install + lint + basic backend test run.

## Notes
- There are macOS metadata files in project root with `._` prefixes. They are not required for app logic and should be excluded from commits if possible.
