// Manejar formulario de login
document.getElementById('login-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const datos = Object.fromEntries(formData);
  
  const modal = document.getElementById('modal');
  const mensaje = document.getElementById('modal-mensaje');
  
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    
    const result = await response.json();
    
 if (result.success) {

  localStorage.setItem('usuarioLogueado', JSON.stringify(result.usuario));

  mensaje.textContent = `¡Bienvenido ${result.usuario.nombre}! Serás redirigido a la página principal.`;
  mensaje.style.color = '#155724';

  setTimeout(() => {
    const destino = localStorage.getItem('redireccionPendiente') || 'index.html';
    localStorage.removeItem('redireccionPendiente');
    window.location.href = destino;
  }, 1500);
}
    
    modal.style.display = 'flex';
    
  } catch (error) {
    console.error('Error en login:', error);
    mensaje.textContent = 'Error de conexión. Intenta nuevamente.';
    mensaje.style.color = '#721c24';
    modal.style.display = 'flex';
  }
});

function logout() {
  localStorage.removeItem('usuarioLogueado');
  window.location.href = 'index.html';
}

function cerrarModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    cerrarModal();
  }
});

const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

const loginMenu = document.getElementById('login-menu');
const userMenu = document.getElementById('user-menu');
const userName = document.getElementById('user-name');
const logoutBtn = document.getElementById('logout-btn');

const sideUserMenu = document.getElementById('side-user-menu');
const sideUserName = document.getElementById('side-user-name');
const sideLogoutBtn = document.getElementById('side-logout-btn');

if (usuario) {
  userName.textContent = `¡Hola, ${usuario.nombre}!`;
  sideUserName.textContent = `¡Hola, ${usuario.nombre}!`;

  userMenu.style.display = 'inline-block';
  loginMenu.style.display = 'none';

  sideUserMenu.style.display = 'block';
} else {
  userMenu.style.display = 'none';
  loginMenu.style.display = 'inline-block';

  sideUserMenu.style.display = 'none';
}

logoutBtn?.addEventListener('click', cerrarSesion);
sideLogoutBtn?.addEventListener('click', cerrarSesion);

function cerrarSesion() {
  localStorage.removeItem('usuarioLogueado');
  window.location.href = 'index.html';
}

// Toggle para dropdown del usuario
const userToggle = document.getElementById('user-toggle');
const userDropdownMenu = document.getElementById('user-dropdown-menu');

if (userToggle) {
  userToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que se cierre inmediatamente
    userDropdownMenu.style.display = userDropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  // Cerrar el menú al hacer clic fuera
  document.addEventListener('click', () => {
    userDropdownMenu.style.display = 'none';
  });
}

// Logout desde dropdown
const logoutLink = document.getElementById('logout-link');
if (logoutLink) {
  logoutLink.addEventListener('click', () => {
    localStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
  });
}