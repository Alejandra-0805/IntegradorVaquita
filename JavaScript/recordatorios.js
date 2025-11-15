const urlBase = "http://98.95.239.253:8548";


async function getRecordatorios() {
  try {
    const response = await fetch(urlBase + "/recordatorios");

    return await response.json();
  } catch (error) {
    console.error("Error getRecordatorios(): ", error);
    return [];
  }
}

function convertirFecha(f) {
  if (Array.isArray(f)) {
    const [y, m, d] = f;
    return new Date(y, m - 1, d);
  }

  if (typeof f === "string") {
    const [y, m, d] = f.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  return new Date(NaN);
}

document.addEventListener("DOMContentLoaded", async () => {
  const fechaBanos = document.getElementById("fecha-banos");
  const fechaTratamientos = document.getElementById("fecha-tratamientos");
  const fechaVacunas = document.getElementById("fecha-vacunas");

  const recordatorios = await getRecordatorios();

  if (!recordatorios || recordatorios.length === 0) {
    fechaBanos.textContent = "Sin fecha";
    fechaTratamientos.textContent = "Sin fecha";
    fechaVacunas.textContent = "Sin fecha";
    return;
  }

  recordatorios.forEach(r => {
    r.fechaObj = convertirFecha(r.fechaRecordatorio);
  });

  recordatorios.sort((a, b) => a.fechaObj - b.fechaObj);

  const proximo1 = recordatorios[0];
  const proximo2 = recordatorios[1] || recordatorios[0];
  const proximo3 = recordatorios[2] || recordatorios[0];

  fechaBanos.textContent = proximo1.fechaObj.toLocaleDateString("es-MX");
  fechaTratamientos.textContent = proximo2.fechaObj.toLocaleDateString("es-MX");
  fechaVacunas.textContent = proximo3.fechaObj.toLocaleDateString("es-MX");
});
