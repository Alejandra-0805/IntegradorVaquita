const datos = [
  { evento: "MUERTE", cantidad: 1 },
  { evento: "VENDIDO", cantidad: 1 }
];

const total = datos.reduce((sum, d) => sum + d.cantidad, 0);

const tbody = document.getElementById("tabla-datos");
datos.forEach(d => {
  const porcentaje = ((d.cantidad / total) * 100).toFixed(0);
  const fila = `<tr>
      <td>${d.evento}</td>
      <td>${d.cantidad}</td>
      <td>${porcentaje} %</td>
    </tr>`;
  tbody.innerHTML += fila;
});

tbody.innerHTML += `<tr>
  <td><b>TOTAL</b></td>
  <td><b>${total}</b></td>
  <td><b>100 %</b></td>
</tr>`;

const ctx = document.getElementById("grafica").getContext("2d");
new Chart(ctx, {
  type: "pie",
  data: {
    labels: datos.map(d => d.evento),
    datasets: [{
      data: datos.map(d => d.cantidad),
      backgroundColor: ["#ff6666", "#66b3ff"],
    }]
  },
  options: {
    responsive: false,
    plugins: {
      legend: { position: "bottom" }
    }
  }
});
