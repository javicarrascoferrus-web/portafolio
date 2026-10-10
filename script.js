

const frases = [
  "python proyectos.py",
  "java Main.java",
  "git status",
  "git push origin main",
  "echo 'Bienvenido a mi portafolio'"
];

const typing = document.getElementById("typing");

let fraseActual = 0;
let letraActual = 0;
let borrando = false;

function escribir() {

  const frase = frases[fraseActual];

  if (!borrando) {

    letraActual++;

    typing.textContent = frase.substring(0, letraActual);

    if (letraActual === frase.length) {
      borrando = true;
      setTimeout(escribir, 1800);
      return;
    }

  } else {

    letraActual--;

    typing.textContent = frase.substring(0, letraActual);

    if (letraActual === 0) {
      borrando = false;
      fraseActual = (fraseActual + 1) % frases.length;
    }

  }

  const velocidad = borrando ? 45 : 90;

  setTimeout(escribir, velocidad);

}


if (typing) {

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    typing.textContent = frases[0];
  } else {
    escribir();
  }

}


const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
