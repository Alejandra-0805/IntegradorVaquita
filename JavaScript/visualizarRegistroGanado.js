document.addEventListener("DOMContentLoaded", () => {

  // === Botón "Atrás": volver al Home ===
  const btnAtras = document.querySelector(".btn-atras");
  btnAtras.addEventListener("click", () => {
    window.location.href = "home.html";
  });

  // === Botón "Visualizar Registro": recargar esta vista ===
  const btnRegistrar = document.querySelector(".btn-registrar");
  btnRegistrar.addEventListener("click", () => {
    window.location.href = "visualizarRegistroGanado.html";
  });

  // === Botón "Registro de Venta o Muerte" ===
  const btnVer = document.querySelector(".btn-ver");
  btnVer.addEventListener("click", () => {
    window.location.href = "visualizarRegistroVentaMuerte.html";
  });

  // === Botón "Agregar": ir al formulario de registro de ganado ===
  const btnAgregar = document.querySelector(".btn-agregar");
  btnAgregar.addEventListener("click", () => {
    window.location.href = "agregarRegistro.html";
  });

  // === Icono de usuario ===
  const iconoUsuario = document.querySelector(".icono-usuario img");
  iconoUsuario.addEventListener("click", () => {
    window.location.href = "verUsuario.html";
  });

  // === Botones "Editar" ===
  const botonesEditar = document.querySelectorAll(".editar");
  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const fila = e.target.closest("tr");
      const nombreAnimal = fila.querySelector("td").textContent.trim();

      const confirmar = confirm(`¿Deseas editar la información del animal "${nombreAnimal}"?`);
      if (confirmar) {
        window.location.href = "editarRegistroGanado.html";
      }
    });
  });

  // === (Opcional) Cargar datos desde localStorage ===
  const tbody = document.querySelector(".tabla tbody");
  const registros = JSON.parse(localStorage.getItem("ganado")) || [];

  if (registros.length > 0) {
    tbody.innerHTML = "";
    registros.forEach((animal) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${animal.nombre}</td>
        <td>${animal.id}</td>
        <td>${animal.peso}</td>
        <td>${animal.raza}</td>
        <td>${animal.fechaNacimiento}</td>
        <td>${animal.sexo}</td>
        <td>${animal.fechaMuerte || "—"}</td>
        <td><button class="editar">✏️</button></td>
      `;
      tbody.appendChild(fila);
    });
  }
});
