document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".login-form");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("password").value.trim();

    if (correo === "" || password === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      alert("Por favor, introduce un correo electrónico válido.");
      return;
    }

    const usuarios = [
      { correo: "admin@vaquitasoft.com", password: "Alejandra_12", rol: "admin" },
      { correo: "emple@vaquitasoft.com", password: "Alejandra_13", rol: "empleado" }
    ];

    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );

    if (usuarioEncontrado) {
      alert(`Inicio de sesión exitoso. ¡Bienvenido ${usuarioEncontrado.rol === "admin" ? "Administrador" : "Encargado"}!`);

      localStorage.setItem("rolUsuario", usuarioEncontrado.rol);

      if (usuarioEncontrado.rol === "admin") {
        window.location.href = "../Page/home.html";
      } else if (usuarioEncontrado.rol === "empleado") {
        window.location.href = "../Page/homeEmpleado.html";
      }
    } else {
      alert("Correo o contraseña incorrectos. Inténtalo de nuevo.");
    }
  });
});

