---HANDOFF TO CURSOR---
Date: 2026-04-25
Branch: dev
Last commit: feat: build proposal-gen GAS web app with Claude API + Sheets history
Files changed:
  - proposal-gen/appsscript.json   (GAS manifest)
  - proposal-gen/Config.gs         (API config + Alfred's profile)
  - proposal-gen/ProposalGenerator.gs  (Claude API call, 200-word prompt)
  - proposal-gen/SheetsManager.gs  (Google Sheets read/write + history)
  - proposal-gen/Code.gs           (doGet, handleGenerate, handleGetHistory)
  - proposal-gen/index.html        (full UI: generate + history tabs)
  - proposal-gen/SETUP.md          (deploy instructions)

What Cursor should do next:
  1. Follow SETUP.md — create GAS project, copy all files, set Script Properties
     (CLAUDE_API_KEY and SHEET_ID), deploy as web app.
  2. Test the generate flow with a real Upwork job posting.
  3. Verify the proposal saves to the Google Sheet automatically.
  4. If Alfred wants to tweak his profile/strengths, edit Config.gs → ALFRED_PROFILE.
  5. Optional: add a "Regenerate" button in index.html that re-runs with the same inputs.

Blockers / notes:
  - CLAUDE_API_KEY must be set in Script Properties — the app will error without it.
  - SHEET_ID is optional: if omitted, SheetsManager falls back to getActiveSpreadsheet()
    (only works if the script is bound to a Sheet, not a standalone project).
    Safest: always set SHEET_ID.
  - Claude model used: claude-sonnet-4-6
  - Prompt targets exactly 200 words ±5. If output drifts, tighten the prompt in
    ProposalGenerator.gs.
  - Rate defaults: $65 chip selected on load. Chips are: $65 / $75 / $90 / Custom.
---END HANDOFF---
