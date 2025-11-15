document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.querySelector(".iconos img[alt='Usuario']");
  const userName = localStorage.getItem("usuario") || "Invitado";
  userIcon.title = `Usuario: ${userName}`;

  userIcon.addEventListener("click", () => {
    window.location.href = "verUsuario.html"; 
  });

  const tarjetas = document.querySelectorAll(".tarjeta");
  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
      const texto = tarjeta.querySelector("p").textContent.trim();

      switch (texto) {
        case "REGISTRO DE GANADO":
          window.location.href = "visualizarRegistroGanado.html";
          break;
        case "ALIMENTOS":
          window.location.href = "alimentos.html";
          break;
        case "CUIDADO E HIGIENE":
          window.location.href = "cuidadoHigiene.html";
          break;
        case "VENTA":
          window.location.href = "ventaAnimalesRegistradas.html";
          break;
        default:
          alert("Módulo no disponible.");
      }
    });
  });

  // === Función para cerrar sesión ===
  const salirIcon = document.querySelector(".iconos img[alt='Salir']");
  salirIcon.addEventListener("click", () => {
    const confirmar = confirm("¿Deseas cerrar sesión?");
    if (confirmar) {
      localStorage.removeItem("usuario");
      window.location.href = "login.html";
    }
  });
});