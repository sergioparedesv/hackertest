export function renderSocialFollow(onFinish) {
  const container = document.createElement('div');
  container.className = 'social-follow flex flex-col items-center text-center gap-4';

  const message = document.createElement('p');
  message.textContent = 'S\u00edguenos en nuestras redes para ver tu resultado m\u00e1s r\u00e1pido';
  container.appendChild(message);

  const links = document.createElement('div');
  links.className = 'flex gap-4';

  const socials = [
    { url: 'https://www.youtube.com/channel/UCo0bIjLfBJSlatvTqJkiZEQ', label: 'YouTube' },
    { url: 'https://www.linkedin.com/company/106805162/admin/dashboard/', label: 'LinkedIn' },
    { url: 'https://www.facebook.com/profile.php?id=100090400674286', label: 'Facebook' }
  ];

  socials.forEach(s => {
    const a = document.createElement('a');
    a.href = s.url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'px-3 py-2 bg-blue-600 text-white rounded';
    a.textContent = s.label;
    a.addEventListener('click', () => finish());
    links.appendChild(a);
  });
  container.appendChild(links);

  let remaining = 10;
  const btn = document.createElement('button');
  btn.className = 'px-4 py-2 bg-green-600 text-white rounded';
  btn.textContent = `Ver resultado en ${remaining}s`;
  container.appendChild(btn);

  const interval = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      finish();
    } else {
      btn.textContent = `Ver resultado en ${remaining}s`;
    }
  }, 1000);

  function finish() {
    clearInterval(interval);
    remaining = 0;
    btn.textContent = 'Ver resultado';
  }

  btn.addEventListener('click', () => {
    if (remaining <= 0) onFinish();
  });

  return container;
}