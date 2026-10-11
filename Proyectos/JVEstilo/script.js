

document.addEventListener("DOMContentLoaded", () => {



  const controles = {
    texto: document.getElementById("texto"),
    fondo: document.getElementById("fondo"),
    colorTexto: document.getElementById("colorTexto"),
    tamano: document.getElementById("tamano"),
    padding: document.getElementById("padding"),
    margen: document.getElementById("margen"),
    radio: document.getElementById("radio"),
    borde: document.getElementById("borde"),
    colorBorde: document.getElementById("colorBorde"),
    fuente: document.getElementById("fuente"),
    alineacion: document.getElementById("alineacion"),
    distribucion: document.getElementById("distribucion")
  };

  const preview = document.getElementById("elementoPreview");
  const codigoCSS = document.getElementById("codigoCSS");
  const mensaje = document.getElementById("mensaje");

  const botonCopiar = document.getElementById("copiar");
  const botonRestablecer = document.getElementById("restablecer");


  
  const valoresIniciales = {};

  Object.entries(controles).forEach(([clave, control]) => {
    valoresIniciales[clave] = control.value;
  });



  function actualizarValores() {

    document.getElementById("valorTamano").textContent =
      controles.tamano.value + "px";

    document.getElementById("valorPadding").textContent =
      controles.padding.value + "px";

    document.getElementById("valorMargen").textContent =
      controles.margen.value + "px";

    document.getElementById("valorRadio").textContent =
      controles.radio.value + "px";

    document.getElementById("valorBorde").textContent =
      controles.borde.value + "px";

  }



  function generarPropiedades() {

    const propiedades = [
      ["background-color", controles.fondo.value],
      ["color", controles.colorTexto.value],
      ["font-size", controles.tamano.value + "px"],
      ["font-family", controles.fuente.value],
      ["padding", controles.padding.value + "px"],
      ["margin", controles.margen.value + "px"],
      ["border-radius", controles.radio.value + "px"],
      [
        "border",
        controles.borde.value + "px solid " +
        controles.colorBorde.value
      ],
      ["text-align", controles.alineacion.value],
      ["display", controles.distribucion.value]
    ];

    if (controles.distribucion.value === "flex") {
      propiedades.push(
        ["justify-content", "center"],
        ["align-items", "center"]
      );
    }

    if (controles.distribucion.value === "grid") {
      propiedades.push(
        ["place-items", "center"]
      );
    }

    return propiedades;
  }


  function actualizarPreview() {

    actualizarValores();

    preview.textContent = controles.texto.value;

    const propiedades = generarPropiedades();

    // Evita dejar estilos antiguos al cambiar
    // entre block, flex y grid.

    preview.removeAttribute("style");

    propiedades.forEach(([propiedad, valor]) => {
      preview.style.setProperty(propiedad, valor);
    });



    
    const lineas = propiedades.map(
      ([propiedad, valor]) =>
        `  ${propiedad}: ${valor};`
    );

    codigoCSS.textContent =
      `.mi-elemento {\n${lineas.join("\n")}\n}`;

  }



  Object.values(controles).forEach(control => {

    control.addEventListener("input", actualizarPreview);

    control.addEventListener("change", actualizarPreview);

  });

 

  botonRestablecer.addEventListener("click", () => {

    Object.entries(controles).forEach(([clave, control]) => {
      control.value = valoresIniciales[clave];
    });

    mensaje.textContent = "Estilos restablecidos.";

    actualizarPreview();

  });

 

  botonCopiar.addEventListener("click", async () => {

    const css = codigoCSS.textContent;

    try {

      if (navigator.clipboard && window.isSecureContext) {

        await navigator.clipboard.writeText(css);

      } else {

        // Alternativa para navegadores antiguos

        const temporal = document.createElement("textarea");

        temporal.value = css;
        temporal.style.position = "fixed";
        temporal.style.opacity = "0";

        document.body.appendChild(temporal);

        temporal.select();

        const copiado = document.execCommand("copy");

        temporal.remove();

        if (!copiado) {
          throw new Error("No se pudo copiar el CSS");
        }

      }

      mensaje.textContent =
        "¡CSS copiado al portapapeles!";

    } catch (error) {

      mensaje.textContent =
        "No se pudo copiar automáticamente. Selecciona el código y cópialo manualmente.";

    }

  });

  actualizarPreview();

});
