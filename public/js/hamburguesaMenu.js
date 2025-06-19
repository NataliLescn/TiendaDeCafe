document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  const closeMenu = document.getElementById('close-menu');

  const loginItem = document.getElementById('side-login');
  const userMenu = document.getElementById('side-user-menu');
  const userNameSpan = document.getElementById('side-user-name');
  const userToggle = document.getElementById('side-user-toggle');
  const userDropdown = document.getElementById('side-user-dropdown-menu');
  const logoutBtn = document.getElementById('side-logout-btn');

  // Mostrar nombre del usuario si está logueado
  const nombreUsuario = localStorage.getItem('usuarioLogueado');
  if (nombreUsuario) {
    userNameSpan.textContent = nombreUsuario;
    loginItem.style.display = 'none';
    userMenu.style.display = 'block';
  } else {
    loginItem.style.display = 'block';
    userMenu.style.display = 'none';
  }

  // Abrir menú
  menuToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    sideMenu.classList.add('open');
  });

  // Cerrar menú al hacer clic en ✖
  closeMenu?.addEventListener('click', () => {
    sideMenu.classList.remove('open');
    userDropdown.classList.remove('show');
  });

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', (e) => {
    if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      sideMenu.classList.remove('open');
      userDropdown?.classList.remove('show');
    }
  });

  // Cerrar menú al hacer clic en un enlace
  const sideLinks = document.querySelectorAll('.side-menu-items a');
  sideLinks.forEach(link => {
    link.addEventListener('click', () => {
      sideMenu.classList.remove('open');
      userDropdown?.classList.remove('show');
    });
  });

  // Alternar submenú del usuario
  userToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdown.classList.toggle('show');
  });

  // Cerrar submenú si se hace clic fuera
  document.addEventListener('click', (e) => {
    if (!userToggle.contains(e.target)) {
      userDropdown?.classList.remove('show');
    }
  });

  // Cerrar sesión
  logoutBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
  });
});