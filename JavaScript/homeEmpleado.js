document.addEventListener("DOMContentLoaded", () => {
  const userIcon = document.querySelector(".iconos img[alt='Usuario']");
  const userName = localStorage.getItem("usuario") || "Invitado";
  userIcon.title = `Usuario: ${userName}`;

  const tarjetas = document.querySelectorAll(".tarjeta");
  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("click", () => {
      const texto = tarjeta.querySelector("p").textContent.trim();

      switch (texto) {
        case "REGISTRO DE GANADO":
          window.location.href = "visualizarRegistroGanadoEmpleado.html";
          break;
        case "ALIMENTOS":
          window.location.href = "alimentosEmpleado.html";
          break;
        case "CUIDADO E HIGIENE":
          window.location.href = "registroCuidadoEmpleado.html";
          break;
        case "VENTA":
          window.location.href = "ventaEmpleado.html";
          break;
        default:
          alert("Módulo no disponible.");
      }
    });
  });

  const salirIcon = document.querySelector(".iconos img[alt='Salir']");
  salirIcon.addEventListener("click", () => {
    const confirmar = confirm("¿Deseas cerrar sesión?");
    if (confirmar) {
      localStorage.removeItem("usuario");
      window.location.href = "login.html";
    }
  });
});