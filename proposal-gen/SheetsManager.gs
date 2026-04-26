// ─── Google Sheets: History Management ───────────────────────────────────────

function getOrCreateSheet_() {
  const ss = CONFIG.SHEET_ID
    ? SpreadsheetApp.openById(CONFIG.SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow([
      'Timestamp', 'Job Title', 'Job URL', 'Rate ($/hr)',
      'Word Count', 'Proposal', 'Job Posting (preview)',
    ]);
    sheet.getRange(1, 1, 1, 7).setFontWeight('bold').setBackground('#1a1a2e').setFontColor('#ffffff');
    sheet.setColumnWidth(6, 500);
    sheet.setColumnWidth(7, 300);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function saveToHistory(jobTitle, jobUrl, jobPosting, proposal, rate) {
  const sheet = getOrCreateSheet_();
  const wordCount = proposal.trim().split(/\s+/).length;
  const postingPreview = jobPosting.substring(0, 200) + (jobPosting.length > 200 ? '…' : '');

  sheet.appendRow([
    new Date(),
    jobTitle || '(untitled)',
    jobUrl || '',
    rate,
    wordCount,
    proposal,
    postingPreview,
  ]);
}

function getHistory() {
  const sheet = getOrCreateSheet_();
  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return [];   // header only

  return data.slice(1).reverse().map(row => ({
    timestamp:  row[0] ? Utilities.formatDate(new Date(row[0]), 'Asia/Dubai', 'dd MMM yyyy HH:mm') : '',
    jobTitle:   row[1],
    jobUrl:     row[2],
    rate:       row[3],
    wordCount:  row[4],
    proposal:   row[5],
  }));
}
