document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-pago");
  const instrucciones = document.getElementById("instrucciones");

  // Mostrar u ocultar datos de transferencia
  form.addEventListener("change", () => {
    const metodo = form.metodo.value;
    instrucciones.style.display = metodo === "transferencia" ? "block" : "none";
  });

  // Acción al confirmar la compra
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const metodo = form.metodo.value;
    alert(`✅ Compra confirmada con método: ${metodo}`);
    window.location.href = "index.html"; // Redirige a la página principal
  });
});
