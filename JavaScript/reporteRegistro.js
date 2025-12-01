urlBase = "http://98.95.239.253:8548";

async function getRegistros() {
  const response = await fetch(urlBase + "/reportes/registros", {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"
  });

  return response.json();
}

async function cargarDatos() {
  let datos = await getRegistros();

  const totalObj = datos.find(d => d.columna === "Total");
  const total = totalObj ? totalObj.numero : 0;

  const datosEventos = datos.filter(d => d.columna !== "Total");

  const tbody = document.getElementById("tabla-datos");
  tbody.innerHTML = "";

  datosEventos.forEach(d => {
    const porcentaje = ((d.numero / total) * 100).toFixed(1);
    const fila = `
      <tr>
        <td>${d.columna}</td>
        <td>${d.numero}</td>
        <td>${porcentaje} %</td>
      </tr>`;
    tbody.innerHTML += fila;
  });

  tbody.innerHTML += `
    <tr>
      <td><b>TOTAL</b></td>
      <td><b>${total}</b></td>
      <td><b>100 %</b></td>
    </tr>
  `;

  const ctx = document.getElementById("grafica").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: datosEventos.map(d => d.columna),
      datasets: [{
        data: datosEventos.map(d => d.numero),
        backgroundColor: ["#ff6666", "#66b3ff"]
      }]
    },
    options: {
      responsive: false,
      plugins: { legend: { position: "bottom" } }
    }
  });
}

cargarDatos();
