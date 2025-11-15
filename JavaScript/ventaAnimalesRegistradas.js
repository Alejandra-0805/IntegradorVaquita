urlBase = "http://98.95.239.253:8548";

async function getVenta() {
  const resp = await fetch(urlBase + "/ganado/activos", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  const data = await resp.json();

  // Filtrar solo los activos correctamente
  return data.filter(g => g.estatus === "Activo");
}
function formatearFecha(fecha) {
  if (!fecha) return "—";

  if (Array.isArray(fecha)) {
    const [anio, mes, dia] = fecha;
    return `${anio}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
  }

  const f = new Date(fecha);
  return isNaN(f) ? "—" : f.toISOString().split("T")[0];
}


document.addEventListener("DOMContentLoaded", async () => {

  const tbody = document.querySelector("tbody");

  try {
    const registros = await getVenta();

    console.log("Registros recibidos:", registros);

    tbody.innerHTML = "";

    registros.forEach((animal) => {

      const fechaNacimiento = formatearFecha(animal.fechaNacimiento);
      const fechaBaja = animal.fechaBaja ? formatearFecha(animal.fechaBaja) : "—";

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${animal.nombre}</td>
        <td>${animal.idArete}</td>
        <td>${animal.sexo}</td>
        <td>${animal.raza.nombreRaza}</td>
        <td>${fechaNacimiento}</td>
         <td>${animal.peso}</td>
      `;
      tbody.appendChild(fila);
    });

  } catch (error) {
    console.error("Error al cargar datos de la API:", error);
  }

});

  // Botones
  const btnAtras = document.querySelector(".btn-atras");
  const btnVisualizar = document.querySelector(".btn-registrar");
  const btnVentaMuerte = document.querySelector(".btn-ver");

  btnAtras.addEventListener("click", () => {
    window.location.href = "../Page/home.html";
  });

  const iconoUsuario = document.querySelector(".icono-usuario img");
  iconoUsuario.addEventListener("click", () => {
    window.location.href = "verUsuario.html";
  });

  btnVisualizar.addEventListener("click", () => {
    window.location.href = "../Page/ventaAnimalesRegistradas.html";
  });

  btnVentaMuerte.addEventListener("click", () => {
    window.location.href = "../Page/ventaRegistrada.html";
  });

  // Evitar error del código anterior
  const editBtn = document.querySelector(".edit-btn");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      window.location.href = "../Page/EditarVenta.html";
    });
  }

