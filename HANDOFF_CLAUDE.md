# Claude Code Handoff - French Tutor

## Current State
- Frontend is now split into modular files under `frontend/`:
  - `frontend/index.html` — HTML structure only
  - `frontend/styles.css` — all styles
  - `frontend/app.js` — all JavaScript
- `backend/server.js` updated to serve `frontend/index.html` at `/`
- `french-tutor.html` (monolithic original) still exists in root — delete it after verifying the app works
- Static files served from ROOT_DIR so `/frontend/styles.css` and `/frontend/app.js` resolve correctly

## Run
1. `npm install`
2. `npm start`
3. Open `http://localhost:3000`

## Implemented API Endpoints
- `GET /api/health` → `{ ok: true, service: 'french-tutor-backend', timestamp: '...' }`
- `GET /api/quiz/meta` → `{ quizTypes: [...], speechSynthesis: '...' }`
- `GET /api/content` → `{ lessons: [...], allQuestions: [...] }`

---

## YOUR TASK — Add Backend Tests

Use Node.js built-in `node:test` + `node:assert` — no extra packages needed.

### 1. Create `backend/server.js` to support testability
The server currently calls `app.listen()` at the bottom unconditionally.
Refactor `backend/server.js` so it exports `app`:

```js
// Add at the bottom, replacing the current app.listen() call:
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`French Tutor backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
```

### 2. Create `backend/server.test.js`

Use this exact structure:

```js
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('./server');

let server;
let baseUrl;

test.before((_, done) => {
  server = http.createServer(app);
  server.listen(0, () => {
    baseUrl = `http://localhost:${server.address().port}`;
    done();
  });
});

test.after((_, done) => {
  server.close(done);
});

// Helper
async function get(path) {
  const res = await fetch(baseUrl + path);
  return { status: res.status, body: await res.json() };
}

test('GET /api/health returns ok:true', async () => {
  const { status, body } = await get('/api/health');
  assert.equal(status, 200);
  assert.equal(body.ok, true);
  assert.equal(body.service, 'french-tutor-backend');
  assert.ok(body.timestamp);
});

test('GET /api/content returns lessons and questions arrays', async () => {
  const { status, body } = await get('/api/content');
  assert.equal(status, 200);
  assert.ok(Array.isArray(body.lessons), 'lessons should be an array');
  assert.ok(Array.isArray(body.allQuestions), 'allQuestions should be an array');
  assert.ok(body.lessons.length > 0, 'should have at least one lesson');
  assert.ok(body.allQuestions.length > 0, 'should have at least one question');
});

test('GET /api/quiz/meta returns quizTypes array', async () => {
  const { status, body } = await get('/api/quiz/meta');
  assert.equal(status, 200);
  assert.ok(Array.isArray(body.quizTypes));
  assert.equal(body.quizTypes.length, 3);
});
```

### 3. Update `package.json` scripts

Add:
```json
"test": "node --test backend/server.test.js"
```

### 4. Run and verify
```bash
npm test
```
All 3 tests should pass. Fix anything that doesn't.

### 5. Commit
```
test: add backend endpoint tests for health, content, and quiz/meta
```

---

## After Tests Pass — Next Steps
1. Delete `french-tutor.html` from root (it's been replaced by `frontend/index.html`)
2. Add CI workflow at `.github/workflows/ci.yml` — runs `npm install && npm test` on push to main

## Notes
- GitHub remote: `https://github.com/redreach-repo/alfred-hub.git`
- `gh` CLI not installed — use `git` directly
- `fetch` is available natively in Node 18+ — no need to install node-fetch
- macOS `._*` files are gitignored — ignore them
