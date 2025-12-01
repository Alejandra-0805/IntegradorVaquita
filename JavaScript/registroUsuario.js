urlBase = "http://98.95.239.253:8548";

document.addEventListener("DOMContentLoaded", () => {

  const btnVer = document.querySelector(".activo2");
  btnVer.addEventListener("click", () => {
    window.location.href = "verUsuario.html";
  });

  const iconoPerfil = document.querySelector(".perfil img");
  iconoPerfil.addEventListener("click", () => {
    window.location.href = "home.html"; 
  });

  const formulario = document.querySelector(".formulario");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const nombre = document.getElementById("nombre").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const sexo = document.getElementById("sexo").value;
    const edad = document.getElementById("edad").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const pass = document.getElementById("pass").value.trim();

    if (!nombre || !telefono || !sexo || !edad || !correo || !pass) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Por favor, completa todos los campos antes de agregar.",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre)) {
      Swal.fire({
        icon: "error",
        title: "Nombre inválido",
        text: "El nombre no puede contener números ni caracteres especiales.",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    if (!/^\d{10}$/.test(telefono)) {
      Swal.fire({
        icon: "error",
        title: "Teléfono inválido",
        text: "El teléfono debe contener exactamente 10 dígitos.",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    const edadNum = Number(edad);
    if (isNaN(edadNum) || edadNum < 20 || edadNum > 100) {
      Swal.fire({
        icon: "error",
        title: "Edad inválida",
        text: "La edad debe ser un número entre 20 y 100 años.",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    const regexCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!regexCorreo.test(correo)) {
      Swal.fire({
        icon: "error",
        title: "Correo inválido",
        text: "Ingresa un correo electrónico válido.",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    const regexPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{12,}$/;

    if (!regexPass.test(pass)) {
      Swal.fire({
        icon: "error",
        title: "Contraseña insegura",
        html: `
          La contraseña debe incluir:<br><br>
          • Mínimo <b>12 caracteres</b><br>
          • Una <b>mayúscula</b><br>
          • Una <b>minúscula</b><br>
          • Un <b>número</b><br>
          • Un <b>carácter especial</b>
        `,
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    const nuevoUsuario = { nombre, telefono, sexo, edad, correo, pass };
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    Swal.fire({
      icon: "success",
      title: "Usuario registrado con éxito",
      text: `Usuario "${nombre}" registrado correctamente.`,
      timer: 4000,
      showConfirmButton: false,
    });

    formulario.reset(); 
  });

});
