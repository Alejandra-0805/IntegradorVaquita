urlBase = "http://98.95.239.253:8548";

document.addEventListener("DOMContentLoaded", () => {

  document.querySelector(".btn-atras").addEventListener("click", () => {
    window.location.href = "intervension.html";
  });

  document.querySelector(".btn-guardar").addEventListener("click", guardarIntervension);
});

async function guardarIntervension() {

  const areteId = document.getElementById("arete").value.trim();
  const padecimiento = document.getElementById("padecimiento").value.trim();
  const medicamento = document.getElementById("medicamento").value.trim();
  const dosis = Number(document.getElementById("dosis").value.trim());
  const fechaInicio = document.getElementById("fecha-inicio").value.trim();
  const fechaRecordatorio = document.getElementById("fecha-recordatorio").value.trim();

  if (!areteId || !padecimiento || !medicamento || !fechaInicio || !fechaRecordatorio) {
    return Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Todos los campos son obligatorios.",
      timer: 3500,
      showConfirmButton: false,
    });
  }

  if (isNaN(dosis) || dosis < 0) {
    return Swal.fire({
      icon: "error",
      title: "Error...",
      text: "La dosis no puede ser negativa.",
      timer: 3500,
      showConfirmButton: false,
    });
  }

  const existeArete = await validarAreteExiste(areteId);
  if (!existeArete) {
    return Swal.fire({
      icon: "error",
      title: "Arete no encontrado",
      text: "El arete ingresado no existe en el sistema.",
      timer: 3500,
      showConfirmButton: false,
    });
  }

  if (!validarFechaNoFutura(fechaInicio)) {
    return Swal.fire({
      icon: "error",
      title: "Fecha inválida",
      text: "La fecha de inicio no puede ser futura.",
      timer: 3500,
      showConfirmButton: false,
    });
  }

  if (!validarFechaFutura(fechaRecordatorio)) {
    return Swal.fire({
      icon: "error",
      title: "Fecha inválida",
      text: "La fecha del recordatorio debe ser futura.",
      timer: 3500,
      showConfirmButton: false,
    });
  }

  const datos = {
    areteId: Number(areteId),
    padecimiento,
    nombreMedicamento: medicamento,
    dosis,
    fechaInicioReceta: fechaInicio,
    fechaRecordatorio
  };

  console.log("JSON enviado:", datos);

  try {
    const resp = await fetch(urlBase + "/receta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });

    if (!resp.ok) {
      const tx = await resp.text();
      console.error("Error API:", tx);
      throw new Error("Error al registrar intervención");
    }

    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: "La intervención fue registrada correctamente.",
      timer: 3500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      window.location.href = "intervension.html";
    }, 1500);

  } catch (e) {
    console.error("Error:", e);
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "No se pudo registrar la intervención.",
      timer: 3500,
      showConfirmButton: false,
    });
  }
}

async function validarAreteExiste(id) {
  try {
    const resp = await fetch(urlBase + "/ganado/existe/" + id);
    if (!resp.ok) return false;
    const existe = await resp.json();
    return existe === true;
  } catch {
    return false;
  }
}

function validarFechaFutura(fechaStr) {
  const fecha = new Date(fechaStr);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return fecha > hoy;
}

function validarFechaNoFutura(fechaStr) {
  const fecha = new Date(fechaStr);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return fecha <= hoy;
}
