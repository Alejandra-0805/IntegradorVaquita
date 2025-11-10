document.addEventListener("DOMContentLoaded", () => {

  // === Ir a Ver Usuario ===
  const btnVer = document.querySelector(".btn-ver");
  btnVer.addEventListener("click", () => {
    window.location.href = "verUsuario.html";
  });

  // === Icono usuario (arriba derecha): volver al home ===
  const iconoUsuario = document.querySelector(".icono-usuario img");
  iconoUsuario.addEventListener("click", () => {
    window.location.href = "home.html";
  });

  // === Guardar datos del formulario ===
  const form = document.getElementById("formUsuario");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = {
      nombre: document.getElementById("nombre").value,
      telefono: document.getElementById("telefono").value,
      sexo: document.getElementById("sexo").value,
      edad: document.getElementById("edad").value,
      correo: document.getElementById("correo").value,
      contrasena: document.getElementById("contrasena").value
    };

    // Validación básica
    if (!usuario.nombre || !usuario.telefono || !usuario.correo || !usuario.contrasena) {
      alert("Por favor llena todos los campos obligatorios.");
      return;
    }

    // Guardar en localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("✅ Usuario registrado correctamente.");
    form.reset();
  });

});
