document.querySelector('.formulario').addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const tipo = document.getElementById('tipo').value;
  const cantidad = document.getElementById('cantidad').value;
  const fecha = document.getElementById('fecha').value;
  const precio = document.getElementById('precio').value;

  console.log(`Nombre: ${nombre}, Tipo: ${tipo}, Cantidad: ${cantidad}, Fecha: ${fecha}, Precio: $${precio}`);

  // Mostrar mensaje de confirmación
  alert("Alimento agregado correctamente.");

  // Redirigir a la vista de alimentos
  window.location.href = "alimentos.html";
});
