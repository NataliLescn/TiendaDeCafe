document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('login-form');
  const modal = document.getElementById('modal');
  const modalMensaje = document.getElementById('modal-mensaje');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const datos = {
      usuario: formData.get('usuario'),
      clave: formData.get('clave')
    };

    // Validación básica
    if (!datos.usuario || !datos.clave) {
      mostrarError('Todos los campos son obligatorios');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Ingresando...';

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      const result = await response.json();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;

      if (result.success) {
        modalMensaje.textContent = `¡Bienvenido, ${result.usuario.nombre}!`;
        mostrarModal();

        // Guardar usuario en localStorage
        localStorage.setItem('usuarioLogueado', JSON.stringify(result.usuario));

        // Reset form
        form.reset();
      } else {
        mostrarError(result.message || 'Error en el login');
      }
    } catch (error) {
      console.error('Error:', error);
      mostrarError('Error de conexión. Intenta nuevamente.');

      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  function mostrarError(mensaje) {
    let errorDiv = document.querySelector('.error-message');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.style.cssText = `
        background-color: #f8d7da;
        color: #721c24;
        border: 1px solid #f5c6cb;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
        font-weight: 600;
      `;
      form.insertBefore(errorDiv, form.firstChild);
    }
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
    setTimeout(() => {
      errorDiv.style.display = 'none';
    }, 5000);
  }

function mostrarModal() {
  modal.style.display = 'flex';
}

  window.cerrarModal = function () {
    modal.style.display = 'none';
    setTimeout(() => {
      window.location.href = './index.html';
    }, 500);
  };

  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      cerrarModal();
    }
  });

  // Validación en tiempo real
  const inputs = form.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('input', function () {
      this.style.borderColor = '#ddd';
      const errorMsg = document.querySelector('.error-message');
      if (errorMsg) {
        errorMsg.style.display = 'none';
      }
    });

    input.addEventListener('blur', function () {
      validarCampo(this);
    });
  });

  function validarCampo(input) {
    const valor = input.value.trim();
    switch (input.name) {
      case 'usuario':
        if (valor.length < 3) {
          marcarError(input, 'El usuario debe tener al menos 3 caracteres');
        } else {
          marcarExito(input);
        }
        break;
      case 'clave':
        if (valor.length < 4) {
          marcarError(input, 'La contraseña debe tener al menos 4 caracteres');
        } else {
          marcarExito(input);
        }
        break;
    }
  }

  function marcarError(input, mensaje) {
    input.style.borderColor = '#dc3545';
    let errorMsg = input.parentNode.querySelector('.field-error');
    if (!errorMsg) {
      errorMsg = document.createElement('small');
      errorMsg.className = 'field-error';
      errorMsg.style.color = '#dc3545';
      errorMsg.style.fontSize = '0.8rem';
      errorMsg.style.marginTop = '0.25rem';
      errorMsg.style.display = 'block';
      input.parentNode.appendChild(errorMsg);
    }
    errorMsg.textContent = mensaje;
  }

  function marcarExito(input) {
    input.style.borderColor = '#28a745';
    const errorMsg = input.parentNode.querySelector('.field-error');
    if (errorMsg) {
      errorMsg.remove();
    }
  }

  // Verificar si ya hay un usuario logueado
  const usuarioGuardado = localStorage.getItem('usuarioLogueado');
  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);
    console.log('Ya hay sesión iniciada:', usuario);
  }
});

// Dropdown menú de usuario
const userToggle = document.getElementById('user-toggle');
const userDropdownMenu = document.getElementById('user-dropdown-menu');

if (userToggle) {
  userToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    userDropdownMenu.style.display = userDropdownMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', () => {
    userDropdownMenu.style.display = 'none';
  });
}

// Logout
const logoutLink = document.getElementById('logout-link');
if (logoutLink) {
  logoutLink.addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST' });
    localStorage.removeItem('usuarioLogueado');
    window.location.href = 'index.html';
  });
}
