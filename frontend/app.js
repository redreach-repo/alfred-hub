let lessons = [];
let allQuestions = [];

let currentQuiz = [], currentQ = 0, score = 0, currentQuizType = 'mixed', answered = false;
let completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
let streak = parseInt(localStorage.getItem('streak') || '0');
let lastStudied = localStorage.getItem('lastStudied') || '';
let currentLessonId = '';
let flipMode = false;
let availableFrenchVoice = null;

async function init() {
  await loadContent();
  updateStreak();
  renderLessonCards();
  updateProgress();
}

async function loadContent() {
  const lessonGrid = document.getElementById('lessonGrid');
  lessonGrid.innerHTML = '<div style="grid-column:1/-1;color:var(--ink-muted);padding:12px">Loading lessons...</div>';
  try {
    const response = await fetch('/api/content');
    if (!response.ok) throw new Error('content request failed');
    const data = await response.json();
    lessons = Array.isArray(data.lessons) ? data.lessons : [];
    allQuestions = Array.isArray(data.allQuestions) ? data.allQuestions : [];
  } catch (err) {
    lessons = [];
    allQuestions = [];
    lessonGrid.innerHTML = '<div style="grid-column:1/-1;color:var(--red);padding:12px">Could not load lesson data. Check backend server.</div>';
  }
}

function updateStreak() {
  document.getElementById('streakNum').textContent = streak;
}

function markStudied() {
  const today = new Date().toDateString();
  if (lastStudied !== today) {
    streak = (lastStudied === new Date(Date.now() - 86400000).toDateString()) ? streak + 1 : 1;
    lastStudied = today;
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastStudied', today);
    document.getElementById('streakNum').textContent = streak;
  }
}

function updateProgress() {
  const pct = Math.min(100, Math.round((completedLessons.length / lessons.length) * 60 + Math.min(streak * 3, 40)));
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPct').textContent = pct + '% to CLB 7';
}

function switchTab(id, btn) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
  closelesson();
}

function renderLessonCards() {
  document.getElementById('lessonGrid').innerHTML = lessons.map(l => `
    <div class="lesson-card" style="--card-color:${l.color};--card-color-soft:${l.colorSoft}" onclick="openLesson('${l.id}')">
      <div class="card-icon">${l.icon}</div>
      <div class="card-title">${l.title}</div>
      <div class="card-sub">${l.sub}</div>
      <div class="card-badge">${l.level}${completedLessons.includes(l.id) ? ' ✓' : ''}</div>
    </div>`).join('');
}

function openLesson(id) {
  currentLessonId = id;
  const lesson = lessons.find(l => l.id === id);
  document.getElementById('lessonGrid').style.display = 'none';
  document.getElementById('lessonView').classList.add('active');
  document.getElementById('lessonTitle').textContent = lesson.icon + ' ' + lesson.title;
  renderVocabCards(lesson);
  if (!completedLessons.includes(id)) { completedLessons.push(id); localStorage.setItem('completedLessons', JSON.stringify(completedLessons)); }
  markStudied(); updateProgress(); renderLessonCards();
}

function closelesson() {
  currentLessonId = '';
  document.getElementById('lessonGrid').style.display = '';
  document.getElementById('lessonView').classList.remove('active');
}

function renderVocabCards(lesson) {
  const grid = document.getElementById('vocabGrid');
  grid.classList.toggle('flip-mode', flipMode);
  updateFlipModeButton();
  if (flipMode) {
    grid.innerHTML = lesson.vocab.map((v, i) => `
      <div class="vocab-card" onclick="this.classList.toggle('flipped')">
        <div class="vc-front">
          <div class="vc-french">${v.fr}</div>
          <div class="vc-meta">
            <button class="speak-btn" onclick="speakFrench('${escapeForAttr(v.fr)}', event)">🔊 Pronounce</button>
          </div>
          <div class="vc-audio">tap card to flip</div>
        </div>
        <div class="vc-back">
          <div class="vc-english">${v.en}</div>
          <div class="vc-example">${v.ex}</div>
          <div class="vc-meta">
            <button class="speak-btn" onclick="speakFrench('${escapeForAttr(v.fr)}', event)">🔊 Replay French</button>
          </div>
        </div>
      </div>`).join('');
  } else {
    grid.innerHTML = lesson.vocab.map(v => `
      <div class="vocab-card" onclick="this.classList.toggle('revealed')">
        <div class="vc-french">${v.fr}</div>
        <div class="vc-english">${v.en}</div>
        <div class="vc-example">${v.ex}</div>
        <div class="vc-meta">
          <button class="speak-btn" onclick="speakFrench('${escapeForAttr(v.fr)}', event)">🔊 Pronounce</button>
          <div class="vc-audio">tap card for example</div>
        </div>
      </div>`).join('');
  }
}

function toggleFlipMode() {
  flipMode = !flipMode;
  if (!currentLessonId) return;
  const lesson = lessons.find(l => l.id === currentLessonId);
  if (lesson) renderVocabCards(lesson);
}

function updateFlipModeButton() {
  const btn = document.getElementById('flipModeBtn');
  btn.textContent = `Flip Mode: ${flipMode ? 'On' : 'Off'}`;
  btn.classList.toggle('active', flipMode);
}

function speakFrench(text, event) {
  if (event) event.stopPropagation();
  if (!('speechSynthesis' in window)) {
    setTtsStatus('Not supported', 'error');
    return;
  }
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-CA';
  utterance.rate = 0.92;
  utterance.pitch = 1.0;
  if (availableFrenchVoice) utterance.voice = availableFrenchVoice;
  utterance.onstart = () => setTtsStatus('Speaking...', 'speaking');
  utterance.onend = () => setTtsStatus('Done', '');
  utterance.onerror = () => setTtsStatus('Playback error', 'error');
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function resolveFrenchVoice() {
  if (!('speechSynthesis' in window)) return;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || !voices.length) return;
  availableFrenchVoice =
    voices.find(v => v.lang === 'fr-CA') ||
    voices.find(v => v.lang && v.lang.toLowerCase().startsWith('fr')) ||
    null;
}

function escapeForAttr(text) {
  return String(text).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function setTtsStatus(text, stateClass) {
  const el = document.getElementById('ttsStatus');
  if (!el) return;
  el.textContent = `Voice: ${text}`;
  el.classList.remove('speaking', 'error');
  if (stateClass) el.classList.add(stateClass);
}

function startQuiz(type) {
  if (!allQuestions.length) {
    const fb = document.getElementById('quizFeedback');
    fb.className = 'quiz-feedback show wrong';
    fb.textContent = 'Quiz data is unavailable. Ensure backend is running.';
    return;
  }
  currentQuizType = type;
  let pool = [...allQuestions];
  if (type === 'vocab') pool = pool.filter(q => q.category === 'vocab');
  if (type === 'grammar') pool = pool.filter(q => q.category !== 'vocab');
  pool = pool.sort(() => Math.random() - 0.5);
  currentQuiz = pool.slice(0, type === 'mixed' ? 15 : 10);
  currentQ = 0; score = 0; answered = false;
  document.getElementById('quizStart').style.display = 'none';
  document.getElementById('scoreCard').classList.remove('show');
  document.getElementById('quizInProgress').style.display = 'block';
  renderDots(); renderQuestion(); markStudied();
}

function renderDots() {
  document.getElementById('quizDots').innerHTML = currentQuiz.map((_, i) =>
    `<div class="quiz-dot ${i < currentQ ? 'done' : i === currentQ ? 'current' : ''}"></div>`).join('');
}

function renderQuestion() {
  const q = currentQuiz[currentQ];
  answered = false;
  document.getElementById('quizFeedback').className = 'quiz-feedback';
  document.getElementById('nextBtn').classList.remove('show');
  let html = `<div class="quiz-type">${q.category.toUpperCase()} · Q${currentQ + 1} of ${currentQuiz.length}</div>`;
  html += `<div class="quiz-question">${q.q}</div>`;
  if (q.type === 'mc') {
    html += `<div class="quiz-options">${q.options.map((o, i) => `<button class="quiz-opt" onclick="checkMC(${i})">${o}</button>`).join('')}</div>`;
  } else {
    html += `<div style="font-size:12px;color:var(--ink-dim);margin-bottom:12px">Hint: ${q.hint}</div>`;
    html += `<input class="quiz-input" id="fillInput" type="text" placeholder="Type your answer..." onkeydown="if(event.key==='Enter')checkFill()">`;
    html += `<button class="quiz-submit" onclick="checkFill()">Check Answer</button>`;
  }
  document.getElementById('quizCard').innerHTML = html;
  renderDots();
}

function checkMC(selected) {
  if (answered) return;
  answered = true;
  const q = currentQuiz[currentQ];
  const opts = document.querySelectorAll('.quiz-opt');
  opts.forEach(o => o.disabled = true);
  const correct = selected === q.answer;
  opts[selected].classList.add(correct ? 'correct' : 'wrong');
  if (!correct) opts[q.answer].classList.add('correct');
  if (correct) score++;
  showFeedback(correct, q.explanation);
}

function checkFill() {
  if (answered) return;
  const input = document.getElementById('fillInput');
  if (!input || !input.value.trim()) return;
  answered = true;
  const q = currentQuiz[currentQ];
  const correct = input.value.trim().toLowerCase() === q.answer.toLowerCase();
  input.classList.add(correct ? 'correct' : 'wrong');
  input.disabled = true;
  if (!correct) input.value = input.value + '  →  ' + q.answer;
  if (correct) score++;
  showFeedback(correct, q.explanation);
}

function showFeedback(correct, explanation) {
  const fb = document.getElementById('quizFeedback');
  fb.className = 'quiz-feedback show ' + (correct ? 'correct' : 'wrong');
  fb.innerHTML = (correct ? '✓ Correct! ' : '✗ Not quite. ') + explanation;
  document.getElementById('nextBtn').classList.add('show');
}

function nextQuestion() {
  currentQ++;
  if (currentQ >= currentQuiz.length) { showScore(); } else { renderQuestion(); }
}

function showScore() {
  document.getElementById('quizInProgress').style.display = 'none';
  const pct = Math.round((score / currentQuiz.length) * 100);
  document.getElementById('scoreNum').textContent = score + '/' + currentQuiz.length;
  const msgs = pct >= 80 ? ['Magnifique !', 'Excellent travail !', 'Très bien !', 'Bravo !'] : pct >= 50 ? ['Pas mal !', 'Continuez !', 'Bonne progression !'] : ['Continuez à pratiquer !', 'Ne vous découragez pas !'];
  document.getElementById('scoreMsg').textContent = msgs[Math.floor(Math.random() * msgs.length)];
  document.getElementById('scoreCard').classList.add('show');
  updateProgress();
}

function showQuizStart() {
  document.getElementById('quizStart').style.display = 'block';
  document.getElementById('quizInProgress').style.display = 'none';
  document.getElementById('scoreCard').classList.remove('show');
}

if ('speechSynthesis' in window && typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
  window.speechSynthesis.onvoiceschanged = resolveFrenchVoice;
}

resolveFrenchVoice();
init();
