const lessons = [
  { id: 'greetings', title: 'Greetings', icon: '👋', sub: 'Bonjour, bonsoir, and essential first words', level: 'A1 — Start here', color: 'var(--blue)', colorSoft: 'var(--blue-soft)',
    vocab: [
      { fr: 'Bonjour', en: 'Hello / Good day', ex: 'Bonjour ! Comment allez-vous ?' },
      { fr: 'Bonsoir', en: 'Good evening', ex: 'Bonsoir, madame.' },
      { fr: 'Au revoir', en: 'Goodbye', ex: 'Au revoir ! Bonne journée !' },
      { fr: 'Merci', en: 'Thank you', ex: 'Merci beaucoup !' },
      { fr: "S'il vous plaît", en: 'Please (formal)', ex: "Un café, s'il vous plaît." },
      { fr: 'Excusez-moi', en: 'Excuse me', ex: 'Excusez-moi, où est la banque ?' },
      { fr: 'Oui / Non', en: 'Yes / No', ex: 'Oui, je comprends.' },
      { fr: 'Pardon', en: 'Sorry / Pardon', ex: 'Pardon, je ne comprends pas.' }
    ]
  },
  { id: 'numbers', title: 'Numbers', icon: '🔢', sub: 'Counting, prices, dates, time', level: 'A1 — Essential', color: 'var(--green)', colorSoft: 'var(--green-soft)',
    vocab: [
      { fr: 'Un / Une', en: 'One', ex: "J'ai un enfant." },
      { fr: 'Deux / Trois', en: 'Two / Three', ex: "Deux cafés, s'il vous plaît." },
      { fr: 'Dix', en: 'Ten', ex: 'Dix dollars.' },
      { fr: 'Vingt', en: 'Twenty', ex: 'Vingt minutes.' },
      { fr: 'Cent', en: 'One hundred', ex: 'Cent dollars canadiens.' },
      { fr: 'Mille', en: 'One thousand', ex: 'Mille emplois à Calgary.' },
      { fr: 'Premier', en: 'First', ex: 'Le premier janvier.' },
      { fr: "Aujourd'hui", en: 'Today', ex: "Aujourd'hui c'est lundi." }
    ]
  },
  { id: 'work', title: 'Work & Career', icon: '💼', sub: 'Vocabulary for Calgary job hunting', level: 'A2 — Important', color: 'var(--amber)', colorSoft: 'var(--amber-soft)',
    vocab: [
      { fr: 'Le travail', en: 'Work / Job', ex: 'Je cherche du travail à Calgary.' },
      { fr: "L'emploi", en: 'Employment', ex: "Le taux d'emploi est élevé." },
      { fr: 'Le bureau', en: 'Office', ex: 'Mon bureau est au centre-ville.' },
      { fr: 'La réunion', en: 'Meeting', ex: "J'ai une réunion à neuf heures." },
      { fr: 'Le salaire', en: 'Salary', ex: 'Quel est le salaire pour ce poste ?' },
      { fr: "L'entretien", en: 'Interview', ex: "J'ai un entretien demain." },
      { fr: 'Le contrat', en: 'Contract', ex: "Pouvez-vous m'envoyer le contrat ?" },
      { fr: 'Les compétences', en: 'Skills', ex: "J'ai des compétences en automatisation." }
    ]
  },
  { id: 'housing', title: 'Housing & City', icon: '🏠', sub: 'Finding a home in Calgary', level: 'A2 — Practical', color: 'var(--red)', colorSoft: 'var(--red-soft)',
    vocab: [
      { fr: "L'appartement", en: 'Apartment', ex: 'Je cherche un appartement à louer.' },
      { fr: 'Le loyer', en: 'Rent', ex: 'Quel est le loyer mensuel ?' },
      { fr: 'Le quartier', en: 'Neighbourhood', ex: "C'est un beau quartier." },
      { fr: 'La banque', en: 'Bank', ex: 'Je dois ouvrir un compte bancaire.' },
      { fr: "L'épicerie", en: 'Grocery store', ex: "Il y a une épicerie près d'ici." },
      { fr: "L'hiver", en: 'Winter', ex: "L'hiver à Calgary est très froid !" },
      { fr: 'Le chinook', en: 'Chinook wind', ex: "Le chinook réchauffe l'air rapidement." },
      { fr: 'Froid / Chaud', en: 'Cold / Hot', ex: 'Il fait froid en décembre.' }
    ]
  },
  { id: 'immigration', title: 'Immigration', icon: '🛂', sub: 'Words for your PR journey', level: 'B1 — Advanced', color: 'var(--blue)', colorSoft: 'var(--blue-soft)',
    vocab: [
      { fr: 'La résidence permanente', en: 'Permanent residence', ex: "J'attends ma résidence permanente." },
      { fr: 'La citoyenneté', en: 'Citizenship', ex: 'La citoyenneté canadienne est mon objectif.' },
      { fr: 'Le formulaire', en: 'Form', ex: 'Je dois remplir ce formulaire.' },
      { fr: "L'autorisation", en: 'Authorization / Permit', ex: "J'ai une autorisation de travail." },
      { fr: "S'installer", en: 'To settle (in a place)', ex: 'Nous allons nous installer à Calgary.' },
      { fr: 'Immigrer', en: 'To immigrate', ex: 'Nous allons immigrer au Canada.' },
      { fr: 'Le bilinguisme', en: 'Bilingualism', ex: 'Le bilinguisme aide pour Express Entry.' },
      { fr: 'La province', en: 'Province', ex: "L'Alberta est une province canadienne." }
    ]
  },
  { id: 'grammar', title: 'Grammar Basics', icon: '📐', sub: 'Verb conjugation and sentence structure', level: 'A1–A2 — Foundation', color: 'var(--green)', colorSoft: 'var(--green-soft)',
    vocab: [
      { fr: 'Je suis', en: 'I am', ex: 'Je suis de Dubaï.' },
      { fr: 'Vous êtes', en: 'You are (formal)', ex: 'Vous êtes canadien ?' },
      { fr: "J'ai", en: 'I have', ex: "J'ai dix ans d'expérience." },
      { fr: 'Je voudrais', en: 'I would like', ex: 'Je voudrais travailler ici.' },
      { fr: 'Il faut', en: 'It is necessary', ex: 'Il faut parler français à Calgary.' },
      { fr: 'Je peux', en: 'I can', ex: 'Je peux vous aider.' },
      { fr: 'Nous sommes', en: 'We are', ex: 'Nous sommes à Calgary.' },
      { fr: 'Je veux', en: 'I want', ex: 'Je veux apprendre le français.' }
    ]
  }
];

const allQuestions = [
  { type: 'mc', category: 'vocab', q: 'What does "Bonjour" mean?', options: ['Good evening', 'Hello / Good day', 'Goodbye', 'Thank you'], answer: 1, explanation: '"Bonjour" = Hello/Good day — safe to use at any time of day.' },
  { type: 'mc', category: 'vocab', q: 'How do you say "Thank you" in French?', options: ["S'il vous plaît", 'Excusez-moi', 'Merci', 'Pardon'], answer: 2, explanation: '"Merci" = Thank you. "Merci beaucoup" = Thank you very much.' },
  { type: 'mc', category: 'vocab', q: 'What does "Je cherche du travail" mean?', options: ['I found a job', 'I am looking for work', 'I quit my job', 'I have work'], answer: 1, explanation: 'Key phrase: "Je cherche du travail" = I am looking for work.' },
  { type: 'mc', category: 'vocab', q: "What is \"l'appartement\"?", options: ['The office', 'The bank', 'The apartment', 'The neighbourhood'], answer: 2, explanation: "\"L'appartement\" = The apartment. Essential for housing in Calgary." },
  { type: 'mc', category: 'vocab', q: 'What does "Il fait très froid" mean?', options: ['It is very hot', 'It is raining', 'It is very cold', 'It is windy'], answer: 2, explanation: '"Il fait froid" = It is cold. You will say this every Calgary winter!' },
  { type: 'mc', category: 'vocab', q: 'How do you say "I am" in French?', options: ["J'ai", 'Je veux', 'Je suis', 'Je peux'], answer: 2, explanation: '"Je suis" = I am. From the verb "être" (to be).' },
  { type: 'mc', category: 'vocab', q: 'What is "la résidence permanente"?', options: ['Temporary visa', 'Permanent residence', 'Work permit', 'Study permit'], answer: 1, explanation: '"La résidence permanente" = Permanent residence. Your goal!' },
  { type: 'mc', category: 'vocab', q: 'What does "Pouvez-vous répéter?" mean?', options: ['Can you speak faster?', 'Can you translate?', 'Can you repeat that?', 'Can you write it?'], answer: 2, explanation: `"Pouvez-vous répéter, s'il vous plaît?" = Could you repeat that? Critical for TEF.` },
  { type: 'mc', category: 'vocab', q: 'What is "le salaire"?', options: ['The salary', 'The office', 'The meeting', 'The contract'], answer: 0, explanation: '"Le salaire" = salary. Use in interviews: "Quel est le salaire?"' },
  { type: 'mc', category: 'vocab', q: 'How do you say "Goodbye"?', options: ['Bonjour', 'Bonsoir', 'Au revoir', 'Enchanté'], answer: 2, explanation: '"Au revoir" = Goodbye. Literally "Until we see again."' },
  { type: 'mc', category: 'vocab', q: 'What does "Excusez-moi" mean?', options: ['Welcome', 'Excuse me', 'Thank you', 'See you soon'], answer: 1, explanation: '"Excusez-moi" = Excuse me. Use it to politely get attention.' },
  { type: 'mc', category: 'vocab', q: 'What is "le quartier"?', options: ['Neighbourhood', 'Contract', 'Winter', 'Work permit'], answer: 0, explanation: '"Le quartier" means neighbourhood.' },
  { type: 'mc', category: 'vocab', q: 'How do you say "rent" in French?', options: ['Le salaire', 'Le loyer', 'Le bureau', 'Le formulaire'], answer: 1, explanation: '"Le loyer" = rent, useful when apartment hunting.' },
  { type: 'mc', category: 'vocab', q: 'What does "Je voudrais" mean?', options: ['I forgot', 'I would like', 'I am leaving', 'I can'], answer: 1, explanation: '"Je voudrais" = I would like, a polite request form.' },
  { type: 'fill', category: 'grammar', q: 'Complete: "___ suis Alfred Varghese."', answer: 'Je', hint: 'First person singular = I', explanation: '"Je suis Alfred" = I am Alfred.' },
  { type: 'fill', category: 'grammar', q: 'Complete: "Nous ___ à Calgary."', answer: 'sommes', hint: 'We are — être conjugated for nous', explanation: '"Nous sommes" = We are.' },
  { type: 'fill', category: 'grammar', q: "Complete: \"Je ___ de l'expérience.\"", answer: 'ai', hint: 'Conjugate "avoir" (to have) for je', explanation: `"J'ai" = I have. Essential verb.` },
  { type: 'fill', category: 'grammar', q: 'Complete: "___ vous plaît" (please)', answer: "S'il", hint: 'The polite way to say please', explanation: `"S'il vous plaît" = Please (formal).` },
  { type: 'fill', category: 'grammar', q: 'Complete: "Il ___ parler français."', answer: 'faut', hint: 'It is necessary to...', explanation: '"Il faut" = It is necessary / One must.' },
  { type: 'fill', category: 'grammar', q: 'Complete: "Je ___ apprendre le français."', answer: 'veux', hint: 'Verb "vouloir" for je', explanation: '"Je veux" = I want.' },
  { type: 'fill', category: 'grammar', q: 'Complete: "Vous ___ canadien ?"', answer: 'êtes', hint: 'Formal "you are" from être', explanation: '"Vous êtes" = You are (formal/plural).' },
  { type: 'fill', category: 'grammar', q: 'Complete: "Je ___ vous aider."', answer: 'peux', hint: 'Verb "pouvoir" for je', explanation: '"Je peux" = I can.' },
  { type: 'mc', category: 'tef', q: 'Which word means "However" in French?', options: ['Donc', 'Cependant', 'Ensuite', 'Ainsi'], answer: 1, explanation: '"Cependant" = However. Use in TEF writing to show contrast.' },
  { type: 'mc', category: 'tef', q: 'What does "À mon avis" mean?', options: ['According to experts', 'In my opinion', 'On the other hand', 'In conclusion'], answer: 1, explanation: '"À mon avis" = In my opinion. Great opener for TEF Writing.' },
  { type: 'mc', category: 'tef', q: 'How do you start a conclusion in French?', options: ["D'abord", 'Ensuite', 'En conclusion', 'Cependant'], answer: 2, explanation: '"En conclusion" = In conclusion. End your TEF responses with this.' },
  { type: 'mc', category: 'tef', q: 'Which CLB level gives you the Express Entry bilingual bonus?', options: ['CLB 5', 'CLB 6', 'CLB 7', 'CLB 9'], answer: 2, explanation: 'CLB 7 in French = up to 50 additional CRS points on Express Entry.' },
  { type: 'mc', category: 'tef', q: `"D'une part... d'autre part" means:`, options: ['First... then', 'On one hand... on the other hand', 'Before... after', 'More... less'], answer: 1, explanation: `"D'une part... d'autre part" helps present two sides in TEF writing.` },
  { type: 'mc', category: 'tef', q: 'Which exam is accepted for Express Entry French scores?', options: ['DELF B2', 'TEF Canada', 'DALF C1', 'TCF général'], answer: 1, explanation: 'For Express Entry, TEF Canada (and TCF Canada) are accepted language tests.' },
  { type: 'mc', category: 'tef', q: 'Which connector is best to present two contrasting points?', options: ['Ensuite', "D'une part... d'autre part", 'Par exemple', 'Enfin'], answer: 1, explanation: `"D'une part... d'autre part" clearly structures contrasting arguments.` }
];

module.exports = {
  lessons,
  allQuestions
};
