document.addEventListener("DOMContentLoaded", () => {

  const btnAtras = document.querySelector(".btn-atras");
  btnAtras.addEventListener("click", () => {
    window.location.href = "homeEmpleado.html";
  });

  const btnRegistrar = document.querySelector(".btn-registrar");
  btnRegistrar.addEventListener("click", () => {
    window.location.href = "visualizarRegistroGanadoEmpleado.html";
  });

  const btnVer = document.querySelector(".btn-ver");
  btnVer.addEventListener("click", () => {
    window.location.href = "visualizarRegistroVentaMuerteEmpleado.html";
  });

  
  const botonesEditar = document.querySelectorAll(".editar");
  botonesEditar.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const fila = e.target.closest("tr");
      const nombreAnimal = fila.querySelector("td").textContent.trim();

      const confirmar = confirm(`¿Deseas editar la información del animal "${nombreAnimal}"?`);
      if (confirmar) {
        window.location.href = "editarRegistroGanadoEmpleado.html";
      }
    });
  });


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
