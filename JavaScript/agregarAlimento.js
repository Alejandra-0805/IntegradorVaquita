urlBase = "http://98.95.239.253:8548";

document.querySelector('.formulario').addEventListener('submit', async function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const tipo = document.getElementById('tipo').value;
  const cantidad = parseFloat(document.getElementById('cantidad').value);
  const fecha = document.getElementById('fecha').value; 
  const precio = parseFloat(document.getElementById('precio').value);

  const regexSoloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
  if (!regexSoloLetras.test(nombre)) {
    Swal.fire({
      icon: "warning",
      title: "Nombre inválido",
      text: "El nombre no puede contener números ni caracteres especiales.",
      timer: 4000,
      showConfirmButton: false,
    });
    return;
  }

  if (!nombre || !tipo || !cantidad || !fecha || !precio) {
    Swal.fire({
      icon: "warning",
      title: "Campos vacíos",
      text: "Por favor completa todos los campos.",
      timer: 4000,
      showConfirmButton: false,
    });
    return;
  }

  const camposNumericos = [
    { valor: cantidad, nombre: "Cantidad" },
    { valor: precio, nombre: "Precio" }
  ];

  for (const campo of camposNumericos) {
    if (isNaN(campo.valor) || campo.valor < 0) {
      Swal.fire({
        icon: "warning",
        title: "Dato inválido",
        text: `${campo.nombre} no puede ser negativo.`,
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }
  }

  const [year, month, day] = fecha.split('-').map(Number);

  const alimento = {
    nombre,
    tipo,
    cantidad,
    fechaCompra: [year, month, day],
    precio
  };

  try {
    const response = await fetch(urlBase + "/alimentos", {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(alimento)
    });

    if (!response.ok) {
      throw new Error('Error al agregar el alimento');
    }

    const data = await response.json();
    console.log('Alimento agregado:', data);

    Swal.fire({
      icon: "success",
      title: "Alimento agregado correctamente...",
      timer: 4000,
      showConfirmButton: false,
    });

    window.location.href = "alimentos.html";

  } catch (error) {
    console.error('Error en el POST:', error);
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Hubo un problema al agregar el alimento.",
      timer: 4000,
      showConfirmButton: false,
    });
  }
});
