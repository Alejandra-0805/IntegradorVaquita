urlBase = "http://98.95.239.253:8548";

document.addEventListener("DOMContentLoaded", async () => {

  const params = new URLSearchParams(window.location.search);
  const idGanado = params.get("id");

  if (!idGanado) {
    alert("⚠ No se recibió un ID para editar.");
    return;
  }

  console.log("ID recibido en la URL:", idGanado);

  const datos = await getGanadoById(idGanado);

  if (!datos) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "El registro no existe en la API.",
      timer: 4000,
      showConfirmButton: false,
    });
    return;
  }

  console.log("Datos recibidos:", datos);

  document.getElementById("nombre").value = datos.nombre;
  document.getElementById("idArete").value = datos.idArete;
  document.getElementById("raza").value = datos.raza.nombreRaza;
  document.getElementById("fechaRegistro").value = formatearFecha(datos.fechaNacimiento);
  document.getElementById("peso").value = datos.peso;
  document.getElementById("sexo").value = datos.sexo;
  document.getElementById("fechaBaja").value = datos.fechaBaja || "";

  document.getElementById("btnEditar").addEventListener("click", async () => {

    const fechaBaja = document.getElementById("fechaBaja").value;
    const fechaNacimiento = document.getElementById("fechaRegistro").value;

    if (fechaBaja) {
      const fBaja = new Date(fechaBaja);
      const fNacimiento = new Date(fechaNacimiento);
      const hoy = new Date();

      hoy.setHours(0, 0, 0, 0);

      if (fBaja <= fNacimiento) {
        Swal.fire({
          icon: "warning",
          title: "Fecha inválida",
          text: "La fecha de baja debe ser mayor que la fecha de nacimiento.",
          timer: 4000,
          showConfirmButton: false
        });
        return;
      }

      if (fBaja > hoy) {
        Swal.fire({
          icon: "warning",
          title: "Fecha inválida",
          text: "La fecha de baja no puede ser mayor que la fecha actual.",
          timer: 4000,
          showConfirmButton: false
        });
        return;
      }
    }

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
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Error al actualizar el registro.",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    const resultado = await response.json();
    console.log("Registro actualizado:", resultado);

    Swal.fire({
      icon: "success",
      title: "Registro actualizado correctamente...",
      timer: 4000,
      showConfirmButton: false,
    });

    window.location.href = "visualizarRegistroGanado.html";

  });

});

async function getGanadoById(id) {
  const resp = await fetch(`${urlBase}/ganado/${id}`);
  if (!resp.ok) return null;
  return resp.json();
}

function formatearFecha(f) {
  if (!Array.isArray(f)) return f;
  const [y, m, d] = f;
  return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}
