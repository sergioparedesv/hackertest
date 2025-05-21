export function renderResult(hacker, onShare) {
  const container = document.createElement('div');
  container.className = 'result-screen p-4 bg-white rounded shadow text-center';

  const img = document.createElement('img');
  img.src = hacker.image;
  img.alt = hacker.name;
  img.className = 'mx-auto mb-4 w-48 h-auto';
  container.appendChild(img);

  const title = document.createElement('h2');
  title.className = 'text-xl font-semibold';
  title.textContent = `${hacker.name} - ${hacker.alias}`;
  container.appendChild(title);

  const desc = document.createElement('p');
  desc.textContent = hacker.description;
  container.appendChild(desc);

  const shareBtn = document.createElement('button');
  shareBtn.className = 'mt-4 px-4 py-2 bg-blue-600 text-white rounded';
  shareBtn.textContent = 'Compartir resultado';
  shareBtn.addEventListener('click', onShare);
  container.appendChild(shareBtn);

  return container;
}