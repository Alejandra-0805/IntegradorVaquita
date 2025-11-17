urlBase = "http://98.95.239.253:8548";

document.querySelector('.formulario').addEventListener('submit', async function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const tipo = document.getElementById('tipo').value;
  const cantidad = parseFloat(document.getElementById('cantidad').value);
  const fecha = document.getElementById('fecha').value; // formato esperado: "YYYY-MM-DD"
  const precio = parseFloat(document.getElementById('precio').value);

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

    // Esperar a q corrijan el json para q jale bien
    if (!response.ok) {
      throw new Error('Error al agregar el alimento');
    }

    const data = await response.json();
    console.log('Alimento agregado:', data); 

    alert("Alimento agregado correctamente.");
    window.location.href = "alimentos.html";

  } catch (error) {
    console.error('Error en el POST:', error);
    alert("Hubo un problema al agregar el alimento.");
  }
});