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

  document.getElementById("telefono").value = usuario.telefono || "";
  document.getElementById("email").value = usuario.email|| "";
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

    const usuario = {
      telefono: document.getElementById("telefono").value,
      email: document.getElementById("email").value,
      clave: document.getElementById("clave").value
    };

    if (!usuario.telefono || !usuario.email || !usuario.clave) {
      Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Por favor llena todos los campos obligatorios.",
      timer: 4000,
      showConfirmButton: false,
      });;
      return;
    }

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
    body: JSON.stringify(usuario)
  });

  if (!response.ok) {
    throw new Error("Error al registrar el usuario");
  }

  const resultado = await response.json();
  console.log("Usuario actualizado:", resultado);
   Swal.fire({
      icon: "success",
      title: "Usuario editado correctamente...",
      timer: 4000,
      showConfirmButton: false,
      });;
  form.reset();
} catch (error) {
  console.error("Error en el registro:", error);
  Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Hubo un problema al registrar el usuario.",
      timer: 4000,
      showConfirmButton: false,
      });;
}

  });
});