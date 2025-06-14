// Manejar formulario de registro
document.getElementById('register-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const datos = Object.fromEntries(formData);
  
  const modal = document.getElementById('modal');
  const mensaje = document.getElementById('modal-mensaje');
  
  try {
    const response = await fetch('/api/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
    
    const result = await response.json();
    
    if (result.success) {
      mensaje.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
      mensaje.style.color = '#155724';
      
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 2000);
    } else {
      mensaje.textContent = `❌ ${result.message}`;
      mensaje.style.color = '#721c24';
    }
    
    modal.style.display = 'flex';
    
  } catch (error) {
    console.error('Error en registro:', error);
    mensaje.textContent = '❌ Error de conexión. Intenta nuevamente.';
    mensaje.style.color = '#721c24';
    modal.style.display = 'flex';
  }
});

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