    let usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));

    if (!usuario) {
      alert("Debes iniciar sesión para ver tu perfil.");
      window.location.href = "login.html";
    }

    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const fotoPerfil = document.getElementById('foto-perfil');
    const fotoInput = document.getElementById('foto-input');

    // Cargar datos
    nombreInput.value = usuario.nombre || '';
    emailInput.value = usuario.email || '';
    passwordInput.value = usuario.clave || '';
    fotoPerfil.src = usuario.fotoPerfil || "https://cdn-icons-png.flaticon.com/512/847/847969.png";

    // Guardar cambios
    document.getElementById('perfil-form').addEventListener('submit', function (e) {
      e.preventDefault();
      usuario.nombre = nombreInput.value;
      usuario.email = emailInput.value;
      usuario.clave = passwordInput.value;
      localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
      alert("Datos actualizados correctamente.");
    });

    // Imagen de perfil
    fotoInput.addEventListener('change', function () {
      const file = fotoInput.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const base64Image = e.target.result;
          usuario.fotoPerfil = base64Image;
          fotoPerfil.src = base64Image;
          localStorage.setItem('usuarioLogueado', JSON.stringify(usuario));
        };
        reader.readAsDataURL(file);
      }
    });

    // Pedidos simulados
    const pedidos = JSON.parse(localStorage.getItem('pedidosUsuario')) || [
      {
        fecha: "2025-06-01",
        productos: ["Café Espresso", "Medialuna"],
        total: "$800"
      },
      {
        fecha: "2025-06-05",
        productos: ["Capuccino", "Tostado de jamón y queso"],
        total: "$1200"
      }
    ];

    const listaPedidos = document.getElementById('lista-pedidos');
    pedidos.forEach(p => {
      const div = document.createElement('div');
      div.classList.add('pedido');
      div.innerHTML = `
        <p><strong>Fecha:</strong> ${p.fecha}</p>
        <p><strong>Productos:</strong> ${p.productos.join(', ')}</p>
        <p><strong>Total:</strong> ${p.total}</p>
      `;
      listaPedidos.appendChild(div);
    });