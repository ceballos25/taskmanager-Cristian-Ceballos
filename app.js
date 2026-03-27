function showAlert({ type = "success", message = "", duration = 3000 }) {
  const container = document.getElementById("alert-container");

  if (!container) {
    console.warn("No existe #alert-container en el DOM");
    return;
  }

  // Crear alerta
  const alertElement = document.createElement("div");

  // Clases dinámicas
  alertElement.classList.add("alert", `alert-${type}`);

  // Contenido
  alertElement.textContent = message;

  // Insertar en el DOM
  container.appendChild(alertElement);

  // Auto eliminar
  setTimeout(() => {
    alertElement.style.opacity = "0";
    alertElement.style.transform = "translateY(-10px)";
    
    setTimeout(() => {
      alertElement.remove();
    }, 300);
  }, duration);
}

showAlert({
  type: "success",
  message: "Compra realizada correctamente"
});

// showAlert({
//   type: "error",
//   message: "Ocurrió un error"
// });

// showAlert({
//   type: "warning",
//   message: "Cuidado con esto"
// });