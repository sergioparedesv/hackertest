import { renderCountdown } from './components/CountdownScreen.js';
import { renderQuestionCard } from './components/QuestionCard.js';
import { renderResult } from './components/ResultScreen.js';
import { renderSocialFollow } from './components/SocialFollow.js';

const app = document.getElementById('app');

async function loadData() {
  const [questionsRes, hackersRes] = await Promise.all([
    fetch('data/preguntas.json'),
    fetch('data/hacker.json')
  ]);
  const questions = await questionsRes.json();
  const hackers = await hackersRes.json();
  return { questions, hackers };
}

function startQuiz(data) {
  let current = 0;
  const scores = Array(data.hackers.length).fill(0);

  function showResult() {
    const maxIndex = scores.indexOf(Math.max(...scores));
    const resultEl = renderResult(data.hackers[maxIndex], () => {
      const shareUrl = `https://twitter.com/intent/tweet?text=Mi%20resultado%20es%20${encodeURIComponent(data.hackers[maxIndex].alias)}`;
      window.open(shareUrl, '_blank');
    });
    app.innerHTML = '';
    app.appendChild(resultEl);
  }

  function showFollow() {
    const followEl = renderSocialFollow(() => {
      showResult();
    });
    app.innerHTML = '';
    app.appendChild(followEl);
  }

  function showNext() {
    if (current >= data.questions.length) {
      showFollow();
      return;
    }

    const q = data.questions[current];
    const qEl = renderQuestionCard(q, index => {
      scores[index] += 1;
      current += 1;
      showNext();
    });
    app.innerHTML = '';
    app.appendChild(qEl);
  }

  showNext();
}

function init() {
  loadData().then(data => {
    app.innerHTML = '';
    const title = document.createElement('h1');
    title.className = 'text-2xl font-semibold mb-4';
    title.textContent = '¿Qué tipo de Hacker eres?';

    const btn = document.createElement('button');
    btn.className = 'px-4 py-2 bg-green-600 text-white rounded';
    btn.textContent = 'Empezar test';
    btn.addEventListener('click', () => {
      const countdownEl = renderCountdown(3, () => startQuiz(data));
      app.innerHTML = '';
      app.appendChild(countdownEl);
    });
    app.appendChild(title);
    app.appendChild(btn);
  });
}

init();