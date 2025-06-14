// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const sideMenu = document.getElementById('side-menu');
  const closeMenu = document.getElementById('close-menu');

  // Abrir menú
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      sideMenu.classList.add('show');
    });
  }

  // Cerrar menú
  if (closeMenu) {
    closeMenu.addEventListener('click', function() {
      sideMenu.classList.remove('show');
    });
  }

  // Cerrar menú al hacer clic fuera
  document.addEventListener('click', function(event) {
    if (!sideMenu.contains(event.target) && !menuToggle.contains(event.target)) {
      sideMenu.classList.remove('show');
    }
  });

  // Cerrar menú al hacer clic en un enlace
  const sideMenuLinks = document.querySelectorAll('.side-menu-items a');
  sideMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      sideMenu.classList.remove('show');
    });
  });
});