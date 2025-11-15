urlBase = "http://98.95.239.253:8548";

document.addEventListener("DOMContentLoaded", async () => {

  document.querySelector(".btn-atras").addEventListener("click", () => {
    window.location.href = "home.html";
  });

  document.querySelector(".btn-registrar").addEventListener("click", () => {
    window.location.href = "visualizarRegistroGanado.html";
  });

  document.querySelector(".btn-ver").addEventListener("click", () => {
    window.location.href = "visualizarRegistroVentaMuerte.html";
  });

  document.querySelector(".btn-agregar").addEventListener("click", () => {
    window.location.href = "agregarRegistro.html";
  });

  document.querySelector(".icono-usuario img").addEventListener("click", () => {
    window.location.href = "verUsuario.html";
  });

  const tbody = document.querySelector(".tabla tbody");
  const registros = await getGanado();

  console.log("Registros recibidos:", registros);

  if (registros && registros.length > 0) {
    tbody.innerHTML = "";
    registros.forEach((animal) => {

      const fechaNacimiento = formatearFecha(animal.fechaNacimiento);
      const fechaMuerte = animal.fechaMuerte ? formatearFecha(animal.fechaMuerte) : "—";

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${animal.nombre}</td>
        <td>${animal.idArete}</td>
        <td>${animal.peso}</td>
        <td>${animal.raza.nombreRaza}</td>
        <td>${fechaNacimiento}</td>
        <td>${animal.sexo}</td>
        <td>${fechaMuerte}</td>
        <td><button class="editar" data-id="${animal.idArete}">✏️</button></td>
      `;
      tbody.appendChild(fila);
    });
  }

  document.querySelectorAll(".editar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const id = e.target.dataset.id;
      window.location.href = `editarRegistroGanado.html?id=${id}`;
    });
  });
});

// === FUNCIÓN PARA OBTENER GANADO ===
async function getGanado() {
  const response = await fetch(urlBase + "/ganado/activos", {
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' }
  });

  return response.json();
}

// === FUNCIÓN PARA FORMATEAR FECHAS ===
function formatearFecha(arrayFecha) {
  if (!arrayFecha || !Array.isArray(arrayFecha)) return "—";
  const [anio, mes, dia] = arrayFecha;
  return `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${anio}`;
}
