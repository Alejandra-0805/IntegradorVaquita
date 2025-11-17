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

  // Rellenar el formulario con los datos del usuario
  document.getElementById("telefono").value = usuario.telefono || "";
  document.getElementById("email").value = usuario.email|| "";
  document.getElementById("clave").value = usuario.clave || "";

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
      telefono: document.getElementById("telefono").value,
      email: document.getElementById("email").value,
      clave: document.getElementById("clave").value
    };

    // Validación básica
    if (!usuario.telefono || !usuario.email || !usuario.clave) {
      alert("Por favor llena todos los campos obligatorios.");
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

  alert("✅ Usuario editado correctamente.");
  form.reset();
} catch (error) {
  console.error("Error en el registro:", error);
  alert("Hubo un problema al registrar el usuario.");
}

  });
});