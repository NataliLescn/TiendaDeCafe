document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

  const loginMenu = document.getElementById('login-menu');
  const userMenu = document.getElementById('user-menu');
  const userName = document.getElementById('user-name');

  const sideLoginMenu = document.getElementById('side-login-menu');
  const sideUserMenu = document.getElementById('side-user-menu');
  const sideUserName = document.getElementById('side-user-name');

  // Mostrar u ocultar según estado de sesión
  if (usuario) {
    if (userName) userName.textContent = `¡Hola, ${usuario.nombre}!`;
    if (userMenu) userMenu.style.display = 'inline-block';
    if (loginMenu) loginMenu.style.display = 'none';

    if (sideUserName) sideUserName.textContent = `¡Hola, ${usuario.nombre}!`;
    if (sideUserMenu) sideUserMenu.style.display = 'block';
    if (sideLoginMenu) sideLoginMenu.style.display = 'none';
  } else {
    if (userMenu) userMenu.style.display = 'none';
    if (loginMenu) loginMenu.style.display = 'inline-block';
    if (sideUserMenu) sideUserMenu.style.display = 'none';
    if (sideLoginMenu) sideLoginMenu.style.display = 'block';
  }

  // Función para cerrar sesión
  function cerrarSesion() {
    localStorage.removeItem('usuarioLogueado');
    window.location.reload(); // mejor que redirigir para asegurar DOM + localStorage limpio
  }

  // Eventos para cerrar sesión
  document.getElementById('logout-link')?.addEventListener('click', cerrarSesion);
  document.getElementById('side-logout-btn')?.addEventListener('click', cerrarSesion);

  // Dropdown superior
  const userToggle = document.getElementById('user-toggle');
  const userDropdownMenu = document.getElementById('user-dropdown-menu');

  if (userToggle && userDropdownMenu) {
    userToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = userDropdownMenu.style.display === 'block';
      userDropdownMenu.style.display = isOpen ? 'none' : 'block';
      userMenu.classList.toggle('open', !isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!userMenu.contains(e.target)) {
        userDropdownMenu.style.display = 'none';
        userMenu.classList.remove('open');
      }
    });
  }

  // Dropdown lateral
  const sideToggle = document.getElementById('side-user-toggle');
  const sideDropdown = document.getElementById('side-user-dropdown-menu');

  if (sideToggle && sideDropdown) {
    sideToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = sideDropdown.style.display === 'block';
      sideDropdown.style.display = isOpen ? 'none' : 'block';
      sideUserMenu.classList.toggle('open', !isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!sideUserMenu.contains(e.target)) {
        sideDropdown.style.display = 'none';
        sideUserMenu.classList.remove('open');
      }
    });
  }
});