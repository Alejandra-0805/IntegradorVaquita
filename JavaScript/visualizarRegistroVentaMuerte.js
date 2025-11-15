urlBase = "http://98.95.239.253:8548";

async function getGanado() {
  const response = await fetch(urlBase + "/ganado/no-activos", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

  return response.json();
}

document.addEventListener("DOMContentLoaded", async () => {

  const tablaBody = document.getElementById("tabla-body");

  try {
    const ganado = await getGanado();
    console.log("GANADO NO ACTIVO:", ganado);

    ganado.forEach(item => {

      const g = item.ganado ?? item;

      // FECHA NACIMIENTO
      const fechaNacimiento = g.fechaNacimiento
        ? `${String(g.fechaNacimiento[2]).padStart(2, '0')}/${
            String(g.fechaNacimiento[1]).padStart(2, '0')
          }/${g.fechaNacimiento[0]}`
        : "—";

      // FECHA BAJA
      const fechaBaja = item.fechaBaja
        ? `${String(item.fechaBaja[2]).padStart(2, '0')}/${
            String(item.fechaBaja[1]).padStart(2, '0')
          }/${item.fechaBaja[0]}`
        : "—";

      const peso =
        g.pesoFinal ??
        item.pesoFinal ??
        g.peso ??
        item.peso ??
        "—";

  
      const estado = item.estatus ?? g.estatus ?? "Sin estatus";

      const fila = document.createElement("tr");
      fila.innerHTML = `
      <td>${g.nombre ?? "—"}</td>
      <td>${g.idArete ?? "—"}</td>
      <td>${g.sexo ?? "—"}</td>
      <td>${g.raza?.nombreRaza ?? "—"}</td>
      <td>${fechaNacimiento}</td>
      <td>${peso} kg</td>
      <td>${fechaBaja}</td>
      <td>${estado}</td>
      `;



      tablaBody.appendChild(fila);
    });

  } catch (error) {
    console.error("Error al cargar datos de la API:", error);
  }

  document.querySelector(".btn-atras").addEventListener("click", () => {
    window.location.href = "../Page/home.html";
  });

  document.querySelector(".icono-usuario img").addEventListener("click", () => {
    window.location.href = "verUsuario.html";
  });

  document.querySelector(".btn-registrar").addEventListener("click", () => {
    window.location.href = "../Page/visualizarRegistroGanado.html";
  });

  document.querySelector(".btn-ver").addEventListener("click", () => {
    window.location.href = "../Page/visualizarRegistroVentaMuerte.html";
  });

  document.querySelector(".btn-reporte").addEventListener("click", () => {
    window.location.href = "../Page/reporteRegistro.html";
  });
});


