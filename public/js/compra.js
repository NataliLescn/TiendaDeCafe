const productos = [
  { id: 1, nombre: "Café Arábica", precio: 2200, imagen: "./images/cafe3.jpg" },
  { id: 2, nombre: "Café Robusta", precio: 2100, imagen: "./images/cafe6.jpg" },
  { id: 3, nombre: "Café Liberica", precio: 2350, imagen: "./images/cafe4.jpg" },
  { id: 4, nombre: "Café Excelsa", precio: 2300, imagen: "./images/excelsa.jpeg" },
  { id: 6, nombre: "Café Helado", precio: 1650, imagen: "./images/cafe_helado.jpg" },
  { id: 7, nombre: "Café Latte", precio: 1850, imagen: "./images/latte.jpeg" },
  { id: 8, nombre: "Porción de Torta", precio: 3000, imagen: "./images/manzana.jpg" },
  { id: 9, nombre: "Facturas", precio: 1700, imagen: "./images/masas.avif" }
];

let carrito = [];

function mostrarProductos() {
  const contenedor = document.getElementById("productos");
  contenedor.innerHTML = "";

  productos.forEach(prod => {
    const div = document.createElement("div");
    div.classList.add("pairing-item");
    div.innerHTML = `
      <img src="${prod.imagen}" alt="${prod.nombre}">
      <div class="content">
        <h3>${prod.nombre}</h3>
        <p>$${prod.precio}</p>
        <button class="agregar-btn" onclick="agregarAlCarrito(${prod.id})">Agregar al carrito</button>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existente = carrito.find(item => item.id === id);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  actualizarCarrito();
  mostrarModal();
}

function actualizarCarrito() {
  const lista = document.getElementById("carrito-lista");
  const total = document.getElementById("total");
  lista.innerHTML = "";
  let totalPrecio = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`;
    lista.appendChild(li);
    totalPrecio += item.precio * item.cantidad;
  });

  total.textContent = totalPrecio.toFixed(2);
}

function mostrarModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'flex';
}

function cerrarModal() {
  document.getElementById('modal').style.display = 'none';
}

function mostrarPago() {
  if (carrito.length === 0) {
    alert("🛒 Tu carrito está vacío.");
  } else {
    document.getElementById('modal-pago').style.display = 'flex';
  }
}

function cerrarPago() {
  document.getElementById('modal-pago').style.display = 'none';
  carrito = [];
  actualizarCarrito();
  window.location.href = "confirmar-compra.html";
}

function logout() {
  localStorage.removeItem('usuarioLogueado');
  window.location.href = 'login.html';
}

mostrarProductos();
