const datos = [
  { nombre: "PAULA", precio: 18500 },
  { nombre: "WILLY", precio: 23000 }
];

const total = datos.reduce((sum, d) => sum + d.precio, 0);

const tbody = document.getElementById("tabla-datos");
datos.forEach(d => {
  const porcentaje = ((d.precio / total) * 100).toFixed(1);
  const fila = `<tr>
      <td>${d.nombre}</td>
      <td>${d.precio.toLocaleString()}</td>
      <td>${porcentaje} %</td>
    </tr>`;
  tbody.innerHTML += fila;
});

tbody.innerHTML += `<tr>
  <td><b>TOTAL</b></td>
  <td><b>${total.toLocaleString()}</b></td>
  <td><b>100 %</b></td>
</tr>`;

const ctx = document.getElementById("grafica").getContext("2d");
new Chart(ctx, {
  type: "pie",
  data: {
    labels: datos.map(d => d.nombre),
    datasets: [{
      data: datos.map(d => d.precio),
      backgroundColor: ["#ff9999", "#66b3ff"],
    }]
  },
  options: {
    responsive: false,
    plugins: {
      legend: { position: "bottom" }
    }
  }
});
