// ─── Claude API: Generate Proposal ───────────────────────────────────────────

function generateProposal(jobPosting, jobTitle, jobUrl, hourlyRate) {
  if (!CONFIG.CLAUDE_API_KEY) throw new Error('CLAUDE_API_KEY not set in Script Properties.');

  const rate = hourlyRate || ALFRED_PROFILE.rate;
  const strengthsList = ALFRED_PROFILE.strengths.map(s => `• ${s}`).join('\n');

  const systemPrompt = `You are an expert Upwork proposal writer. Write in a confident, warm, and professional tone.
Sound like a real person — not a robot. No filler phrases like "I hope this message finds you well."
Get straight to the point. Always write exactly ${CONFIG.TARGET_WORDS} words (±5 words). Count carefully.

Writer profile:
Name: ${ALFRED_PROFILE.name}
Location: ${ALFRED_PROFILE.location}
Rate: $${rate}/hr
Background: ${ALFRED_PROFILE.summary}
Key strengths:
${strengthsList}`;

  const userPrompt = `Write a ${CONFIG.TARGET_WORDS}-word Upwork proposal for this job posting.

JOB TITLE: ${jobTitle || '(not provided)'}
JOB URL: ${jobUrl || '(not provided)'}
JOB POSTING:
---
${jobPosting}
---

Requirements:
1. Open with a line that shows you read and understood the job (reference a specific detail).
2. Briefly highlight 1–2 relevant strengths from the profile that directly match this role.
3. Give a concrete example or result from past work if applicable.
4. Mention the hourly rate ($${rate}/hr) naturally near the end.
5. End with a clear, friendly call to action (invite them to chat or ask a question).
6. NO bullet points. Flowing paragraphs only. Exactly ${CONFIG.TARGET_WORDS} words ±5.

Return ONLY the proposal text. No labels, no headers, no explanations.`;

  const payload = {
    model: CONFIG.CLAUDE_MODEL,
    max_tokens: 600,
    system: systemPrompt,
    messages: [{ role: 'user', content: userPrompt }],
  };

  const options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'x-api-key': CONFIG.CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    payload: JSON.stringify(payload),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(CONFIG.CLAUDE_API_URL, options);
  const code = response.getResponseCode();
  const body = JSON.parse(response.getContentText());

  if (code !== 200) {
    throw new Error(`Claude API error ${code}: ${body.error?.message || JSON.stringify(body)}`);
  }

  return body.content[0].text.trim();
}
