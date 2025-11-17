urlBase = "http://98.95.239.253:8548";

async function getUsuarios() {
  const response = await fetch(urlBase + "/usuarios", {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
  return response.json();
}

document.addEventListener("DOMContentLoaded", () => {
  const tablaBody = document.querySelector(".tabla tbody");
  const btnRegistrar = document.querySelector(".btn-registrar");
  const btnVer = document.querySelector(".btn-ver");
  const btnAtras = document.querySelector(".btn-atras");
  const iconoUsuario = document.querySelector(".icono-usuario img");

  // === Navegación ===
  btnRegistrar.addEventListener("click", () => {
    window.location.href = "agregarUsuario.html";
  });

  btnVer.addEventListener("click", () => {
    window.location.href = "verUsuario.html";
  });

  btnAtras.addEventListener("click", () => {
    window.location.href = "home.html";
  });

  iconoUsuario.addEventListener("click", () => {
    window.location.href = "home.html";
  });

  // === Cargar usuarios desde la API ===
  async function cargarUsuarios() {
    tablaBody.innerHTML = ""; // Limpiar tabla

    try {
      const usuarios = await getUsuarios();

      if (!usuarios || usuarios.length === 0) {
        const fila = document.createElement("tr");
        const celda = document.createElement("td");
        celda.colSpan = 6;
        celda.textContent = "No hay usuarios registrados.";
        celda.style.textAlign = "center";
        fila.appendChild(celda);
        tablaBody.appendChild(fila);
        return;
      }
      console.log(usuarios);
      usuarios.forEach((usuario, index) => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td>${usuario.nombre}</td>
          <td>${usuario.telefono}</td>
          <td>${usuario.sexo}</td>
          <td>${usuario.edad}</td>
          <td><button class="Editar" data-index="${usuario.idUsuario}">✏</button></td>
          <td><button class="eliminar" data-index="${usuario.idUsuario}">🗑️</button></td>
        `;

        tablaBody.appendChild(fila);
      });

      agregarEventos(usuarios);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
      alert("No se pudieron cargar los usuarios desde el servidor.");
    }
  }

  function agregarEventos(usuarios) {
    const btnsEditar = document.querySelectorAll(".Editar");
    const btnsEliminar = document.querySelectorAll(".eliminar");

    btnsEditar.forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.dataset.index;
        console.log("Editar usuario con ID:", index);

        window.location.href = `editarUsuario.html?id=${index}`;
      });
    });

    btnsEliminar.forEach(btn => {
      btn.addEventListener("click", async (e) => {
        const index = e.target.dataset.index;

        if (confirm("¿Seguro que deseas eliminar este usuario?")) {
          try {
            await fetch(`${urlBase}/usuarios/${index}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            cargarUsuarios(); // refrescar tabla
          } catch (error) {
            console.error("Error al eliminar usuario:", error);
            alert("No se pudo eliminar el usuario.");
          }
        }
      });
    });
  }

  cargarUsuarios();
});