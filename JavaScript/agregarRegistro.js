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

/*       if (respuesta) {
        alert("❌ Error: " + respuesta.error);
        return;
      } */

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
      alert("❌ Ocurrió un error al registrar el ganado");
    
  };

  const form = document.getElementById("formRegistroGanado");
  const btnCancelar = document.getElementById("btnCancelar");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const idArete = document.getElementById("idArete").value;
    const idRaza = document.getElementById("raza").value;
    const fecha = document.getElementById("fechaRegistro").value;
    const peso = document.getElementById("peso").value;
    const sexo = document.getElementById("sexo").value;

    if (!nombre || !idArete || !idRaza || !fecha || !peso || !sexo) {
      alert("Por favor complete todos los campos.");
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

      alert("✅ Registro guardado correctamente");

      form.reset();
      window.location.href = "visualizarRegistroGanado.html";

    } catch (error) {
      console.error(error);
      alert("❌ Ocurrió un error al registrar el ganado");
    }
  });

  btnCancelar.addEventListener("click", () => {
    if (confirm("¿Desea cancelar el registro?")) {
      window.location.href = "visualizarRegistroGanado.html";
    }
  });

});
