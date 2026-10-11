

const productos = [
  {
    id: 1,
    nombre: "Teclado mecánico",
    categoria: "perifericos",
    precio: 59.99,
    imagen: "⌨️",
    descripcion: "Teclado mecánico para programación y gaming."
  },
  {
    id: 2,
    nombre: "Ratón inalámbrico",
    categoria: "perifericos",
    precio: 29.99,
    imagen: "🖱️",
    descripcion: "Ratón ergonómico con conexión inalámbrica."
  },
  {
    id: 3,
    nombre: "Auriculares",
    categoria: "audio",
    precio: 79.99,
    imagen: "🎧",
    descripcion: "Auriculares con micrófono y sonido envolvente."
  },
  {
    id: 4,
    nombre: "Altavoz Bluetooth",
    categoria: "audio",
    precio: 39.99,
    imagen: "🔊",
    descripcion: "Altavoz portátil con conectividad Bluetooth."
  },
  {
    id: 5,
    nombre: "Monitor Full HD",
    categoria: "accesorios",
    precio: 149.99,
    imagen: "🖥️",
    descripcion: "Monitor de 24 pulgadas para trabajar cómodamente."
  },
  {
    id: 6,
    nombre: "Memoria USB",
    categoria: "accesorios",
    precio: 14.99,
    imagen: "💾",
    descripcion: "Memoria USB de 64 GB para tus archivos."
  }
];

const contenedorProductos = document.getElementById("productos");
const buscador = document.getElementById("buscador");
const filtroCategoria = document.getElementById("categoria");
const contador = document.getElementById("contador");

const panelCarrito = document.getElementById("panelCarrito");
const fondoCarrito = document.getElementById("fondoCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const totalElemento = document.getElementById("total");
const notificacion = document.getElementById("notificacion");

const formatoPrecio = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR"
});

let carrito = {};
let temporizadorNotificacion;
let ultimoFoco = null;

try {
  const guardado = JSON.parse(localStorage.getItem("carritoDemo"));

  if (guardado && typeof guardado === "object" && !Array.isArray(guardado)) {
    for (const producto of productos) {
      const cantidad = guardado[producto.id];

      if (
        Number.isInteger(cantidad) &&
        cantidad > 0 &&
        cantidad <= 99
      ) {
        carrito[producto.id] = cantidad;
      }
    }
  }
} catch (error) {
  carrito = {};
}

function guardarCarrito() {
  try {
    localStorage.setItem("carritoDemo", JSON.stringify(carrito));
  } catch (error) {
    // La demo sigue funcionando aunque no se pueda guardar.
  }
}

function mostrarNotificacion(texto) {
  notificacion.textContent = texto;
  notificacion.classList.add("visible");

  clearTimeout(temporizadorNotificacion);

  temporizadorNotificacion = setTimeout(() => {
    notificacion.classList.remove("visible");
  }, 2500);
}

function mostrarProductos() {
  const busqueda = buscador.value.toLowerCase().trim();
  const categoria = filtroCategoria.value;

  const filtrados = productos.filter(producto => {
    const coincideNombre = producto.nombre.toLowerCase().includes(busqueda);
    const coincideCategoria =
      categoria === "todos" || producto.categoria === categoria;

    return coincideNombre && coincideCategoria;
  });

  contenedorProductos.replaceChildren();

  if (filtrados.length === 0) {
    const aviso = document.createElement("p");
    aviso.textContent = "No se han encontrado productos.";
    contenedorProductos.appendChild(aviso);
    return;
  }

  filtrados.forEach(producto => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "producto";

    const imagen = document.createElement("div");
    imagen.className = "producto-imagen";
    imagen.textContent = producto.imagen;
    imagen.setAttribute("aria-hidden", "true");

    const info = document.createElement("div");
    info.className = "producto-info";

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const descripcion = document.createElement("p");
    descripcion.className = "descripcion";
    descripcion.textContent = producto.descripcion;

    const precio = document.createElement("p");
    precio.className = "precio";
    precio.textContent = formatoPrecio.format(producto.precio);

    const boton = document.createElement("button");
    boton.className = "boton-comprar";
    boton.textContent = "Añadir al carrito";
    boton.type = "button";
    boton.addEventListener("click", () => agregarAlCarrito(producto.id));

    info.append(titulo, descripcion, precio, boton);
    tarjeta.append(imagen, info);
    contenedorProductos.appendChild(tarjeta);
  });
}

function agregarAlCarrito(id) {
  const cantidadActual = carrito[id] || 0;

  if (cantidadActual >= 99) {
    mostrarNotificacion("Cantidad máxima alcanzada.");
    return;
  }

  carrito[id] = cantidadActual + 1;

  guardarCarrito();
  actualizarCarrito();
  mostrarNotificacion("Producto añadido al carrito.");
}

function cambiarCantidad(id, cambio) {
  if (!carrito[id]) return;

  const nuevaCantidad = carrito[id] + cambio;

  if (nuevaCantidad <= 0) {
    delete carrito[id];
  } else if (nuevaCantidad <= 99) {
    carrito[id] = nuevaCantidad;
  }

  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.replaceChildren();

  let total = 0;
  let cantidadTotal = 0;

  for (const producto of productos) {
    const cantidad = carrito[producto.id] || 0;

    if (cantidad === 0) continue;

    total += producto.precio * cantidad;
    cantidadTotal += cantidad;

    const item = document.createElement("div");
    item.className = "item-carrito";

    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;

    const subtotal = document.createElement("p");
    subtotal.textContent = formatoPrecio.format(producto.precio * cantidad);

    const controles = document.createElement("div");
    controles.className = "cantidad";

    const menos = document.createElement("button");
    menos.textContent = "−";
    menos.type = "button";
    menos.setAttribute("aria-label", "Quitar una unidad de " + producto.nombre);
    menos.addEventListener("click", () => cambiarCantidad(producto.id, -1));

    const numero = document.createElement("span");
    numero.textContent = cantidad;

    const mas = document.createElement("button");
    mas.textContent = "+";
    mas.type = "button";
    mas.setAttribute("aria-label", "Añadir una unidad de " + producto.nombre);
    mas.addEventListener("click", () => cambiarCantidad(producto.id, 1));

    controles.append(menos, numero, mas);
    item.append(titulo, subtotal, controles);
    listaCarrito.appendChild(item);
  }

  if (cantidadTotal === 0) {
    const vacio = document.createElement("p");
    vacio.textContent = "Tu carrito está vacío.";
    listaCarrito.appendChild(vacio);
  }

  contador.textContent = cantidadTotal;
  totalElemento.textContent = formatoPrecio.format(total);
}

function abrirCarrito() {
  ultimoFoco = document.activeElement;
  panelCarrito.inert = false;
  panelCarrito.classList.add("abierto");
  panelCarrito.setAttribute("aria-hidden", "false");
  fondoCarrito.hidden = false;
  document.body.style.overflow = "hidden";
  document.getElementById("cerrarCarrito").focus();
}

function cerrarCarrito() {
  panelCarrito.classList.remove("abierto");
  panelCarrito.inert = true;
  panelCarrito.setAttribute("aria-hidden", "true");
  fondoCarrito.hidden = true;
  document.body.style.overflow = "";

  if (ultimoFoco && ultimoFoco.isConnected) {
    ultimoFoco.focus();
  }
}

buscador.addEventListener("input", mostrarProductos);
filtroCategoria.addEventListener("change", mostrarProductos);

document.getElementById("abrirCarrito")
  .addEventListener("click", abrirCarrito);

document.getElementById("cerrarCarrito")
  .addEventListener("click", cerrarCarrito);

fondoCarrito.addEventListener("click", cerrarCarrito);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && panelCarrito.classList.contains("abierto")) {
    cerrarCarrito();
  }

  if (event.key === "Tab" && panelCarrito.classList.contains("abierto")) {
    const controles = [...panelCarrito.querySelectorAll(
      "button:not([disabled]), a[href], input:not([disabled])"
    )];

    if (controles.length === 0) return;

    const primero = controles[0];
    const ultimo = controles[controles.length - 1];

    if (event.shiftKey && document.activeElement === primero) {
      event.preventDefault();
      ultimo.focus();
    } else if (!event.shiftKey && document.activeElement === ultimo) {
      event.preventDefault();
      primero.focus();
    }
  }
});

document.getElementById("vaciar").addEventListener("click", () => {
  carrito = {};
  guardarCarrito();
  actualizarCarrito();
  mostrarNotificacion("Carrito vaciado.");
});

document.getElementById("comprar").addEventListener("click", () => {
  if (Object.keys(carrito).length === 0) {
    mostrarNotificacion("Añade algún producto antes de comprar.");
    return;
  }

  carrito = {};
  guardarCarrito();
  actualizarCarrito();
  cerrarCarrito();

  mostrarNotificacion("¡Compra simulada correctamente! Gracias por probar la demo.");
});

mostrarProductos();
actualizarCarrito();
