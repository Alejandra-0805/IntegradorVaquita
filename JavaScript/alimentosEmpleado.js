urlBase = "http://98.95.239.253:8548";

async function getAlimentos() {
  try {
    const response = await fetch(urlBase + "/alimentos", {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    if (!response.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al obtener alimentos:", error);
    return null;
  }
}

function pintarAlimentos(alimentos) {
  const tbody = document.getElementById('table-body');
  const mensaje = document.getElementById('mensaje');
  tbody.innerHTML = '';
  mensaje.textContent = '';

  if (!alimentos) {
    mensaje.textContent = "❌ Error al obtener los alimentos.";
    return;
  }

  if (alimentos.length === 0) {
    mensaje.textContent = "⚠ No hay alimentos registrados.";
    return;
  }

  alimentos.forEach(alimento => {
    const tr = document.createElement('tr');

    const tdNombre = document.createElement('td');
    tdNombre.textContent = alimento.nombre;

    const tdTipo = document.createElement('td');
    tdTipo.textContent = alimento.tipo;

    const tdCantidad = document.createElement('td');
    tdCantidad.textContent = `${alimento.cantidad} kg.`;

    const tdFecha = document.createElement('td');
    const [anio, mes, dia] = alimento.fechaCompra;
    tdFecha.textContent = `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/${anio}`;


    tr.appendChild(tdNombre);
    tr.appendChild(tdTipo);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdFecha);

    tbody.appendChild(tr);
  });
}

document.querySelector('.btn-atras').addEventListener('click', () => {
  window.location.href = "homeEmpleado.html";
});

document.addEventListener("DOMContentLoaded", async () => {
  const alimentos = await getAlimentos();
  pintarAlimentos(alimentos);
});