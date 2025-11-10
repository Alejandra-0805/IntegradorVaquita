document.addEventListener("DOMContentLoaded", () => {

  const tablaBody = document.querySelector(".tabla tbody");
  const btnRegistrar = document.querySelector(".btn-registrar");
  const btnVer = document.querySelector(".btn-ver");
  const btnAtras = document.querySelector(".btn-atras");
  const iconoUsuario = document.querySelector(".icono-usuario img");

  // === Navegación ===
  btnRegistrar.addEventListener("click", () => {
    window.location.href = "editarUsuario.html"; // Ir al formulario de registro
  });

  btnVer.addEventListener("click", () => {
    window.location.href = "verUsuario.html"; // Mantenerse aquí (por consistencia)
  });

  btnAtras.addEventListener("click", () => {
    window.location.href = "home.html"; // Regresar al Home
  });

  iconoUsuario.addEventListener("click", () => {
    window.location.href = "home.html"; // Icono usuario lleva al Home
  });

  // === Cargar usuarios guardados en localStorage ===
  function cargarUsuarios() {
    tablaBody.innerHTML = ""; // Limpiar tabla
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.length === 0) {
      const fila = document.createElement("tr");
      const celda = document.createElement("td");
      celda.colSpan = 7;
      celda.textContent = "No hay usuarios registrados.";
      celda.style.textAlign = "center";
      fila.appendChild(celda);
      tablaBody.appendChild(fila);
      return;
    }

    usuarios.forEach((usuario, index) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.telefono}</td>
        <td>${usuario.sexo}</td>
        <td>${usuario.edad}</td>
        <td>${usuario.puesto || "—"}</td>
        <td><button class="Editar" data-index="${index}">✏</button></td>
        <td><button class="eliminar" data-index="${index}">🗑️</button></td>
      `;

      tablaBody.appendChild(fila);
    });

    agregarEventos();
  }

  // === Agregar eventos a botones de editar y eliminar ===
  function agregarEventos() {
    const btnsEditar = document.querySelectorAll(".Editar");
    const btnsEliminar = document.querySelectorAll(".eliminar");

    // Editar usuario
    btnsEditar.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuario = usuarios[index];

        // Guardar usuario seleccionado temporalmente
        localStorage.setItem("usuarioEditar", JSON.stringify({ usuario, index }));

        // Redirigir al formulario de edición
        window.location.href = "editarUsuario.html";
      });
    });

    // Eliminar usuario
    btnsEliminar.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        if (confirm("¿Seguro que deseas eliminar este usuario?")) {
          usuarios.splice(index, 1);
          localStorage.setItem("usuarios", JSON.stringify(usuarios));
          cargarUsuarios(); // refrescar tabla
        }
      });
    });
  }

  // === Cargar usuarios al iniciar ===
  cargarUsuarios();

});