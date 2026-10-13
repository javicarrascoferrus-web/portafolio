
const dictionary = {
  "es": {
    "t1": "Inicio",
    "t2": "Proyectos",
    "t3": "Sobre mí",
    "t4": "Tecnologías",
    "t5": "Contacto",
    "t6": "Hola, soy",
    "t7": "Estudiante de Desarrollo de Aplicaciones Multiplataforma",
    "t8": "Apasionado por la programación, la tecnología\n              y el desarrollo de software.\n              Me gusta aprender nuevas herramientas,\n              crear proyectos y resolver problemas\n              mediante código.",
    "t9": "Ver proyectos",
    "t10": "Contactar",
    "t11": "Descargar CV",
    "t12": "Modo videojuego",
    "t13": "Mis proyectos",
    "t14": "Explora algunas de las aplicaciones que he desarrollado\n      durante mi formación como programador.",
    "t15": "Asistente Virtual 3D",
    "t18": "Asistente interactivo desarrollado con JavaScript\n            y A-Frame. Incluye un avatar tridimensional,\n            reconocimiento de voz y respuestas habladas.",
    "demo": "Ver demo",
    "code": "Ver código",
    "t21": "Proyecto disponible para demostración interactiva.",
    "t16": "Tienda Online",
    "t19": "Aplicación de comercio electrónico desarrollada\n            originalmente con Python y Flask. Incluye\n            catálogo de productos, buscador, filtros,\n            carrito de compras y simulación de compra.",
    "t22": "Demo interactiva con catálogo, carrito y compra simulada.",
    "t17": "JVEstilo — Generador CSS",
    "t20": "Herramienta desarrollada originalmente con PHP\n            para generar estilos CSS de forma dinámica.\n            Incluye una demo interactiva donde puedes\n            personalizar colores, tipografías, márgenes,\n            bordes y distribuciones, visualizando\n            los cambios en tiempo real.",
    "t23": "Generador visual de CSS disponible para demostración interactiva.",
    "t24": "Explorar todos mis proyectos",
    "t25": "Sobre mí",
    "t26": "Soy estudiante de Desarrollo de Aplicaciones\n        Multiplataforma (DAM).",
    "t27": "Me interesa especialmente el desarrollo\n        de aplicaciones, Python, Java,\n        las bases de datos y la inteligencia artificial.",
    "t28": "Mi objetivo es seguir mejorando mis habilidades\n        y adquirir experiencia profesional\n        en el sector tecnológico.",
    "t29": "En mi GitHub comparto algunos de los proyectos\n        y ejercicios que voy realizando.",
    "t30": "Tecnologías",
    "t31": "Herramientas y lenguajes con los que trabajo.",
    "t32": "Contacto",
    "t33": "¿Quieres contactar conmigo?\n      Puedes encontrarme en estas plataformas.",
    "footerSuffix": " | Desarrollado con HTML, CSS y JavaScript."
  },
  "en": {
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
    "photo": "Javier Carrasco, aspiring software developer",
    "footerSuffix": " | Built with HTML, CSS and JavaScript."
  }
};
function setPortfolioLanguage(lang) {
  if (!dictionary[lang]) return;
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-translation-text]').forEach(element => {
    const key = element.dataset.translationText;
    if (dictionary[lang][key] !== undefined) element.textContent = dictionary[lang][key];
  });
  const photo = document.querySelector('[data-i18n-alt]');
  if (photo) photo.alt = lang === 'en' ? dictionary.en.photo : 'Javier Carrasco, desarrollador en formación';
  document.querySelectorAll('.lang-btn').forEach(button => {
    const active = button.dataset.lang === lang;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = lang === 'en' ? 'Portfolio of Javier Carrasco, Multiplatform Application Development student.' : 'Portafolio de Javier Carrasco, estudiante de Desarrollo de Aplicaciones Multiplataforma.';
  try { localStorage.setItem('portfolio-language', lang); } catch (error) {}
}
document.querySelectorAll('.lang-btn').forEach(button => {
  button.addEventListener('click', () => setPortfolioLanguage(button.dataset.lang));
});
let initialLanguage = 'es';
try { if (localStorage.getItem('portfolio-language') === 'en') initialLanguage = 'en'; } catch (error) {}
setPortfolioLanguage(initialLanguage);
