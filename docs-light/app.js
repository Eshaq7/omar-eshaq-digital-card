const card = document.querySelector('#card');
const logoDisc = document.querySelector('#logoDisc');
const toast = document.querySelector('#toast');
const languageToggle = document.querySelector('#languageToggle');
const qrTrigger = document.querySelector('#qrTrigger');
const qrDialog = document.querySelector('#qrDialog');
let toastTimer;
let currentLanguage = localStorage.getItem('card-language') || 'en';

const translations = {
  en: {
    digital: 'Digital contact', availability: 'Available for business',
    name: 'Omar Abdullah <span>Eshaq</span>', role: 'Assistant General Manager', company: 'Eshaq Trading Company',
    hint: 'Tap an icon to connect', phone: 'Phone', email: 'Email', location: 'Location', locationValue: 'Yemen, Sana’a',
    wechatHint: 'Number copied automatically', wechat: 'Add on WeChat', established: 'Established 1995',
    rail: ['Call', 'Email', 'WhatsApp', 'Location', 'Save'],
    aria: ['Call Omar', 'Email Omar', 'Chat with Omar on WhatsApp', 'Open location in maps', 'Save contact'],
    cardAria: 'Digital business card for Omar Abdullah Eshaq', shareAria: 'Share this contact card',
    languageAria: 'Switch card to Arabic', languageTitle: 'العربية', languageCode: 'AR', qrAria: 'Show card QR code',
    qrTitle: 'Scan to open my card', qrDescription: 'Point your camera at this code to save or share this digital contact.', qrClose: 'Close QR code',
    phoneCopy: 'Phone number', emailCopy: 'Email address', copyFailed: 'Could not copy this value',
    linkCopied: 'Card link copied', wechatToast: 'Phone number copied — opening WeChat'
  },
  ar: {
    digital: 'بطاقة اتصال رقمية', availability: 'متاح للأعمال',
    name: 'عمر عبدالله <span>إسحاق</span>', role: 'مساعد المدير العام', company: 'شركة إسحاق التجارية',
    hint: 'اضغط على أيقونة للتواصل', phone: 'الهاتف', email: 'البريد الإلكتروني', location: 'الموقع', locationValue: 'اليمن، صنعاء',
    wechatHint: 'يُنسخ الرقم تلقائيًا', wechat: 'إضافة على WeChat', established: 'تأسست عام 1995',
    rail: ['اتصال', 'البريد', 'واتساب', 'الموقع', 'حفظ'],
    aria: ['الاتصال بعمر', 'مراسلة عمر بالبريد', 'محادثة عمر عبر واتساب', 'فتح الموقع على الخريطة', 'حفظ جهة الاتصال'],
    cardAria: 'بطاقة الاتصال الرقمية لعمر عبدالله إسحاق', shareAria: 'مشاركة بطاقة الاتصال',
    languageAria: 'تحويل البطاقة إلى الإنجليزية', languageTitle: 'English', languageCode: 'EN', qrAria: 'إظهار رمز QR للبطاقة',
    qrTitle: 'امسح الرمز لفتح بطاقتي', qrDescription: 'وجّه كاميرا هاتفك إلى الرمز لحفظ بطاقة الاتصال أو مشاركتها.', qrClose: 'إغلاق رمز QR',
    phoneCopy: 'رقم الهاتف', emailCopy: 'عنوان البريد الإلكتروني', copyFailed: 'تعذر نسخ هذه المعلومة',
    linkCopied: 'تم نسخ رابط البطاقة', wechatToast: 'تم نسخ رقم الهاتف — جارٍ فتح WeChat'
  }
};

function fitCardToViewport() {
  card.style.zoom = '1';
  if (window.innerWidth <= 580) return;
  const scale = Math.min(1, (window.innerWidth - 28) / card.offsetWidth, (window.innerHeight - 28) / card.scrollHeight);
  card.style.zoom = String(Math.max(0.55, scale));
}

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : 'en';
  const t = translations[currentLanguage];
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
  card.setAttribute('aria-label', t.cardAria);
  document.querySelector('#digitalLabel').lastChild.textContent = ` ${t.digital}`;
  document.querySelector('#availability').lastChild.textContent = ` ${t.availability}`;
  document.querySelector('#personName').innerHTML = t.name;
  document.querySelector('#personRole').textContent = t.role;
  document.querySelector('#companyName').textContent = t.company;
  document.querySelector('#sheetHint').textContent = t.hint;
  document.querySelector('#phoneLabel').textContent = t.phone;
  document.querySelector('#emailLabel').textContent = t.email;
  document.querySelector('#locationLabel').textContent = t.location;
  document.querySelector('#locationValue').textContent = t.locationValue;
  document.querySelector('#wechatHint').textContent = t.wechatHint;
  document.querySelector('#wechatLabel').textContent = t.wechat;
  document.querySelector('#footerCompany').textContent = t.company;
  document.querySelector('#footerEstablished').textContent = t.established;
  document.querySelectorAll('.rail-action').forEach((action, index) => {
    action.dataset.label = t.rail[index];
    action.setAttribute('aria-label', t.aria[index]);
  });
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons[0].dataset.copyLabel = t.phoneCopy;
  copyButtons[0].setAttribute('aria-label', currentLanguage === 'ar' ? 'نسخ رقم الهاتف' : 'Copy phone number');
  copyButtons[1].dataset.copyLabel = t.emailCopy;
  copyButtons[1].setAttribute('aria-label', currentLanguage === 'ar' ? 'نسخ البريد الإلكتروني' : 'Copy email address');
  document.querySelector('#share').setAttribute('aria-label', t.shareAria);
  qrTrigger.setAttribute('aria-label', t.qrAria);
  qrTrigger.title = currentLanguage === 'ar' ? 'رمز QR' : 'QR Code';
  document.querySelector('#qrTitle').textContent = t.qrTitle;
  document.querySelector('#qrDescription').textContent = t.qrDescription;
  document.querySelector('#qrClose').setAttribute('aria-label', t.qrClose);
  languageToggle.setAttribute('aria-label', t.languageAria);
  languageToggle.title = t.languageTitle;
  languageToggle.querySelector('b').textContent = t.languageCode;
  localStorage.setItem('card-language', currentLanguage);
  requestAnimationFrame(fitCardToViewport);
}

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
      showToast(currentLanguage === 'ar' ? `تم نسخ ${button.dataset.copyLabel}` : `${button.dataset.copyLabel} copied`);
    } catch {
      showToast(translations[currentLanguage].copyFailed);
    }
  });
});

document.querySelector('#share').addEventListener('click', async () => {
  const data = {
    title: currentLanguage === 'ar' ? 'عمر عبدالله إسحاق' : 'Omar Abdullah Eshaq',
    text: currentLanguage === 'ar' ? 'بطاقة الاتصال الرقمية لعمر عبدالله إسحاق — شركة إسحاق التجارية' : 'Digital contact card for Omar Abdullah Eshaq — Eshaq Trading Company',
    url: location.href,
  };
  try {
    if (navigator.share) await navigator.share(data);
    else {
      await navigator.clipboard.writeText(location.href);
      showToast(translations[currentLanguage].linkCopied);
    }
  } catch (_) {}
});

document.querySelector('#wechat').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('+967776060802'); } catch (_) {}
  showToast(translations[currentLanguage].wechatToast);
  location.href = 'weixin://';
});

languageToggle.addEventListener('click', () => {
  applyLanguage(currentLanguage === 'en' ? 'ar' : 'en');
});

qrTrigger.addEventListener('click', () => {
  const cardUrl = `${location.origin}${location.pathname}`;
  document.querySelector('#qrImage').src = `https://api.qrserver.com/v1/create-qr-code/?size=420x420&margin=14&format=png&data=${encodeURIComponent(cardUrl)}`;
  document.querySelector('#qrUrl').textContent = cardUrl.replace(/^https:\/\//, '');
  qrDialog.showModal();
});

document.querySelector('#qrClose').addEventListener('click', () => qrDialog.close());

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

applyLanguage(currentLanguage);
fitCardToViewport();
window.addEventListener('resize', fitCardToViewport, { passive: true });
