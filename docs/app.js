const toast = document.querySelector('#toast');
let timeout;
function show(message) {
  toast.querySelector('span').textContent = message;
  toast.classList.add('show');
  clearTimeout(timeout);
  timeout = setTimeout(() => toast.classList.remove('show'), 2800);
}
document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      show(`${button.dataset.label} copied`);
    } catch { show('Could not copy value'); }
  });
});
document.querySelector('#share').addEventListener('click', async () => {
  const share = { title: 'Omar Abdullah Eshaq', text: 'Digital contact card for Omar Abdullah Eshaq', url: location.href };
  try {
    if (navigator.share) await navigator.share(share);
    else { await navigator.clipboard.writeText(location.href); show('Link copied'); }
  } catch (_) {}
});
document.querySelector('#wechat').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('+967776060802'); } catch (_) {}
  show('Number copied — opening WeChat');
  location.href = 'weixin://';
});
