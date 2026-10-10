
const formulario = document.getElementById("formulario");
const input = document.getElementById("mensaje");
const respuesta = document.getElementById("respuesta");
const estado = document.getElementById("estado");

const botonMic = document.getElementById("mic");
const botonVoz = document.getElementById("voz");
const botonSilenciar = document.getElementById("silenciar");
const boca = document.getElementById("boca");

let ultimaRespuesta = "";
let intervaloBoca = null;
let ultimaCategoria = null;
let contadorRespuestas = 0;

// DATOS DEL PORTAFOLIO
const perfil = {
  nombre: "Javier Carrasco",
  estudios: "Desarrollo de Aplicaciones Multiplataforma (DAM)",
  email: "javicarrascoferrus@gmail.com",
  github: "https://github.com/javicarrascoferrus-web",
  linkedin: "https://www.linkedin.com/in/javier-carrasco-9211b0356/",
  web: "https://javicarrascoferrus-web.github.io/portafolio/"
};

// BASE DE CONOCIMIENTO
const conocimientos = [
  {
    categoria: "saludos",
    palabras: ["hola", "buenas", "hey", "saludos", "buenos dias"],
    respuestas: [
      "¡Hola! Soy Javi Bot. Puedes preguntarme sobre Javier, sus proyectos, estudios o tecnologías.",
      "¡Bienvenido al portafolio de Javier Carrasco! ¿Quieres conocer sus proyectos?",
      "¡Hola! Estoy aquí para ayudarte a descubrir el trabajo de Javier."
    ]
  },
  {
    categoria: "identidad",
    palabras: [
      "quien es javier", "quien es javi",
      "hablame de javier", "sobre javier",
      "quien eres", "presentate", "sobre ti"
    ],
    respuestas: [
      "Javier Carrasco es estudiante de Desarrollo de Aplicaciones Multiplataforma y le apasionan la programación, la tecnología y el desarrollo de software.",
      "Javier es un desarrollador en formación interesado en crear aplicaciones, aprender nuevas herramientas y resolver problemas mediante código."
    ]
  },
  {
    categoria: "estudios",
    palabras: [
      "estudios", "estudia", "formacion", "dam",
      "ciclo", "titulacion", "academica",
      "que ha estudiado"
    ],
    respuestas: [
      "Javier estudia Desarrollo de Aplicaciones Multiplataforma, conocido como DAM, un ciclo de Formación Profesional de Grado Superior.",
      "Su formación está orientada al desarrollo de software, programación, bases de datos y aplicaciones multiplataforma."
    ]
  },
  {
    categoria: "proyectos",
    palabras: [
      "proyectos", "trabajos", "aplicaciones",
      "portfolio", "portafolio", "que ha creado",
      "que ha desarrollado"
    ],
    respuestas: [
      "Entre sus proyectos están el Asistente Virtual 3D, una tienda online con Flask, JVEstilo y JAVI_OS, un videojuego interactivo.",
      "Javier ha trabajado en proyectos de desarrollo web, backend, herramientas CSS y experiencias interactivas. Puedes verlos desde la sección Proyectos."
    ]
  },
  {
    categoria: "asistente",
    palabras: [
      "asistente virtual", "javi bot", "javibot",
      "avatar", "robot", "como funcionas",
      "como estas hecho"
    ],
    respuestas: [
      "Soy Javi Bot, un asistente virtual creado con HTML, CSS, JavaScript y A-Frame. Tengo un avatar 3D, reconocimiento de voz y respuestas programadas.",
      "Funciono mediante una base de conocimientos y detección de palabras clave. No utilizo un modelo de inteligencia artificial generativa."
    ]
  },
  {
    categoria: "tienda",
    palabras: [
      "tienda", "flask", "comercio electronico",
      "carrito", "compras"
    ],
    respuestas: [
      "Javier desarrolló una tienda online básica con Python y Flask, que incluye catálogo de productos, carrito de compras y una simulación de finalización de compra.",
      "Su proyecto de tienda online demuestra el uso de rutas, formularios y sesiones en Flask."
    ]
  },
  {
    categoria: "jvestilo",
    palabras: [
      "jvestilo", "libreria css", "generador css",
      "estilos dinamicos"
    ],
    respuestas: [
      "JVEstilo es una librería desarrollada con PHP que genera automáticamente clases CSS para márgenes, tamaños, colores, Flexbox y Grid.",
      "Con JVEstilo, Javier exploró la generación dinámica de estilos CSS utilizando funciones y bucles en PHP."
    ]
  },
  {
    categoria: "juego",
    palabras: [
      "videojuego", "juego", "javi_os", "modo videojuego",
      "pixel art"
    ],
    respuestas: [
      "JAVI_OS es una experiencia interactiva con estética pixel art que permite explorar el portafolio de Javier como si fuera un videojuego.",
      "Puedes probar el modo videojuego desde la página principal del portafolio."
    ]
  },
  {
    categoria: "tecnologias",
    palabras: [
      "tecnologias", "lenguajes", "herramientas",
      "programar", "programacion", "stack",
      "que sabe hacer", "conocimientos"
    ],
    respuestas: [
      "Javier trabaja con Python, Java, HTML5, CSS3, JavaScript, PHP, SQLite, GitHub y Visual Studio Code.",
      "Sus conocimientos abarcan programación, desarrollo web, bases de datos y herramientas de desarrollo."
    ]
  },
  {
    categoria: "python",
    palabras: ["python"],
    respuestas: [
      "Javier utiliza Python para desarrollar aplicaciones y ha trabajado con Flask en su proyecto de tienda online."
    ]
  },
  {
    categoria: "java",
    palabras: ["java"],
    respuestas: [
      "Java forma parte de las tecnologías que Javier estudia en Desarrollo de Aplicaciones Multiplataforma."
    ]
  },
  {
    categoria: "javascript",
    palabras: ["javascript", "js", "a-frame", "aframe"],
    respuestas: [
      "JavaScript es una de las tecnologías utilizadas en este asistente y en las experiencias interactivas del portafolio de Javier."
    ]
  },
  {
    categoria: "php",
    palabras: ["php"],
    respuestas: [
      "Javier ha utilizado PHP para desarrollar JVEstilo, una herramienta que genera clases CSS automáticamente."
    ]
  },
  {
    categoria: "basesdatos",
    palabras: [
      "base de datos", "bases de datos", "sqlite", "sql"
    ],
    respuestas: [
      "Javier tiene conocimientos de SQL y SQLite, tecnologías utilizadas para almacenar y consultar información en aplicaciones."
    ]
  },
  {
    categoria: "contacto",
    palabras: [
      "contacto", "contactar", "correo", "email",
      "escribirle", "hablar con javier"
    ],
    respuestas: [
      `Puedes contactar con Javier mediante su correo electrónico: ${perfil.email}.`,
      `Para contactar con Javier, utiliza el email ${perfil.email} o su perfil de LinkedIn.`
    ]
  },
  {
    categoria: "github",
    palabras: ["github", "repositorio", "codigo fuente"],
    respuestas: [
      `Puedes consultar el perfil de GitHub de Javier en ${perfil.github}. Allí comparte sus proyectos y ejercicios.`
    ]
  },
  {
    categoria: "linkedin",
    palabras: ["linkedin"],
    respuestas: [
      `Puedes encontrar a Javier en LinkedIn: ${perfil.linkedin}.`
    ]
  },
  {
    categoria: "objetivos",
    palabras: [
      "objetivo", "futuro", "aspiraciones",
      "metas", "trabajo", "empleo", "profesional"
    ],
    respuestas: [
      "El objetivo de Javier es seguir mejorando sus habilidades y adquirir experiencia profesional en el sector tecnológico.",
      "Javier quiere continuar aprendiendo y desarrollar su carrera profesional en el mundo del software."
    ]
  },
  {
    categoria: "agradecimiento",
    palabras: ["gracias", "muchas gracias"],
    respuestas: [
      "¡De nada! Ha sido un placer ayudarte.",
      "¡Encantado! Si quieres, puedes seguir preguntándome sobre Javier."
    ]
  },
  {
    categoria: "despedida",
    palabras: ["adios", "hasta luego", "nos vemos", "chao"],
    respuestas: [
      "¡Hasta pronto! Gracias por visitar el portafolio.",
      "¡Nos vemos! Espero que hayas disfrutado conociendo los proyectos de Javier."
    ]
  }
];

// NORMALIZAR TEXTO
function normalizar(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9_ ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// BUSCAR RESPUESTA
function generarRespuesta(texto) {
  const mensaje = normalizar(texto);
  const mensajeCompleto = ` ${mensaje} `;

  let mejorCategoria = null;
  let mejorPuntuacion = 0;

  for (const conocimiento of conocimientos) {
    let puntuacion = 0;

    for (const palabra of conocimiento.palabras) {
      const clave = normalizar(palabra);

      if (mensajeCompleto.includes(` ${clave} `)) {
        puntuacion += clave.split(" ").length * 2;
      }
    }

    if (puntuacion > mejorPuntuacion) {
      mejorPuntuacion = puntuacion;
      mejorCategoria = conocimiento;
    }
  }

  if (!mejorCategoria) {
    return "No tengo información suficiente para responder a eso. Puedes preguntarme sobre Javier, sus estudios, tecnologías, proyectos o cómo contactar con él.";
  }

  const opciones = mejorCategoria.respuestas;

  let indice = contadorRespuestas % opciones.length;

  if (
    mejorCategoria.categoria === ultimaCategoria &&
    opciones.length > 1
  ) {
    indice = (indice + 1) % opciones.length;
  }

  contadorRespuestas++;
  ultimaCategoria = mejorCategoria.categoria;

  return opciones[indice];
}

// MOSTRAR MENSAJES SIN INTERPRETAR HTML
function agregarMensaje(autor, texto, tipo) {
  const div = document.createElement("div");
  div.className = "mensaje " + tipo;

  const strong = document.createElement("strong");
  strong.textContent = autor;

  const p = document.createElement("p");
  p.textContent = texto;

  div.appendChild(strong);
  div.appendChild(p);

  respuesta.appendChild(div);
  respuesta.scrollTop = respuesta.scrollHeight;
}

// ANIMAR BOCA
function animarBoca() {
  detenerBoca();

  if (!boca) return;

  intervaloBoca = setInterval(() => {
    const altura = 0.04 + Math.random() * 0.14;
    boca.setAttribute("height", altura);
  }, 130);
}

function detenerBoca() {
  if (intervaloBoca !== null) {
    clearInterval(intervaloBoca);
    intervaloBoca = null;
  }

  if (boca) {
    boca.setAttribute("height", 0.045);
  }
}

// VOZ DEL ROBOT
function leerTexto(texto) {
  if (!("speechSynthesis" in window)) {
    estado.textContent = "Tu navegador no soporta síntesis de voz.";
    return;
  }

  window.speechSynthesis.cancel();
  detenerBoca();

  const voz = new SpeechSynthesisUtterance(texto);

  voz.lang = "es-ES";
  voz.rate = 1;
  voz.pitch = 1;

  voz.onstart = () => {
    estado.textContent = "Javi Bot está hablando...";
    animarBoca();
  };

  voz.onend = () => {
    estado.textContent = "Respuesta finalizada.";
    detenerBoca();
  };

  voz.onerror = () => {
    estado.textContent = "No se pudo reproducir la voz.";
    detenerBoca();
  };

  window.speechSynthesis.speak(voz);
}

// ENVIAR MENSAJES
formulario.addEventListener("submit", (event) => {
  event.preventDefault();

  const texto = input.value.trim();

  if (!texto) return;

  agregarMensaje("Tú", texto, "usuario");

  const contestacion = generarRespuesta(texto);

  agregarMensaje("Javi Bot", contestacion, "bot");

  ultimaRespuesta = contestacion;
  input.value = "";

  leerTexto(contestacion);
});

// REPETIR RESPUESTA
botonVoz.addEventListener("click", () => {
  if (ultimaRespuesta) {
    leerTexto(ultimaRespuesta);
  } else {
    estado.textContent = "Todavía no hay una respuesta para leer.";
  }
});

// SILENCIAR
botonSilenciar.addEventListener("click", () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  detenerBoca();
  estado.textContent = "Voz detenida.";
});

// RECONOCIMIENTO DE VOZ
const SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition;

if (SpeechRecognition) {
  const reconocimiento = new SpeechRecognition();

  reconocimiento.lang = "es-ES";
  reconocimiento.continuous = false;
  reconocimiento.interimResults = false;

  botonMic.addEventListener("click", () => {
    try {
      estado.textContent = "Escuchando...";
      reconocimiento.start();
    } catch (error) {
      estado.textContent = "No se pudo iniciar el micrófono.";
    }
  });

  reconocimiento.onresult = (event) => {
    input.value = event.results[0][0].transcript;
    estado.textContent = "Texto detectado. Pulsa Enviar.";
    input.focus();
  };

  reconocimiento.onerror = (event) => {
    estado.textContent = "Error del micrófono: " + event.error;
  };

  reconocimiento.onend = () => {
    if (estado.textContent === "Escuchando...") {
      estado.textContent = "Reconocimiento finalizado.";
    }
  };
} else {
  botonMic.disabled = true;
  estado.textContent = "Este navegador no soporta reconocimiento de voz.";
}
