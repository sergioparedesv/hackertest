export function renderQuestionCard(questionData, onSelect) {
  const container = document.createElement('div');
  container.classList.add('question-card');

  const title = document.createElement('h2');
  title.textContent = questionData.question;
  container.appendChild(title);

  const list = document.createElement('ul');
  questionData.answers.forEach((answer, index) => {
    const item = document.createElement('li');
    const button = document.createElement('button');
    button.textContent = answer;
    button.addEventListener('click', () => onSelect(index));
    item.appendChild(button);
    list.appendChild(item);
  });
  container.appendChild(list);

  return container;
}
