// ─── Configuration ───────────────────────────────────────────────────────────
// Store CLAUDE_API_KEY in Script Properties (File > Project Properties > Script Properties)
// Store SHEET_ID in Script Properties as well

const CONFIG = {
  CLAUDE_API_KEY: PropertiesService.getScriptProperties().getProperty('CLAUDE_API_KEY'),
  SHEET_ID:       PropertiesService.getScriptProperties().getProperty('SHEET_ID'),
  CLAUDE_MODEL:   'claude-sonnet-4-6',
  CLAUDE_API_URL: 'https://api.anthropic.com/v1/messages',
  SHEET_NAME:     'Proposals',
  TARGET_WORDS:   200,
};

// Alfred's Upwork profile — used to personalise every proposal
const ALFRED_PROFILE = {
  name:     'Alfred Varghese',
  location: 'Dubai, UAE',
  rate:     65,   // default $/hr — overridden by caller
  summary: `Business development professional and marketing strategist with 10+ years of
experience helping companies grow revenue, build partnerships, and execute marketing campaigns.
Partner at Red Reach Middle East FZE, overseeing B2B sales, client relations, brand strategy,
and project delivery across marketing, travel, uniform supply, and VA services.
Experienced in proposal writing, client onboarding, CRM management, and managing remote teams.`,
  strengths: [
    'B2B sales and business development',
    'Marketing strategy and campaign management',
    'Client relationship management and onboarding',
    'Virtual assistant and remote team coordination',
    'Proposal writing and competitive bidding',
    'Project management and end-to-end delivery',
  ],
};
