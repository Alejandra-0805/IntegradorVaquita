urlBase = "http://98.95.239.253:8548";

async function agregarGanado(data) {
  const response = await fetch(urlBase + "/ganado", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  return response.json();
}

async function getRazas() {
  const response = await fetch(urlBase + "/razas", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
      const razas = await getRazas();
      console.log(razas)
      const selectRaza = document.getElementById("raza")
      razas.forEach((raza) => {
        const option = document.createElement("option");
        option.value = raza.idRaza
        option.textContent = raza.nombreRaza
        selectRaza.appendChild(option);
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Ocurrió un error al cargar las razas",
        timer: 4000,
        showConfirmButton: false,
      });
  };

  const form = document.getElementById("formRegistroGanado");
  const btnCancelar = document.getElementById("btnCancelar");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const idArete = document.getElementById("idArete").value;
    const idRaza = document.getElementById("raza").value;
    const fecha = document.getElementById("fechaRegistro").value;
    const peso = document.getElementById("peso").value;
    const sexo = document.getElementById("sexo").value;

    const regexSoloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    if (!regexSoloLetras.test(nombre)) {
      Swal.fire({
        icon: "warning",
        title: "Nombre inválido",
        text: "El nombre no puede contener números ni caracteres especiales.",
        timer: 4000,
        showConfirmButton: false
      });
      return;
    }

    const camposNumericos = [
      { valor: idArete, nombre: "Número de arete" },
      { valor: peso, nombre: "Peso" }
    ];

    for (const campo of camposNumericos) {
      if (campo.valor === "") continue;

      if (Number(campo.valor) < 0) {
        Swal.fire({
          icon: "warning",
          title: "Dato inválido",
          text: `${campo.nombre} no puede ser negativo.`,
          timer: 4000,
          showConfirmButton: false
        });
        return;
      }
    }

    if (!nombre || !idArete || !idRaza || !fecha || !peso || !sexo) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Por favor completa todos los campos.",
        timer: 4000,
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
        alert("❌ Error: " + respuesta.error);
        return;
      }
      console.log("Ganado registrado:", respuesta);
      
      Swal.fire({
        icon: "success",
        title: "Registro Guardado correctamente...",
        timer: 4000,
        showConfirmButton: false,
      });

      form.reset();
      window.location.href = "visualizarRegistroGanado.html";

    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Ocurrió un error al registrar el ganado",
        timer: 4000,
        showConfirmButton: false,
      });
    }
  });

  btnCancelar.addEventListener("click", () => {
    if (confirm("¿Desea cancelar el registro?")) {
      window.location.href = "visualizarRegistroGanado.html";
    }
  });

});

