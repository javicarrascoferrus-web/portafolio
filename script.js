


document.addEventListener("DOMContentLoaded", () => {


  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }




  const typing = document.getElementById("typing");

  const comandos = [
    "echo 'Bienvenido a mi portafolio'",
    "ls proyectos/",
    "git status",
    "java Developer",
    "python3 proyectos.py",
    "echo 'Siempre aprendiendo...'"
  ];

  const reducirMovimiento = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (typing) {

    if (reducirMovimiento) {

      typing.textContent = comandos[0];

    } else {

      let indiceComando = 0;
      let indiceLetra = 0;
      let borrando = false;

      function escribir() {

        const comandoActual = comandos[indiceComando];

        if (!borrando) {

          indiceLetra++;

          typing.textContent = comandoActual.substring(
            0,
            indiceLetra
          );

          if (indiceLetra === comandoActual.length) {

            borrando = true;

            setTimeout(escribir, 2200);
            return;

          }

        } else {

          indiceLetra--;

          typing.textContent = comandoActual.substring(
            0,
            indiceLetra
          );

          if (indiceLetra === 0) {

            borrando = false;

            indiceComando =
              (indiceComando + 1) % comandos.length;

            setTimeout(escribir, 500);
            return;

          }

        }

        setTimeout(
          escribir,
          borrando ? 35 : 75
        );

      }

      setTimeout(escribir, 1000);

    }

  }




  const elementosAnimados = document.querySelectorAll(
    ".section, .projects-terminal, .about-terminal, .tech, .contact-links"
  );

  if (
    reducirMovimiento ||
    !("IntersectionObserver" in window)
  ) {

    elementosAnimados.forEach(elemento => {
      elemento.classList.add("visible");
    });

  } else {

    const observador = new IntersectionObserver(
      (entradas, observer) => {

        entradas.forEach(entrada => {

          if (entrada.isIntersecting) {

            entrada.target.classList.add("visible");

            observer.unobserve(entrada.target);

          }

        });

      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    elementosAnimados.forEach(elemento => {
      observador.observe(elemento);
    });

  }




  const proyectos = document.querySelectorAll(
    ".project-info"
  );

  proyectos.forEach(proyecto => {

    proyecto.addEventListener("mouseenter", () => {
      proyecto.classList.add("proyecto-activo");
    });

    proyecto.addEventListener("mouseleave", () => {
      proyecto.classList.remove("proyecto-activo");
    });

  });


 

  const enlacesNavegacion = document.querySelectorAll(
    '.nav-links a[href^="#"]'
  );

  const secciones = document.querySelectorAll(
    "header[id], section[id]"
  );

  if ("IntersectionObserver" in window) {

    const observadorNavegacion = new IntersectionObserver(
      entradas => {

        entradas.forEach(entrada => {

          if (!entrada.isIntersecting) {
            return;
          }

          const id = entrada.target.id;

          enlacesNavegacion.forEach(enlace => {

            const activo =
              enlace.getAttribute("href") === "#" + id;

            enlace.classList.toggle(
              "nav-activo",
              activo
            );

          });

        });

      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0
      }
    );

    secciones.forEach(seccion => {
      observadorNavegacion.observe(seccion);
    });

  }




  const botones = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .github-button"
  );

  botones.forEach(boton => {

    boton.addEventListener("click", () => {

      if (reducirMovimiento) {
        return;
      }

      boton.classList.remove("boton-pulsado");

      // Reiniciar animación CSS
      void boton.offsetWidth;

      boton.classList.add("boton-pulsado");

    });

    boton.addEventListener("animationend", () => {
      boton.classList.remove("boton-pulsado");
    });

  });

});
