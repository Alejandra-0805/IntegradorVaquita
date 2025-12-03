urlBase = "http://98.95.239.253:8548";

async function getRazas() {
  const response = await fetch(urlBase + "/razas", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });
  return response.json();
}

async function agregarGanado(data) {
  const response = await fetch(urlBase + "/ganado", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return response.json();
}

async function buscarGanadoPorArete(idArete) {
  const response = await fetch(urlBase + `/ganado/arete/${idArete}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (response.status === 404) {
    return null;
  }

  return response.json(); 
}

document.addEventListener("DOMContentLoaded", async () => {

  try {
    const razas = await getRazas();
    const selectRaza = document.getElementById("raza");

    razas.forEach((raza) => {
      const option = document.createElement("option");
      option.value = raza.idRaza;
      option.textContent = raza.nombreRaza;
      selectRaza.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar razas:", error);
  }

  const form = document.getElementById("formRegistroGanado");
  const btnCancelar = document.getElementById("btnCancelar");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const idArete = document.getElementById("idArete").value.trim();
    const idRaza = document.getElementById("raza").value;
    const fecha = document.getElementById("fechaRegistro").value;
    const peso = document.getElementById("peso").value.trim();
    const sexo = document.getElementById("sexo").value.trim();

    if (!nombre || !idArete || !idRaza || !fecha || !peso || !sexo) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor completa todos los campos.",
        timer: 3500,
        showConfirmButton: false
      });
      return;
    }

    const regexSoloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!regexSoloLetras.test(nombre)) {
      Swal.fire({
        icon: "warning",
        title: "Nombre inválido",
        text: "El nombre no puede contener números ni caracteres especiales.",
        timer: 3500,
        showConfirmButton: false
      });
      return;
    }

    if (isNaN(idArete) || Number(idArete) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Número de arete inválido",
        text: "El número de arete debe ser un número mayor a cero.",
        timer: 3500,
        showConfirmButton: false
      });
      return;
    }

    if (isNaN(peso) || Number(peso) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Peso inválido",
        text: "El peso debe ser un número mayor a cero.",
        timer: 3500,
        showConfirmButton: false
      });
      return;
    }

    const sexoValido = ["Macho", "Hembra"];

    if (!sexoValido.includes(sexo)) {
      Swal.fire({
        icon: "warning",
        title: "Sexo inválido",
        text: "El sexo debe ser únicamente 'Macho' o 'Hembra'.",
        timer: 3500,
        showConfirmButton: false
      });
      return;
    }

    const fechaIngresada = new Date(fecha);
    const hoy = new Date();

    if (fechaIngresada > hoy) {
      Swal.fire({
        icon: "warning",
        title: "Fecha inválida",
        text: "La fecha no puede ser futura.",
        timer: 3500,
        showConfirmButton: false
      });
      return;
    }

    try {
      const ganadoExistente = await buscarGanadoPorArete(idArete);

      if (ganadoExistente) {
        Swal.fire({
          icon: "error",
          title: "Arete duplicado",
          text: `El número de arete ${idArete} ya está registrado en otro animal.`,
          confirmButtonText: "Entendido"
        });
        return;
      }
    } catch (error) {
      console.error("Error al verificar arete:", error);
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "No se pudo verificar si el número de arete ya existe.",
        timer: 3500,
        showConfirmButton: false
      });
      return;
    }

    const nuevoGanado = {
      idArete: Number(idArete),
      raza: {
        idRaza: Number(idRaza)
      },
      nombre: nombre,
      fechaNacimiento: fecha,
      peso: Number(peso),
      sexo: sexo
    };

    try {
      const respuesta = await agregarGanado(nuevoGanado);

      if (respuesta.error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: respuesta.error,
          confirmButtonText: "Cerrar"
        });
        return;
      }

      Swal.fire({
        icon: "success",
        title: "Registro guardado correctamente",
        timer: 3500,
        showConfirmButton: false
      });

      form.reset();
      window.location.href = "visualizarRegistroGanado.html";

    } catch (error) {
      console.error("Error al registrar ganado:", error);
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Ocurrió un error al registrar el ganado.",
        timer: 3500,
        showConfirmButton: false
      });
    }
  });

  btnCancelar.addEventListener("click", () => {
    if (confirm("¿Desea cancelar el registro?")) {
      window.location.href = "visualizarRegistroGanado.html";
    }
  });
});
