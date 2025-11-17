const urlBase = "http://98.95.239.253:8548"; 

function convertirFechaArray(fechaArray) {
    if (!Array.isArray(fechaArray) || fechaArray.length !== 3) return "—";

    const [y, m, d] = fechaArray;
    const mes = m.toString().padStart(2, "0");
    const dia = d.toString().padStart(2, "0");

    return `${y}-${mes}-${dia}`;
}

async function irAHomeEmpleado() {
    window.location.href = "homeEmpleado.html"; 
}

document.addEventListener("DOMContentLoaded", async () => {
    const tbody = document.querySelector("tbody"); 

    if (!tbody) {
        console.error("Error: No se encontró el elemento <tbody> en el DOM.");

    }

    try {
        const resp = await fetch(`${urlBase}/ventas`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });

        if (!resp.ok) {
            throw new Error(`❌ Error ${resp.status} al obtener ventas desde la API.`);
        }

        const ventas = await resp.json();
        console.log("VENTAS RECIBIDAS:", ventas);

        if (tbody) {
            tbody.innerHTML = "";

            ventas.forEach(v => {
                const fechaNac = convertirFechaArray(v.ganado.fechaNacimiento);
                const fechaBaja = convertirFechaArray(v.fechaBaja); 

                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${v.ganado.nombre || '—'}</td>
                    <td>${v.ganado.idArete || '—'}</td>
                    <td>${v.ganado.sexo || '—'}</td>
                    <td>${v.ganado.raza?.nombreRaza || '—'}</td>
                    <td>${fechaNac}</td>
                    <td>${v.ganado.peso || '—'} kg</td>
                    <td>${v.pesoFinal || '—'} kg</td>
                    <td>${fechaBaja}</td>
                `;
                tbody.appendChild(fila);
            });
        }

    } catch (error) {
        console.error("❌ Error:", error);
        alert("⚠ No se pudieron cargar las ventas registradas. (Revisa CORS)");
        if (tbody) {
             tbody.innerHTML = `<tr><td colspan="8">No se pudieron cargar las ventas: ${error.message}</td></tr>`;
        }
    }
});


document.querySelector('.btn-atras').addEventListener('click', async () => {

    await irAHomeEmpleado(); 
});