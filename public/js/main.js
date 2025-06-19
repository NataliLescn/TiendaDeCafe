// Verificar estado de autenticación al cargar la página
document.addEventListener('DOMContentLoaded', async function() {
  await verificarAutenticacion();
  initializeUserDropdown();
  initializeHamburgerMenu();
});

async function verificarAutenticacion() {
  try {
    //const response = await fetch('/api/usuario-actual');
    const data = await response.json();
    
    const userMenu = document.getElementById('user-menu');
    const loginMenu = document.getElementById('login-menu');
    const userName = document.getElementById('user-name');
    const welcomeMessage = document.getElementById('welcome-message');
    
    if (data.logueado) {
      // Usuario logueado
      userMenu.style.display = 'block';
      loginMenu.style.display = 'none';
      userName.textContent = `¡Hola, ${data.usuario.nombre}!`;
      
      // Personalizar mensaje de bienvenida
      if (welcomeMessage) {
        welcomeMessage.textContent = `¡Bienvenido ${data.usuario.nombre} a Tienda de Café!`;
      }
    } else {
      // Usuario no logueado
      userMenu.style.display = 'none';
      loginMenu.style.display = 'block';
    }
  } catch (error) {
    console.error('Error al verificar autenticación:', error);
    
    // Fallback: verificar localStorage
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const userMenu = document.getElementById('user-menu');
    const loginMenu = document.getElementById('login-menu');
    const userName = document.getElementById('user-name');
    const welcomeMessage = document.getElementById('welcome-message');
    
    if (usuario) {
      userMenu.style.display = 'block';
      loginMenu.style.display = 'none';
      userName.textContent = `¡Hola, ${usuario.nombre}!`;
      
      if (welcomeMessage) {
        welcomeMessage.textContent = `¡Bienvenido ${usuario.nombre} a Tienda de Café!`;
      }
    } else {
      userMenu.style.display = 'none';
      loginMenu.style.display = 'block';
    }
  }
}

// Inicializar dropdown de usuario
function initializeUserDropdown() {
  const dropdownBtn = document.getElementById('user-dropdown-btn');
  const dropdown = document.querySelector('.user-dropdown');
  const logoutBtn = document.getElementById('logout-btn');
  
  if (dropdownBtn && dropdown) {
    // Toggle dropdown al hacer click en el botón
    dropdownBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.classList.toggle('active');
    });
    
    // Cerrar dropdown al hacer click fuera
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
    
    // Prevenir que el dropdown se cierre al hacer click dentro
    dropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  }
  
  // Manejar logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      
      try {
        const response = await fetch('/api/logout', {
          method: 'POST'
        });
        
        if (response.ok) {
          // Limpiar localStorage también
          localStorage.removeItem('usuarioLogueado');
          // Recargar la página para actualizar el estado
          window.location.reload();
        }
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        // Fallback: limpiar localStorage y recargar
        localStorage.removeItem('usuarioLogueado');
        window.location.reload();
      }
    });
  }
}

// Inicializar menú hamburguesa
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle");
  const sideMenu = document.getElementById("side-menu");
  const closeMenu = document.getElementById("close-menu");

  if (menuToggle && sideMenu && closeMenu) {
    menuToggle.addEventListener("click", () => {
      sideMenu.classList.add("show");
    });

    closeMenu.addEventListener("click", () => {
      sideMenu.classList.remove("show");
    });
  }
});
  // Cerrar menú al hacer clic en un enlace
  const sideMenuLinks = document.querySelectorAll('.side-menu-items a');
  sideMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
      sideMenu.classList.remove('show');
    });
  });

// Manejar suscripción al newsletter
document.querySelector('.subscribe-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const nombre = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  
  if (nombre && email) {
    alert(`¡Gracias ${nombre}! Te has suscrito exitosamente con el email: ${email}`);
    this.reset();
  }
});

//Locales
  const localesArgentina = [
    {
      ciudad: "Buenos Aires",
      direccion: "Av. Corrientes 1234, CABA",
      imagen: "../images/localB.jpg",
      maps: "https://www.google.com/maps?q=Av.+Corrientes+1234,+CABA"
    },
    {
      ciudad: "Córdoba",
      direccion: "Gral. Paz 456, Córdoba Capital",
      imagen: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
      maps: "https://www.google.com/maps?q=Gral.+Paz+456,+Córdoba"
    },
    {
      ciudad: "Rosario",
      direccion: "Bv. Oroño 789, Rosario",
      imagen: "../images/localR.jpg",
      maps: "https://www.google.com/maps?q=Bv.+Oroño+789,+Rosario"
    },
    {
      ciudad: "Mendoza",
      direccion: "Av. Las Heras 234, Mendoza",
      imagen: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
      maps: "https://www.google.com/maps?q=Av.+Las+Heras+234,+Mendoza"
    },
    {
      ciudad: "Salta",
      direccion: "Caseros 321, Salta",
      imagen: "../images/localS.jpg",
      maps: "https://www.google.com/maps?q=Caseros+321,+Salta"
    }
  ];

  function mostrarLocales(locales) {
    const container = document.getElementById("locales-container");
    container.innerHTML = "";

    locales.forEach(local => {
      const item = document.createElement("div");
      item.className = "pairing-item";
      item.innerHTML = `
        <img src="${local.imagen}" alt="Café en ${local.ciudad}">
        <div class="content">
          <h3>${local.ciudad}</h3>
          <p>${local.direccion}</p>
          <a href="${local.maps}" target="_blank" class="map-link">Ver en Google Maps</a>
        </div>
      `;
      container.appendChild(item);
    });
  }

  // Filtro en tiempo real
  document.getElementById('buscador-locales').addEventListener('input', function() {
    const filtro = this.value.toLowerCase();
    const filtrados = localesArgentina.filter(local =>
      local.ciudad.toLowerCase().includes(filtro) ||
      local.direccion.toLowerCase().includes(filtro)
    );
    mostrarLocales(filtrados);
  });

  document.addEventListener("DOMContentLoaded", () => {
    mostrarLocales(localesArgentina);
  });