// ─── Entry Points ─────────────────────────────────────────────────────────────

function doGet() {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('Proposal Generator — Alfred Varghese')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function doPost(e) {
  // Not used — all calls go via google.script.run
}

// Called from the frontend
function handleGenerate(formData) {
  try {
    const { jobPosting, jobTitle, jobUrl, rate } = formData;

    if (!jobPosting || jobPosting.trim().length < 50) {
      return { ok: false, error: 'Job posting is too short. Paste the full description.' };
    }

    const proposal = generateProposal(jobPosting, jobTitle, jobUrl, Number(rate));
    saveToHistory(jobTitle, jobUrl, jobPosting, proposal, Number(rate));

    const wordCount = proposal.trim().split(/\s+/).length;
    return { ok: true, proposal, wordCount };

  } catch (err) {
    console.error(err);
    return { ok: false, error: err.message };
  }
}

function handleGetHistory() {
  try {
    return { ok: true, history: getHistory() };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}
