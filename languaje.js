// Selector ES/EN sin dependencias. Mantiene los iconos y los efectos existentes.
const english = {
  "t1": "Home",
  "t2": "Projects",
  "t3": "About me",
  "t4": "Technologies",
  "t5": "Contact",
  "t6": "Hi, I'm",
  "t7": "Multiplatform Application Development student",
  "t8": "Passionate about programming, technology and software development. I enjoy learning new tools, building projects and solving problems through code.",
  "t9": "View projects",
  "t10": "Get in touch",
  "t11": "Download CV",
  "t12": "Game mode",
  "t13": "My projects",
  "t14": "Explore some of the applications I've developed during my software development studies.",
  "t15": "3D Virtual Assistant",
  "t16": "Online Store",
  "t17": "JVEstilo — CSS Generator",
  "t18": "Interactive assistant built with JavaScript and A-Frame. Features a 3D avatar, voice recognition and spoken responses.",
  "t19": "E-commerce application originally developed with Python and Flask. Includes a product catalog, search, filters, shopping cart and simulated checkout.",
  "t20": "Tool originally developed with PHP to generate CSS styles dynamically. Includes an interactive demo where you can customize colors, fonts, spacing, borders and layouts, previewing changes in real time.",
  "t21": "Project available as an interactive demo.",
  "t22": "Interactive demo with catalog, cart and simulated checkout.",
  "t23": "Visual CSS generator available as an interactive demo.",
  "t24": "Explore all my projects",
  "t25": "About me",
  "t26": "I'm a Multiplatform Application Development (DAM) student.",
  "t27": "I'm especially interested in application development, Python, Java, databases and artificial intelligence.",
  "t28": "My goal is to keep improving my skills and gain professional experience in the technology sector.",
  "t29": "On my GitHub, I share some of the projects and exercises I've been working on.",
  "t30": "Technologies",
  "t31": "Tools and programming languages I work with.",
  "t32": "Contact",
  "t33": "Want to get in touch? You can find me on these platforms.",
  "t34": "| Built with HTML, CSS and JavaScript.",
  "demo": "View demo",
  "code": "View code",
  "photo": "Javier Carrasco, aspiring software developer"
};
const spanish = {};
document.querySelectorAll('[data-i18n]').forEach(el => {
  spanish[el.dataset.i18n] ??= Array.from(el.childNodes)
    .filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent.trim()).filter(Boolean).join(' ');
});
const originalAlt = document.querySelector('[data-i18n-alt]')?.alt;
function replaceOwnText(el, value) {
  const nodes = Array.from(el.childNodes).filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
  if (!nodes.length) return;
  nodes[0].textContent = ' ' + value + ' ';
  nodes.slice(1).forEach(n => n.textContent = '');
}
function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    replaceOwnText(el, lang === 'en' ? english[key] : spanish[key]);
  });
  const photo = document.querySelector('[data-i18n-alt]');
  if (photo) photo.alt = lang === 'en' ? english.photo : originalAlt;
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const selected = btn.dataset.lang === lang;
    btn.classList.toggle('active', selected);
    btn.setAttribute('aria-pressed', String(selected));
  });
  document.querySelector('meta[name="description"]').content = lang === 'en'
    ? 'Portfolio of Javier Carrasco, Multiplatform Application Development student.'
    : 'Portafolio de Javier Carrasco, estudiante de Desarrollo de Aplicaciones Multiplataforma.';
  try { localStorage.setItem('portfolio-language', lang); } catch(e) {}
}
document.querySelectorAll('.lang-btn').forEach(btn =>
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang))
);
let initial = 'es';
try { if (localStorage.getItem('portfolio-language') === 'en') initial = 'en'; } catch(e) {}
setLanguage(initial);
