urlBase = "http://98.95.239.253:8548";

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
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = {
      nombre: document.getElementById("nombre").value,
      telefono: document.getElementById("telefono").value,
      sexo: document.getElementById("sexo").value,
      edad: document.getElementById("edad").value,
      email: document.getElementById("email").value,
      clave: document.getElementById("clave").value
    };

    // Validación básica
    if (!usuario.nombre || !usuario.telefono || !usuario.email || !usuario.clave) {
      alert("Por favor llena todos los campos obligatorios.");
      return;
    }

    try {
      const response = await fetch(urlBase + "/usuarios", {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(usuario)
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      const resultado = await response.json();
      console.log("Usuario registrado:", resultado);

      alert("✅ Usuario registrado correctamente.");
      form.reset();
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un problema al registrar el usuario.");
    }
  });
});