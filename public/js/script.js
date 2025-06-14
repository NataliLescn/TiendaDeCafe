//Inicio de sesión de usuarios
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target));
    const modal = document.getElementById('modal');
    const mensaje = document.getElementById('modal-mensaje');

    if (datos.usuario === 'admin' && datos.clave === '1234') {
      localStorage.setItem('usuarioLogueado', 'true');
      mensaje.textContent = 'Bienvenido! serás redirijido a la página.';
      setTimeout(() => {
        window.location.href = 'compras.html'; // 🔁 Redirige a la página de compras
      }, 1500);
    } else {
      mensaje.textContent = '❌ Usuario o contraseña incorrectos.';
    }
    modal.style.display = 'flex';
  }); 
 
 
 //Registro de usuarios
 document.getElementById('registerForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      const response = await fetch('/api/registro', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });

      const result = await response.json();
      document.getElementById('message').textContent = result.message;
    });
    


    //base de datos

    fetch('/api/usuarios')
  .then(response => response.json())
  .then(usuarios => {
    const lista = document.getElementById('lista-usuarios');
    usuarios.forEach(u => {
      const li = document.createElement('li');
      li.textContent = `${u.id} - ${u.nombre} (${u.email})`;
      lista.appendChild(li);
    });
  })
  .catch(err => {
    console.error('Error al cargar usuarios:', err);
  });
  