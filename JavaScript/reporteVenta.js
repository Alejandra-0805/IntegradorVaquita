urlBase = "http://98.95.239.253:8548";

async function getVentas() {
  const response = await fetch(urlBase + "/reportes/ventas", {
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

  let datos = await getVentas();

  const datosFiltrados = datos.filter(d => d.columna !== "Total");

  const total = datos.find(d => d.columna === "Total")?.numero || 0;

  const tbody = document.getElementById("tabla-datos");
  tbody.innerHTML = "";

  datosFiltrados.forEach(d => {
    tbody.innerHTML += `
      <tr>
        <td>${d.columna}</td>
        <td>${d.numero.toLocaleString()}</td>
        <td>${d.porcentaje} %</td>
      </tr>`;
  });

  tbody.innerHTML += `
    <tr>
      <td><b>TOTAL</b></td>
      <td><b>${total.toLocaleString()}</b></td>
      <td><b>100 %</b></td>
    </tr>`;

  const ctx = document.getElementById("grafica").getContext("2d");
  new Chart(ctx, {
    type: "pie",
    data: {
      labels: datosFiltrados.map(d => d.columna),
      datasets: [{
        data: datosFiltrados.map(d => d.numero),
        backgroundColor: ["#ff9999", "#66b3ff"]
      }]
    },
    options: {
      responsive: false,
      plugins: {
        legend: { position: "bottom" }
      }
    }
  });
}

cargarDatos();
