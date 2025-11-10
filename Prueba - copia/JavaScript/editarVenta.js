document.querySelector('.btn-agregar').addEventListener('click', () => {
  const campos = [
    'nombre',
    'id',
    'raza',
    'sexo',
    'fecha-registro',
    'fecha-venta',
    'peso-inicial',
    'peso-final',
    'precio'
  ];

  let validos = true;
  let mensaje = '';

  campos.forEach(id => {
    const campo = document.getElementById(id);
    if (!campo.value.trim()) {
      validos = false;
      campo.style.border = '2px solid red';
      mensaje = '⚠️ Por favor, completa todos los campos antes de continuar.';
    } else {
      campo.style.border = '1px solid #ccc';
    }
  });

  if (!validos) {
    alert(mensaje);
    return;
  }

  alert("✅ Venta registrada o actualizada exitosamente");
  window.location.href = "ventaRegistrada.html";
});
