urlBase = "http://98.95.239.253:8548";

const params = new URLSearchParams(window.location.search);
const idUsuario = params.get("id");

async function getUsuario(id) {
  const response = await fetch(urlBase + "/usuarios/" + idUsuario, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

  return response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
 
  const usuario = await getUsuario(idUsuario);
  console.log("Usuario a editar:", usuario);

  let claveActual = usuario.clave; 

  document.getElementById("telefono").value = usuario.telefono || "";
  document.getElementById("email").value = usuario.email || "";
  document.getElementById("clave").value = usuario.clave || "";

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

    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();
    const clave = document.getElementById("clave").value.trim();

    if (!telefono || !email || !clave) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Por favor llena todos los campos obligatorios.",
        timer: 4000,
        showConfirmButton: false
      });
      return;
    }

    const regexTelefono = /^[0-9]{10}$/;
    if (!regexTelefono.test(telefono)) {
      Swal.fire({
        icon: "warning",
        title: "Teléfono inválido",
        text: "El teléfono debe contener solo números y tener 10 dígitos.",
        timer: 4000,
        showConfirmButton: false
      });
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      Swal.fire({
        icon: "warning",
        title: "Correo inválido",
        text: "Ingresa un correo electrónico válido.",
        timer: 4000,
        showConfirmButton: false
      });
      return;
    }

    if (clave === claveActual) {
      Swal.fire({
        icon: "info",
        title: "Contraseña repetida",
        text: "La nueva contraseña no puede ser igual a la anterior.",
        timer: 4000,
        showConfirmButton: false
      });
      return;
    }

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{12,}$/;

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
        timer: 6000,
        showConfirmButton: false
      });
      return;
    }

    const usuarioEditado = {
      telefono: telefono,
      email: email,
      clave: clave
    };

    try {
      const response = await fetch(urlBase + "/usuarios/" + idUsuario, {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(usuarioEditado)
      });

      if (!response.ok) {
        throw new Error("Error al editar el usuario");
      }

      const resultado = await response.json();
      console.log("Usuario actualizado:", resultado);

      Swal.fire({
        icon: "success",
        title: "Usuario editado correctamente...",
        timer: 4000,
        showConfirmButton: false
      });

      claveActual = clave;
      form.reset();

    } catch (error) {
      console.error("Error en la edición:", error);
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Hubo un problema al editar el usuario.",
        timer: 4000,
        showConfirmButton: false
      });
    }
  });
});
