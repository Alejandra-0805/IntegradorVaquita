document.addEventListener("DOMContentLoaded", () => {
  const btnEditar = document.getElementById("btnEditar");

  const valoresOriginales = {
    nombre: document.getElementById("nombre").value,
    arete: document.getElementById("arete").value,
    raza: document.getElementById("raza").value,
    fechaRegistro: document.getElementById("fechaRegistro").value,
    peso: document.getElementById("peso").value,
    sexo: document.getElementById("sexo").value,
    fechaMuerte: document.getElementById("fechaMuerte").value
  };

  btnEditar.addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const arete = document.getElementById("arete").value;
    const raza = document.getElementById("raza").value;
    const fechaRegistro = document.getElementById("fechaRegistro").value;
    const peso = document.getElementById("peso").value;
    const sexo = document.getElementById("sexo").value;
    const fechaMuerte = document.getElementById("fechaMuerte").value;

    if (!nombre || !arete) {
      alert("⚠️ Por favor, completa todos los campos obligatorios.");
      return;
    }

    const cambios =
      nombre !== valoresOriginales.nombre ||
      arete !== valoresOriginales.arete ||
      raza !== valoresOriginales.raza ||
      fechaRegistro !== valoresOriginales.fechaRegistro ||
      peso !== valoresOriginales.peso ||
      sexo !== valoresOriginales.sexo ||
      fechaMuerte !== valoresOriginales.fechaMuerte;

    if (!cambios) {
      alert("⚠️ No se detectaron cambios para guardar.");
      return;
    }

    alert("✅ Registro actualizado con éxito.");
    window.location.href = "visualizarRegistroGanadoEmpleado.html";
  });
});
