// Navegación entre vistas
document.addEventListener("DOMContentLoaded", () => {
  const btnAtras = document.querySelector(".btn-atras");
  const btnVisualizar = document.querySelector(".btn-registrar");
  const btnVentaMuerte = document.querySelector(".btn-ver");
  const btnReporte = document.querySelector(".btn-reporte");

  // Botón atrás: regresa al Home
  btnAtras.addEventListener("click", () => {
    window.location.href = "../Page/home.html";
  });
  
  // === Icono de usuario ===
  const iconoUsuario = document.querySelector(".icono-usuario img");
  iconoUsuario.addEventListener("click", () => {
    window.location.href = "verUsuario.html";
  });

  // Visualizar registro (ir a la vista de registro de ganado)
  btnVisualizar.addEventListener("click", () => {
    window.location.href = "../Page/visualizarRegistroGanado.html";
  });

  // Registro de venta o muerte (actual vista)
  btnVentaMuerte.addEventListener("click", () => {
    window.location.href = "../Page/visualizarRegistroVentaMuerte.html";
  });

  // Generar reporte (de momento muestra mensaje)
  btnReporte.addEventListener("click", () => {
    window.location.href = "../Page/reporteRegistro.html"
  });
});
