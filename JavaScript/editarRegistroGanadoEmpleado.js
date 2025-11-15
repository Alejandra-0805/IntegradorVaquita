const urlBase = "http://98.95.239.253:8548";

// 🔍 Función para obtener un registro por ID
async function getGanadoById(id) {
    try {
        const resp = await fetch(`${urlBase}/ganado/${id}`);
        if (!resp.ok) {
            console.error(`Error ${resp.status} al obtener datos del ID: ${id}`);
            return null;
        }
        return resp.json();
    } catch (e) {
        console.error("Error de red al obtener el ganado (¿CORS?):", e);
        return null;
    }
}

// 🗓️ Convierte fecha de array [2025,11,15] → "2025-11-15"
function formatearFecha(f) {
    if (!Array.isArray(f) || f.length < 3) return f || "";
    const [y, m, d] = f;
    return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

document.addEventListener("DOMContentLoaded", async () => {

    // 1️⃣ Obtener ID que viene por la URL
    const params = new URLSearchParams(window.location.search);
    const idGanado = params.get("id");

    if (!idGanado) {
        alert("⚠ No se recibió un ID para editar.");
        return;
    }

    console.log("ID recibido en la URL:", idGanado);

    // 2️⃣ Obtener los datos
    const datos = await getGanadoById(idGanado);

    if (!datos) {
        alert("❌ El registro no existe en la API o hubo un error de conexión.");
        return;
    }

    console.log("Datos recibidos:", datos);

    // 3️⃣ Rellenar los campos (¡CORRIGIENDO LOS IDs!)
    document.getElementById("nombre").value = datos.nombre || "";
    document.getElementById("arete").value = datos.idArete || ""; // ⬅️ CORREGIDO: Usar 'arete' del HTML
    document.getElementById("raza").value = datos.raza?.nombreRaza || "";
    document.getElementById("fechaRegistro").value = formatearFecha(datos.fechaNacimiento);
    document.getElementById("peso").value = datos.peso || "";
    document.getElementById("sexo").value = datos.sexo || "";
    document.getElementById("fechaMuerte").value = formatearFecha(datos.fechaBaja); // ⬅️ CORREGIDO: Usar 'fechaMuerte' del HTML

    // 4️⃣ Evento botón editar (solo PATCH)
    document.getElementById("btnEditar").addEventListener("click", async () => {

        // Obtener el valor del campo de baja (fechaMuerte)
        const fechaMuerte = document.getElementById("fechaMuerte").value;

        // Si el usuario ingresó una fecha, se envía esa fecha, si no, se envía null
        const patchData = {
            fechaBaja: fechaMuerte || null
        };
        
        // Validación extra si se marca una fecha de muerte
        if (fechaMuerte && !confirm(`¿Estás seguro de registrar la fecha de baja/muerte ${fechaMuerte}?`)) {
            return;
        }

        console.log("PATCH enviado:", patchData);

        try {
            const response = await fetch(`${urlBase}/ganado/${idGanado}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(patchData)
            });

            console.log("Status PATCH:", response.status);

            if (!response.ok) {
                // Intenta leer el mensaje de error de la API para dar más detalles
                const errorText = await response.text(); 
                alert(`❌ Error al actualizar. La API devolvió ${response.status}: ${errorText.substring(0, 100)}...`);
                return;
            }

            alert("✔ Registro actualizado correctamente (Fecha de Baja/Muerte).");
            window.location.href = "visualizarRegistroGanadoEmpleado.html";
        } catch (e) {
            alert("❌ Error de red al intentar actualizar. Revisa la consola.");
            console.error("Error en PATCH:", e);
        }
    });
});

