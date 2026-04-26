# Proposal Generator — Setup Guide

## What It Does
Google Apps Script web app: paste an Upwork job posting → Claude generates a tailored ~200-word proposal → saved to Google Sheets history.

## Files
| File | Purpose |
|------|---------|
| `Code.gs` | Entry points: `doGet`, `handleGenerate`, `handleGetHistory` |
| `Config.gs` | API config + Alfred's profile (edit strengths here) |
| `ProposalGenerator.gs` | Claude API call + prompt |
| `SheetsManager.gs` | Google Sheets read/write |
| `index.html` | Frontend UI |
| `appsscript.json` | GAS manifest |

---

## Deploy Steps

### 1. Create a new Google Apps Script project
- Go to [script.google.com](https://script.google.com) → **New project**
- Name it: `Proposal Generator`

### 2. Copy files in
Copy each `.gs` file and `index.html` into the GAS editor.  
Replace the default `appsscript.json` content (enable via View > Show manifest file).

### 3. Create the Google Sheet
- Create a new Google Sheet at [sheets.google.com](https://sheets.google.com)
- Copy the Sheet ID from the URL:  
  `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

### 4. Set Script Properties
In the GAS editor: **Project Settings → Script Properties → Add property**

| Property | Value |
|----------|-------|
| `CLAUDE_API_KEY` | Your Anthropic API key (`sk-ant-...`) |
| `SHEET_ID` | Google Sheet ID from step 3 |

### 5. Deploy as Web App
- Click **Deploy → New deployment**
- Type: **Web app**
- Execute as: **Me**
- Who has access: **Anyone** (or "Anyone with Google account" for private)
- Click **Deploy** → copy the web app URL

### 6. Test
Open the web app URL → paste a job description → click Generate.

---

## Customise Alfred's Profile
Edit `Config.gs` → `ALFRED_PROFILE` block.  
Change `summary` and `strengths` to match any new skills or focus areas.

## Rate Defaults
Default chips: $65 / $75 / $90 / Custom.  
Change the default selected rate in `Config.gs → rate: 65`.
