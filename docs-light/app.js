const card = document.querySelector('#card');
const shell = document.querySelector('#shell');
const cursorLight = document.querySelector('#cursorLight');
const logoStage = document.querySelector('#logoStage');
const logoTile = logoStage.querySelector('.logo-tile');
const toast = document.querySelector('#toast');
let toastTimer;

function showToast(message) {
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

shell.addEventListener('pointermove', (event) => {
  cursorLight.style.left = `${event.clientX}px`;
  cursorLight.style.top = `${event.clientY}px`;
});

logoStage.addEventListener('pointermove', (event) => {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const rect = logoStage.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;
  logoTile.style.setProperty('--logo-x', `${-y * 12}deg`);
  logoTile.style.setProperty('--logo-y', `${x * 12}deg`);
});

logoStage.addEventListener('pointerleave', () => {
  logoTile.style.setProperty('--logo-x', '0deg');
  logoTile.style.setProperty('--logo-y', '0deg');
});

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      showToast(`${button.dataset.label} copied`);
    } catch {
      showToast('Could not copy this value');
    }
  });
});

document.querySelector('#share').addEventListener('click', async () => {
  const shareData = {
    title: 'Omar Abdullah Eshaq',
    text: 'Digital contact card for Omar Abdullah Eshaq — Eshaq Trading Company',
    url: location.href,
  };
  try {
    if (navigator.share) await navigator.share(shareData);
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

function fitDesktopCard() {
  card.style.removeProperty('zoom');
  if (window.innerWidth <= 860) return;
  const scale = Math.min(1, (window.innerWidth - 28) / card.offsetWidth, (window.innerHeight - 28) / card.scrollHeight);
  card.style.zoom = String(scale);
}

fitDesktopCard();
window.addEventListener('resize', fitDesktopCard, { passive: true });
