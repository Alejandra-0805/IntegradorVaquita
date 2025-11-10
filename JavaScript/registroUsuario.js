// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {

  // === Ir a la vista "Ver Usuario" ===
  const btnVer = document.querySelector(".activo2");
  btnVer.addEventListener("click", () => {
    window.location.href = "verUsuario.html";
  });

  // === Icono de perfil (arriba a la derecha) ===
  const iconoPerfil = document.querySelector(".perfil img");
  iconoPerfil.addEventListener("click", () => {
    window.location.href = "home.html"; // vuelve al Home o al perfil si lo deseas
  });

  // === Manejar el envío del formulario ===
  const formulario = document.querySelector(".formulario");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el refresco de la página

    // Obtener valores de los campos
    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const sexo = document.getElementById("sexo").value;
    const edad = document.getElementById("edad").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const pass = document.getElementById("pass").value.trim();

    // === Validar campos vacíos ===
    if (!nombre || !telefono || !sexo || !edad || !correo || !pass) {
      alert("⚠️ Por favor, completa todos los campos antes de agregar.");
      return;
    }

    // === Simular guardado en localStorage (puedes conectar a BD después) ===
    const nuevoUsuario = { nombre, telefono, sexo, edad, correo, pass };
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert(`✅ Usuario "${nombre}" registrado con éxito.`);
    formulario.reset(); // Limpiar formulario
  });

});
