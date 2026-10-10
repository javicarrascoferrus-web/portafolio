const formulario = document.getElementById('formulario');
const input = document.getElementById('mensaje');
const respuesta = document.getElementById('respuesta');
const estado = document.getElementById('estado');
const botonMic = document.getElementById('mic');
const botonVoz = document.getElementById('voz');
const botonSilenciar = document.getElementById('silenciar');
const boca = document.getElementById('boca');
let ultimaRespuesta = '¡Hola! Pregúntame por mis servicios, tecnología, proyectos o contacto.';

function generarRespuesta(texto) {
  const mensaje = texto.toLocaleLowerCase('es');
  if (/hola|buenas|buenos días/.test(mensaje)) return '¡Hola! Soy JAVI_BOT, tu asistente virtual 3D. ¿En qué puedo ayudarte?';
  if (/servicio|servicios/.test(mensaje)) return 'Puedo mostrarte proyectos de desarrollo web, automatización y asistentes virtuales.';
  if (/contacto|correo|email/.test(mensaje)) return 'Puedes visitar la sección de contacto del portafolio de Javier Carrasco.';
  if (/proyecto|portafolio/.test(mensaje)) return 'En el portafolio encontrarás una tienda con Flask, una librería CSS con PHP y este asistente 3D.';
  if (/tecnolog|javascript|python|php/.test(mensaje)) return 'Este asistente utiliza HTML, CSS, JavaScript, A-Frame y las API de voz del navegador.';
  if (/\bia\b|inteligencia artificial/.test(mensaje)) return 'La inteligencia artificial permite automatizar tareas. Esta demo, sin embargo, responde mediante reglas programadas, no mediante IA generativa.';
  if (/gracias|adiós|adios/.test(mensaje)) return '¡Gracias por visitarme! Puedes seguir explorando el portafolio.';
  return 'Todavía tengo respuestas limitadas. Prueba a preguntarme por proyectos, tecnologías, servicios o contacto.';
}

function agregarMensaje(autor, texto, tipo) {
  const contenedor = document.createElement('div');
  contenedor.className = `message ${tipo}`;
  const titulo = document.createElement('strong');
  titulo.textContent = autor;
  const parrafo = document.createElement('p');
  parrafo.textContent = texto; // Evita inyectar HTML del visitante.
  contenedor.append(titulo, parrafo);
  respuesta.appendChild(contenedor);
  respuesta.scrollTop = respuesta.scrollHeight;
}

function animarBoca(activa) {
  if (!boca) return;
  boca.setAttribute('height', activa ? '0.11' : '0.035');
  boca.setAttribute('animation', activa
    ? 'property: scale; from: 1 1 1; to: 1 2.5 1; dir: alternate; loop: true; dur: 160'
    : 'property: scale; to: 1 1 1; dur: 100');
}

function leerTexto(texto) {
  if (!('speechSynthesis' in window)) {
    estado.textContent = 'Este navegador no permite síntesis de voz.';
    return;
  }
  speechSynthesis.cancel();
  animarBoca(false);
  const frase = new SpeechSynthesisUtterance(texto);
  frase.lang = 'es-ES';
  frase.rate = 1;
  frase.onstart = () => animarBoca(true);
  frase.onend = () => animarBoca(false);
  frase.onerror = () => animarBoca(false);
  speechSynthesis.speak(frase);
}

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (!texto) return;
  agregarMensaje('Tú', texto, 'user');
  ultimaRespuesta = generarRespuesta(texto);
  agregarMensaje('Robot', ultimaRespuesta, 'assistant');
  input.value = '';
  leerTexto(ultimaRespuesta);
});

botonVoz.addEventListener('click', () => leerTexto(ultimaRespuesta));
botonSilenciar.addEventListener('click', () => {
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  animarBoca(false);
  estado.textContent = 'Voz detenida.';
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
  const reconocimiento = new SpeechRecognition();
  reconocimiento.lang = 'es-ES';
  reconocimiento.continuous = false;
  reconocimiento.interimResults = false;
  botonMic.addEventListener('click', () => {
    try { reconocimiento.start(); estado.textContent = 'Escuchando...'; }
    catch { estado.textContent = 'El reconocimiento ya está activo o no pudo iniciarse.'; }
  });
  reconocimiento.onresult = (evento) => {
    input.value = evento.results[0][0].transcript;
    estado.textContent = 'Texto detectado. Pulsa Enviar para responder.';
    input.focus();
  };
  reconocimiento.onerror = (evento) => { estado.textContent = `No se pudo usar el micrófono (${evento.error}).`; };
  reconocimiento.onend = () => {
    if (estado.textContent === 'Escuchando...') estado.textContent = 'Escucha finalizada.';
  };
} else {
  botonMic.disabled = true;
  estado.textContent = 'El reconocimiento de voz no está disponible en este navegador.';
}
