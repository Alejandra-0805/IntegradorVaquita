urlBase="http://127.0.0.1:8548"
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
      Swal.fire({
      icon: "success",
      title: "Inicio de sesión exitoso...",
      text: "Bienvenido " + rolNombre,
      timer: 2000,
      showConfirmButton: false,
      });;

      localStorage.setItem("rolUsuario", rolNombre);
      localStorage.setItem("idUsuario", usuarioEncontrado.idUser);
      localStorage.setItem("token", usuarioEncontrado.token); // si lo necesitas para futuras peticiones

      if (usuarioEncontrado.idUser === 1) {
        window.location.href = "../Page/home.html";
      } else {
        window.location.href = "../Page/homeEmpleado.html";
      }
    } else {
      Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Credenciales incorrectas!",
       timer: 2000,
      showConfirmButton: false,
      });;
    }
  } catch (error) {
    console.error("Error en el login:", error);
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Credenciales incorrectas!",
      timer: 2000,
      showConfirmButton: false,
      });;
  }
}
function guardarCookies(token, idUser) {
  document.cookie = `token=${token}; path=/; max-age=3600`; 
  document.cookie = `idUser=${idUser}; path=/; max-age=3600`; 
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
