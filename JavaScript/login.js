urlBase="http://98.95.239.253:8548"
async function login(data) {
    const response = await fetch(urlBase+"/usuarios/login", {
    method: 'POST', 
    mode: 'cors', 
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer', 
    body: JSON.stringify(data) 
  });
  return response.json(); 
}
async function iniciarSesion(correo, password) {
  try {
    const usuarioEncontrado = await login({ email: correo, clave: password });
    console.log("Respuesta del login:", usuarioEncontrado);

    if (usuarioEncontrado && usuarioEncontrado.estado && usuarioEncontrado.idUser != null) {
      const rolNombre = usuarioEncontrado.idUser === 1 ? "Administrador" : "Encargado";
      alert(`Inicio de sesión exitoso. ¡Bienvenido ${rolNombre}!`);

      localStorage.setItem("rolUsuario", rolNombre);
      localStorage.setItem("idUsuario", usuarioEncontrado.idUser);
      localStorage.setItem("token", usuarioEncontrado.token); // si lo necesitas para futuras peticiones

      if (usuarioEncontrado.idUser === 1) {
        window.location.href = "../Page/home.html";
      } else {
        window.location.href = "../Page/homeEmpleado.html";
      }
    } else {
      alert(usuarioEncontrado.mensaje || "Credenciales incorrectas o usuario no autorizado.");
    }
  } catch (error) {
    console.error("Error en el login:", error);
    alert("Error al conectar con el servidor. Intenta nuevamente.");
  }
}

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

    iniciarSesion(correo, password)
  });
});
