const card = document.querySelector('#card');
const logoDisc = document.querySelector('#logoDisc');
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      showToast(`${button.dataset.copyLabel} copied`);
    } catch {
      showToast('Could not copy this value');
    }
  });
});

document.querySelector('#share').addEventListener('click', async () => {
  const data = {
    title: 'Omar Abdullah Eshaq',
    text: 'Digital contact card for Omar Abdullah Eshaq — Eshaq Trading Company',
    url: location.href,
  };
  try {
    if (navigator.share) await navigator.share(data);
    else {
      await navigator.clipboard.writeText(location.href);
      showToast('Card link copied');
    }
  } catch (_) {}
});

document.querySelector('#wechat').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('+967776060802'); } catch (_) {}
  showToast('Phone number copied — opening WeChat');
  location.href = 'weixin://';
});

logoDisc.addEventListener('pointermove', (event) => {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const rect = logoDisc.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  logoDisc.style.setProperty('--disc-x', `${-y * 8}deg`);
  logoDisc.style.setProperty('--disc-y', `${x * 8}deg`);
});

logoDisc.addEventListener('pointerleave', () => {
  logoDisc.style.setProperty('--disc-x', '0deg');
  logoDisc.style.setProperty('--disc-y', '0deg');
});

function fitCardToViewport() {
  card.style.zoom = '1';
  if (window.innerWidth <= 580) return;
  const scale = Math.min(1, (window.innerWidth - 28) / card.offsetWidth, (window.innerHeight - 28) / card.scrollHeight);
  card.style.zoom = String(Math.max(0.55, scale));
}

fitCardToViewport();
window.addEventListener('resize', fitCardToViewport, { passive: true });
