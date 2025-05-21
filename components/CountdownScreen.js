export function renderCountdown(seconds, onFinish) {
  const container = document.createElement('div');
  container.className = 'countdown text-6xl font-bold text-center';
  let remaining = seconds;
  container.textContent = remaining;

  const interval = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(interval);
      onFinish();
    } else {
      container.textContent = remaining;
    }
  }, 1000);

  return container;
}