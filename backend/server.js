const path = require('path');
const express = require('express');
const { lessons, allQuestions } = require('./data');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT_DIR = path.resolve(__dirname, '..');

app.use(express.json());
app.use(express.static(ROOT_DIR));

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    service: 'french-tutor-backend',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/quiz/meta', (req, res) => {
  res.json({
    quizTypes: [
      { id: 'vocab', questions: 10 },
      { id: 'grammar', questions: 10 },
      { id: 'mixed', questions: 15 }
    ],
    speechSynthesis: 'Web Speech API (browser)'
  });
});

app.get('/api/content', (req, res) => {
  res.json({
    lessons,
    allQuestions
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(ROOT_DIR, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`French Tutor backend running on http://localhost:${PORT}`);
});
