export function renderQuestionCard(questionData, onSelect) {
  const container = document.createElement('div');
  container.className = 'question-card p-4 bg-white rounded shadow';

  const title = document.createElement('h2');
  title.className = 'text-lg font-semibold mb-2';
  title.textContent = questionData.question;
  container.appendChild(title);

  const list = document.createElement('ul');
  list.className = 'space-y-2';
  questionData.answers.forEach((answer, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.className = 'w-full text-left px-3 py-2 bg-gray-100 rounded hover:bg-gray-200';
    button.textContent = answer;
    button.addEventListener('click', () => onSelect(index));
    item.appendChild(button);
    list.appendChild(item);
  });
  container.appendChild(list);

  return container;
}
