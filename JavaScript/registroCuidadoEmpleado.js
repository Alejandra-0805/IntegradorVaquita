urlBase = "http://98.95.239.253:8548";

function irRecordatorios() {
  window.location.href = "recordatorios.html";
}

document.addEventListener("DOMContentLoaded", async () => {

  document.querySelector(".btn-atras").addEventListener("click", () => {
    window.location.href = "homeEmpleado.html";
  });

  document.querySelector(".btn-agregar").addEventListener("click", () => {
    window.location.href = "agregarIntervension.html";
  });

  const cuidados = await getCuidados();
  console.log("Cuidados recibidos desde API:", cuidados);

  if (cuidados) {
    llenarTabla(cuidados);
  }
});

async function getCuidados() {
  try {
    const response = await fetch(urlBase + "/receta", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    });

    if (!response.ok) {
      throw new Error("Error al obtener los cuidados: " + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error("Error en getCuidados():", error);
    return null;
  }
}

function llenarTabla(lista) {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = ""; // Limpiar tabla

  lista.forEach(item => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><input type="checkbox"></td>
      <td>${item.nombreAnimal || "N/A"}</td>
      <td>${item.areteId || "N/A"}</td>
      <td>${item.padecimiento || "N/A"}</td>
      <td>${formatearFecha(item.fechaInicioReceta)}</td>
      <td>${item.nombreMedicamento || "N/A"}</td>
      <td>${item.dosis ? item.dosis + " ML" : "N/A"}</td>
      <td>${formatearFecha(item.fechaRecordatorio)}</td>
    `;

    tbody.appendChild(tr);
  });
}

function formatearFecha(fechaArray) {
  if (!fechaArray) return "N/A";

  const [anio, mes, dia] = fechaArray;
  return `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${anio}`;
}
