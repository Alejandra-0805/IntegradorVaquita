
urlBase = "http://98.95.239.253:8548";

document.addEventListener("DOMContentLoaded", async () => {

  // 1️⃣ Obtener ID que viene por la URL
  const params = new URLSearchParams(window.location.search);
  const idGanado = params.get("id");

  if (!idGanado) {
    alert("⚠ No se recibió un ID para editar.");
    return;
  }

  console.log("ID recibido en la URL:", idGanado);

  // 2️⃣ Obtener los datos
  const datos = await getGanadoById(idGanado);

  if (!datos) {
    alert("❌ El registro no existe en la API.");
    return;
  }

  console.log("Datos recibidos:", datos);

  // 3️⃣ Rellenar los campos (COINCIDEN CON TU HTML)
  document.getElementById("nombre").value = datos.nombre;
  document.getElementById("idArete").value = datos.idArete;
  document.getElementById("raza").value = datos.raza.nombreRaza;
  document.getElementById("fechaRegistro").value = formatearFecha(datos.fechaNacimiento);
  document.getElementById("peso").value = datos.peso;
  document.getElementById("sexo").value = datos.sexo;
  document.getElementById("fechaBaja").value = datos.fechaBaja || "";

  // 4️⃣ Evento botón editar (solo PATCH)
  document.getElementById("btnEditar").addEventListener("click", async () => {

    const fechaBaja = document.getElementById("fechaBaja").value;

    const patchData = {
      fechaBaja: fechaBaja || null
    };

    console.log("PATCH enviado:", patchData);

    const response = await fetch(`${urlBase}/ganado/${idGanado}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patchData)
    });

    console.log("Status PATCH:", response.status);

    if (!response.ok) {
      alert("❌ Error al actualizar. La API devolvió " + response.status);
      return;
    }

    alert("✔ Registro actualizado correctamente");
    window.location.href = "visualizarRegistroGanado.html";
  });

});


// 🔍 Función para obtener un registro por ID
async function getGanadoById(id) {
  const resp = await fetch(`${urlBase}/ganado/${id}`);
  if (!resp.ok) return null;
  return resp.json();
}


// 🗓️ Convierte fecha de array [2025,11,15] → "2025-11-15"
function formatearFecha(f) {
  if (!Array.isArray(f)) return f;
  const [y, m, d] = f;
  return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

