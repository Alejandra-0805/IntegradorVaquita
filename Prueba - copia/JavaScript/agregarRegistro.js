// Capturar el formulario
const form = document.getElementById('formRegistroGanado');
const btnCancelar = document.getElementById('btnCancelar');

// Al enviar el formulario
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const arete = document.getElementById('noArete').value;
  const raza = document.getElementById('raza').value;
  const fecha = document.getElementById('fechaRegistro').value;
  const peso = document.getElementById('peso').value;
  const sexo = document.getElementById('sexo').value;

  if (!nombre || !arete || !raza || !fecha || !peso || !sexo) {
    alert('Por favor, complete todos los campos antes de continuar.');
    return;
  }

  alert(`✅ Registro agregado correctamente:
  Nombre: ${nombre}
  No. Arete: ${arete}
  Raza: ${raza}
  Fecha: ${fecha}
  Peso: ${peso} kg
  Sexo: ${sexo}`);

  // Redirigir o limpiar formulario
  form.reset();
});

// Botón cancelar
btnCancelar.addEventListener('click', () => {
  const confirmar = confirm("¿Desea cancelar el registro?");
  if (confirmar) {
    window.location.href = "visualizarRegistroGanado.html"; // Ajusta la ruta si es necesario
  }
});
