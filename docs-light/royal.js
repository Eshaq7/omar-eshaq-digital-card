const card = document.querySelector('#card');
const languageToggle = document.querySelector('#languageToggle');
const qrTrigger = document.querySelector('#qrTrigger');
const qrDialog = document.querySelector('#qrDialog');
const wechatDialog = document.querySelector('#wechatDialog');
const toast = document.querySelector('#toast');
let language = localStorage.getItem('royal-card-language') || 'en';
let toastTimer;

const words = {
  en: {
    digital: 'Digital contact', name: 'Omar Abdullah <span>Eshaq</span>', role: 'Assistant General Manager', company: 'Eshaq Trading Company', location: 'Yemen, Sana’a', available: 'Available for business', wechat: 'Add on WeChat', qr: 'Share', languageCode: 'AR', languageTitle: 'العربية', languageAria: 'Switch card to Arabic', shareAria: 'Share this contact card', qrAria: 'Show card QR code', qrTitle: 'Scan to open my card', qrDescription: 'Point your camera at this code to open this digital contact.', qrClose: 'Close QR code', wechatQrTitle: 'Scan to add on WeChat', wechatQrDescription: 'Scan this official WeChat code to connect directly.', wechatQrClose: 'Close WeChat QR code', linkCopied: 'Card link copied'
  },
  ar: {
    digital: 'بطاقة اتصال رقمية', name: 'عمر عبدالله <span>إسحاق</span>', role: 'مساعد المدير العام', company: 'شركة إسحاق التجارية', location: 'اليمن، صنعاء', available: 'متاح للأعمال', wechat: 'إضافة على WeChat', qr: 'مشاركة', languageCode: 'EN', languageTitle: 'English', languageAria: 'تحويل البطاقة إلى الإنجليزية', shareAria: 'مشاركة بطاقة الاتصال', qrAria: 'إظهار رمز QR للبطاقة', qrTitle: 'امسح الرمز لفتح بطاقتي', qrDescription: 'وجّه كاميرا هاتفك إلى الرمز لفتح بطاقة الاتصال الرقمية.', qrClose: 'إغلاق رمز QR', wechatQrTitle: 'امسح الرمز للإضافة عبر WeChat', wechatQrDescription: 'امسح رمز WeChat الرسمي للتواصل مباشرة.', wechatQrClose: 'إغلاق رمز WeChat', linkCopied: 'تم نسخ رابط البطاقة'
  }
};

function cardUrl() { return `${location.origin}${location.pathname}`; }
function qrSource() { return `https://api.qrserver.com/v1/create-qr-code/?size=460x460&margin=14&format=png&data=${encodeURIComponent(cardUrl())}`; }
function showToast(message) { toast.querySelector('span').textContent = message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('show'), 2600); }
function fitCardToViewport() {
  card.style.zoom = '1';
  if (window.innerWidth <= 580) return;
  const scale = Math.min(1, (window.innerWidth - 34) / card.offsetWidth, (window.innerHeight - 34) / card.scrollHeight);
  card.style.zoom = String(Math.max(.64, scale));
}

function applyLanguage(next) {
  language = words[next] ? next : 'en';
  const t = words[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  card.setAttribute('aria-label', language === 'ar' ? 'بطاقة الاتصال الرقمية الفاخرة لعمر عبدالله إسحاق' : 'Premium digital business card for Omar Abdullah Eshaq');
  document.querySelector('#digitalLabel').lastChild.textContent = t.digital;
  document.querySelector('#personName').innerHTML = t.name;
  document.querySelector('#personRole').textContent = t.role;
  document.querySelector('#companyName').textContent = t.company;
  document.querySelector('#locationValue').textContent = t.location;
  document.querySelector('#availability').textContent = t.available;
  document.querySelector('#wechatLabel').textContent = t.wechat;
  document.querySelector('#qrLabel').textContent = t.qr;
  languageToggle.querySelector('b').textContent = t.languageCode;
  languageToggle.title = t.languageTitle;
  languageToggle.setAttribute('aria-label', t.languageAria);
  document.querySelector('#share').setAttribute('aria-label', t.shareAria);
  qrTrigger.setAttribute('aria-label', t.qrAria);
  document.querySelector('#qrTitle').textContent = t.qrTitle;
  document.querySelector('#qrDescription').textContent = t.qrDescription;
  document.querySelector('#qrClose').setAttribute('aria-label', t.qrClose);
  document.querySelector('#wechatQrTitle').textContent = t.wechatQrTitle;
  document.querySelector('#wechatQrDescription').textContent = t.wechatQrDescription;
  document.querySelector('#wechatQrClose').setAttribute('aria-label', t.wechatQrClose);
  localStorage.setItem('royal-card-language', language);
}

languageToggle.addEventListener('click', () => applyLanguage(language === 'en' ? 'ar' : 'en'));
document.querySelector('#share').addEventListener('click', async () => {
  const t = words[language];
  try { if (navigator.share) await navigator.share({ title: language === 'ar' ? 'عمر عبدالله إسحاق' : 'Omar Abdullah Eshaq', text: t.company, url: cardUrl() }); else { await navigator.clipboard.writeText(cardUrl()); showToast(t.linkCopied); } } catch (_) {}
});
qrTrigger.addEventListener('click', () => { document.querySelector('#dialogQrImage').src = qrSource(); document.querySelector('#qrUrl').textContent = cardUrl().replace(/^https:\/\//, ''); qrDialog.showModal(); });
document.querySelector('#qrClose').addEventListener('click', () => qrDialog.close());
document.querySelector('#wechat').addEventListener('click', () => wechatDialog.showModal());
document.querySelector('#wechatQrClose').addEventListener('click', () => wechatDialog.close());
document.querySelector('#qrImage').src = qrSource();
applyLanguage(language);
fitCardToViewport();
window.addEventListener('resize', fitCardToViewport, { passive: true });
