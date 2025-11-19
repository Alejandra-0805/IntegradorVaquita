urlBase = "http://98.95.239.253:8548";

document.addEventListener("DOMContentLoaded", () => {

  const btnVer = document.querySelector(".btn-ver");
  btnVer.addEventListener("click", () => {
    window.location.href = "verUsuario.html";
  });

  const iconoUsuario = document.querySelector(".icono-usuario img");
  iconoUsuario.addEventListener("click", () => {
    window.location.href = "home.html";
  });

  const form = document.getElementById("formUsuario");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const sexo = document.getElementById("sexo").value;
    const edad = document.getElementById("edad").value.trim();
    const email = document.getElementById("email").value.trim();
    const clave = document.getElementById("clave").value;

    if (nombre === "" || /\d/.test(nombre)) {
      Swal.fire({
        icon: "warning",
        title: "Nombre inválido",
        text: "El nombre no puede estar vacío ni contener números.",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    if (!/^\d{10,}$/.test(telefono)) {
      Swal.fire({
        icon: "warning",
        title: "Teléfono inválido",
        text: "El teléfono debe tener al menos 10 dígitos y solo números.",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    if (edad === "" || isNaN(edad) || edad <= 0 || edad > 100) {
      Swal.fire({
        icon: "warning",
        title: "Edad inválida",
        text: "Ingrese una edad válida (1 a 120).",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Ingrese un correo electrónico válido.",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{12,}$/;

    if (!regexPassword.test(clave)) {
      Swal.fire({
        icon: "warning",
        title: "Contraseña inválida",
        html: `
          La contraseña debe contener:<br>
          • Mínimo <b>12 caracteres</b><br>
          • Una <b>mayúscula</b><br>
          • Una <b>minúscula</b><br>
          • Un <b>número</b><br>
          • Un <b>carácter especial</b> (!@#$%^&*)
        `,
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    const usuario = {
      nombre,
      telefono,
      sexo,
      edad: Number(edad),
      email,
      clave,
    };

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

      Swal.fire({
        icon: "success",
        title: "Usuario registrado correctamente",
        timer: 4000,
        showConfirmButton: false,
      });

      form.reset();

    } catch (error) {
      console.error("Error en el registro:", error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al registrar el usuario.",
        timer: 4000,
        showConfirmButton: false,
      });
    }
  });
});
