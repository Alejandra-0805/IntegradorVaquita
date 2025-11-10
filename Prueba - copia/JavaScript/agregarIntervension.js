document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formIntervencion");

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 

    let valido = true;
    const campos = form.querySelectorAll("input, select");

    campos.forEach((campo) => {
      if (campo.value.trim() === "" || campo.value === "Seleccione un medicamento") {
        campo.classList.add("error");
        valido = false;
      } else {
        campo.classList.remove("error");
      }
    });

    if (!valido) {
      alert("Por favor, llena todos los campos antes de agregar la intervención.");
      return;
    }

    alert("✅ Intervención agregada correctamente");
     window.location.href = "registroCuidadoEmpleado.html";
  });
});
