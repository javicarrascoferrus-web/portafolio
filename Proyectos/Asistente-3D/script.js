
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

function generarRespuesta(texto) {
  const mensaje = texto.toLowerCase();

  if (mensaje.includes("hola") || mensaje.includes("buenas")) {
    return "¡Hola! Soy Javi Bot, tu asistente virtual 3D. ¿En qué puedo ayudarte?";
  }

  if (mensaje.includes("proyecto")) {
    return "Javier ha desarrollado proyectos con Python, JavaScript, PHP y otras tecnologías. Puedes explorar sus trabajos en el portafolio.";
  }

  if (mensaje.includes("tecnologia") || mensaje.includes("tecnología")) {
    return "Javier trabaja con Python, Java, HTML, CSS, JavaScript y bases de datos.";
  }

  if (mensaje.includes("contacto") || mensaje.includes("correo")) {
    return "Puedes contactar con Javier mediante el correo electrónico que aparece en su portafolio.";
  }

  if (mensaje.includes("servicio")) {
    return "Esta demostración muestra una interfaz conversacional, reconocimiento de voz, síntesis de voz y un avatar tridimensional.";
  }

  if (mensaje.includes("inteligencia artificial") || mensaje.includes(" ia ")) {
    return "La inteligencia artificial permite crear sistemas capaces de analizar información y generar respuestas. Esta demostración utiliza respuestas programadas, no un modelo de IA generativa.";
  }

  if (mensaje.includes("gracias")) {
    return "¡De nada! Ha sido un placer ayudarte.";
  }

  if (mensaje.includes("adios") || mensaje.includes("adiós")) {
    return "¡Hasta pronto! Gracias por visitar el portafolio de Javier.";
  }

  return "No tengo una respuesta específica para esa pregunta. Puedes consultarme sobre proyectos, tecnologías o contacto.";
}

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
    estado.textContent = "El asistente está hablando...";
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

botonVoz.addEventListener("click", () => {
  if (ultimaRespuesta) {
    leerTexto(ultimaRespuesta);
  } else {
    estado.textContent = "Todavía no hay una respuesta para leer.";
  }
});

botonSilenciar.addEventListener("click", () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  detenerBoca();
  estado.textContent = "Voz detenida.";
});

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
      estado.textContent = "El micrófono ya está activo o no se pudo iniciar.";
    }
  });

  reconocimiento.onresult = (event) => {
    const texto = event.results[0][0].transcript;

    input.value = texto;
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
  estado.textContent =
    "Este navegador no soporta reconocimiento de voz.";
}
