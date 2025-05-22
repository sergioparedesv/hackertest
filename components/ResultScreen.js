export function renderResult(hacker) {
  const container = document.createElement('div');
  container.classList.add('result-screen');

  const img = document.createElement('img');
  img.src = hacker.image;
  img.alt = hacker.name;
  container.appendChild(img);

  const title = document.createElement('h2');
  title.textContent = `${hacker.name} - ${hacker.alias}`;
  container.appendChild(title);

  const desc = document.createElement('p');
  desc.textContent = hacker.description;
  container.appendChild(desc);

  const share = document.createElement('button');
  share.textContent = 'Compartir';
  share.addEventListener('click', async () => {
    const message = `Obtuve el resultado "${hacker.name} - ${hacker.alias}" en HackerTest.`;
    try {
      const res = await fetch(hacker.image);
      const blob = await res.blob();
      const file = new File([blob], hacker.image.split('/').pop(), { type: blob.type });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ title: 'HackerTest', text: message, files: [file] });
        return;
      }
    } catch (e) {
      // ignore and fallback
    }
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(message);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  });
  container.appendChild(share);

  return container;
}