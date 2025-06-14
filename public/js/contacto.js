document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  const respuesta = document.getElementById('respuesta');

  if (!nombre || !email || !mensaje) {
    respuesta.textContent = 'Por favor completá todos los campos.';
    respuesta.style.color = '#ffcc00';
    return;
  }

  // Simula envío
  respuesta.textContent = '✅ ¡Gracias por tu mensaje! Te responderemos pronto.';
  respuesta.style.color = '#0f0';

  // Reset form
  this.reset();
});