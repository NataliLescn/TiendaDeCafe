document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('register-form');
    const modal = document.getElementById('modal');
    const modalMensaje = document.getElementById('modal-mensaje');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const datos = {
            nombre: formData.get('nombre'),
            email: formData.get('email'),
            usuario: formData.get('usuario'),
            clave: formData.get('clave')
        };

        // Validaciones básicas
        if (!datos.nombre || !datos.email || !datos.usuario || !datos.clave) {
            mostrarMensaje('Todos los campos son obligatorios', 'error');
            return;
        }

        if (datos.clave.length < 6) {
            mostrarMensaje('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }

        if (!validarEmail(datos.email)) {
            mostrarMensaje('Por favor ingresa un email válido', 'error');
            return;
        }

        try {
            // Deshabilitar el botón mientras se procesa
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Registrando...';

            const response = await fetch('/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datos)
            });

            const result = await response.json();

            // Restaurar el botón
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            if (result.success) {
                modalMensaje.textContent = '¡Registro exitoso! Bienvenido a Tienda de Café';
                mostrarModal();
                form.reset();
            } else {
                mostrarMensaje(result.message || 'Error en el registro', 'error');
            }

        } catch (error) {
            console.error('Error:', error);
            mostrarMensaje('Error de conexión. Por favor intenta nuevamente.', 'error');
            
            // Restaurar el botón en caso de error
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Registrarse';
        }
    });

    function mostrarMensaje(mensaje, tipo) {
        messageDiv.textContent = mensaje;
        messageDiv.className = `message ${tipo}`;
        messageDiv.style.display = 'block';
        
        // Ocultar el mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    }

    function mostrarModal() {
        modal.style.display = 'flex';
    }

    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Función global para cerrar el modal
    window.cerrarModal = function() {
        modal.style.display = 'none';
        // Redirigir al login después de cerrar el modal
        setTimeout(() => {
            window.location.href = './login.html';
        }, 500);
    };

    // Cerrar modal al hacer clic fuera de él
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            cerrarModal();
        }
    });

    // Validación en tiempo real
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validarCampo(this);
        });
    });

    function validarCampo(input) {
        const valor = input.value.trim();
        
        switch(input.name) {
            case 'nombre':
                if (valor.length < 2) {
                    marcarError(input, 'El nombre debe tener al menos 2 caracteres');
                } else {
                    marcarExito(input);
                }
                break;
            case 'email':
                if (!validarEmail(valor)) {
                    marcarError(input, 'Email no válido');
                } else {
                    marcarExito(input);
                }
                break;
            case 'usuario':
                if (valor.length < 3) {
                    marcarError(input, 'El usuario debe tener al menos 3 caracteres');
                } else {
                    marcarExito(input);
                }
                break;
            case 'clave':
                if (valor.length < 6) {
                    marcarError(input, 'La contraseña debe tener al menos 6 caracteres');
                } else {
                    marcarExito(input);
                }
                break;
        }
    }

    function marcarError(input, mensaje) {
        input.style.borderColor = '#dc3545';
        let errorMsg = input.parentNode.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('small');
            errorMsg.className = 'error-message';
            errorMsg.style.color = '#dc3545';
            errorMsg.style.fontSize = '0.8rem';
            input.parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent = mensaje;
    }

    function marcarExito(input) {
        input.style.borderColor = '#28a745';
        const errorMsg = input.parentNode.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
});