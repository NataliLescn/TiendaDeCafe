document.addEventListener('DOMContentLoaded', () => {
  // Verificar si hay usuario logueado
  fetch('/api/usuario-logueado')
    .then(res => res.json())
    .then(data => {
      const usuario = data.usuario;

      const loginMenu = document.getElementById('login-menu');
      const userMenu = document.getElementById('user-menu');
      const userName = document.getElementById('user-name');
      const userDropdown = document.getElementById('user-dropdown-menu');

      const sideLogin = document.getElementById('side-login');
      const sideUserMenu = document.getElementById('side-user-menu');
      const sideUserName = document.getElementById('side-user-name');
      const sideDropdown = document.getElementById('side-user-dropdown-menu');

      if (data.success && usuario) {
        // Menú principal (desktop)
        if (loginMenu) loginMenu.style.display = 'none';
        if (userMenu) userMenu.style.display = 'inline-block';
        if (userName) userName.textContent = usuario.nombre || usuario.usuario;

        // Menú lateral (mobile)
        if (sideLogin) sideLogin.style.display = 'none';
        if (sideUserMenu) sideUserMenu.style.display = 'block';
        if (sideUserName) sideUserName.textContent = usuario.nombre || usuario.usuario;
      } else {
        // Mostrar 'Iniciar Sesión' si no hay sesión activa
        if (loginMenu) loginMenu.style.display = 'inline-block';
        if (userMenu) userMenu.style.display = 'none';
        if (sideLogin) sideLogin.style.display = 'block';
        if (sideUserMenu) sideUserMenu.style.display = 'none';
      }
    });

  // Menú desplegable usuario (desktop)
  const userToggle = document.getElementById('user-toggle');
  const userDropdown = document.getElementById('user-dropdown-menu');

  if (userToggle && userDropdown) {
    userToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.style.display =
        userDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', () => {
      userDropdown.style.display = 'none';
    });
  }

  // Menú desplegable lateral (mobile)
  const sideToggle = document.getElementById('side-user-toggle');
  const sideDropdown = document.getElementById('side-user-dropdown-menu');

  if (sideToggle && sideDropdown) {
    sideToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sideDropdown.style.display =
        sideDropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', () => {
      sideDropdown.style.display = 'none';
    });
  }

  // Cerrar sesión desde menú principal
  const logoutLink = document.getElementById('logout-link');
  if (logoutLink) {
    logoutLink.addEventListener('click', async (e) => {
      e.preventDefault();
      await cerrarSesion();
    });
  }

  // Cerrar sesión desde menú lateral
  const sideLogoutBtn = document.getElementById('side-logout-btn');
  if (sideLogoutBtn) {
    sideLogoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await cerrarSesion();
    });
  }

  async function cerrarSesion() {
    await fetch('/api/logout', { method: 'POST' });
    localStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
  }
});
