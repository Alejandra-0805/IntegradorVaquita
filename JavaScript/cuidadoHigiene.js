urlBase = "http://98.95.239.253:8548"; 

async function getCuidados() {
  try {
    const endpoint = "/receta"; 

    const response = await fetch(urlBase + endpoint, {
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
    console.error("❌ Error en getCuidados():", error);
    return null;
  }
}


function llenarTabla(lista) {
  const tbody = document.querySelector("tbody");
  if (!tbody) {
    console.error("❌ No se encontró el <tbody> para llenar la tabla.");
    return;
  }
  tbody.innerHTML = ""; 

  lista.forEach(item => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
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

document.addEventListener("DOMContentLoaded", async () => {

  const btnAtras = document.querySelector(".btn-atras");
  if (btnAtras) {
    btnAtras.addEventListener("click", () => {
      window.location.href = "home.html"; 
    });
  }

  const btnRegistrar = document.querySelector(".btn-registrar");
  if (btnRegistrar) {
    btnRegistrar.addEventListener("click", () => {
      window.location.href = "agregarIntervension.html"; 
    });
  }

  const iconoUsuario = document.querySelector(".icono-usuario img");
  if (iconoUsuario) {
    iconoUsuario.addEventListener("click", () => {
      window.location.href = "home.html";
    });
  }

  const links = document.querySelectorAll(".barra-verde a");
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const destino = link.getAttribute("href");
      if (destino && destino !== "#") window.location.href = destino;
    });
  });

  
  console.log("Cargando datos de cuidados...");
  const cuidados = await getCuidados();
  console.log("Cuidados recibidos desde API:", cuidados);

  if (cuidados) {
    llenarTabla(cuidados);
  } else {
    const tbody = document.querySelector("tbody");
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;">No se pudieron cargar los datos o la lista está vacía.</td></tr>';
    }
  }
});