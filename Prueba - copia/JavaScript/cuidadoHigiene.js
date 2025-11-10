document.addEventListener("DOMContentLoaded", () => {
  // === Botón "Atrás": volver al Home ===
  const btnAtras = document.querySelector(".btn-atras");
  btnAtras.addEventListener("click", () => {
    window.location.href = "home.html";
  });

  // === Botón "Visualizar Intervención": recarga esta vista ===
  const btnRegistrar = document.querySelector(".btn-registrar");
  btnRegistrar.addEventListener("click", () => {
    window.location.href = "cuidadoHigiene.html";
  });

  // === Icono usuario ===
  const iconoUsuario = document.querySelector(".icono-usuario img");
  iconoUsuario.addEventListener("click", () => {
    window.location.href = "home.html";
  });

  // === Navegación barra verde ===
  const links = document.querySelectorAll(".barra-verde a");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const destino = link.getAttribute("href");
      if (destino && destino !== "#") window.location.href = destino;
    });
  });
});
