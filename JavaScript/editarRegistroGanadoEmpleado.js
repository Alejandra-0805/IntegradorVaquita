urlBase = "http://98.95.239.253:8548";

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
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: "Error al obtener los datos del ganado.",
            timer: 4000,
            showConfirmButton: false,
        });
        return null;
    }
}

function formatearFecha(f) {
    if (!Array.isArray(f) || f.length < 3) return f || "";
    const [y, m, d] = f;
    return `${y}-${String(m).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
}

document.addEventListener("DOMContentLoaded", async () => {

    const params = new URLSearchParams(window.location.search);
    const idGanado = params.get("id");

    if (!idGanado) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: "No se recibió un ID para editar.",
            timer: 4000,
            showConfirmButton: false,
        });
        return;
    }

    console.log("ID recibido en la URL:", idGanado);

    const datos = await getGanadoById(idGanado);

    if (!datos) {
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: "El registro no existe en la API o hubo un error de conexión.",
            timer: 4000,
            showConfirmButton: false,
        });
        return;
    }

    console.log("Datos recibidos:", datos);

    document.getElementById("nombre").value = datos.nombre || "";
    document.getElementById("arete").value = datos.idArete || ""; 
    document.getElementById("raza").value = datos.raza?.nombreRaza || "";
    document.getElementById("fechaRegistro").value = formatearFecha(datos.fechaNacimiento);
    document.getElementById("peso").value = datos.peso || "";
    document.getElementById("sexo").value = datos.sexo || "";
    document.getElementById("fechaMuerte").value = formatearFecha(datos.fechaBaja); 

    document.getElementById("btnEditar").addEventListener("click", async () => {

        const nombre = document.getElementById("nombre").value.trim();
        const regexSoloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        if (!regexSoloLetras.test(nombre)) {
            Swal.fire({
                icon: "warning",
                title: "Nombre inválido",
                text: "El nombre no puede contener números ni caracteres especiales.",
                timer: 4000,
                showConfirmButton: false
            });
            return;
        }

        const arete = document.getElementById("arete").value;
        const peso = document.getElementById("peso").value;

        const camposNumericos = [
            { valor: arete, nombre: "Número de arete" },
            { valor: peso, nombre: "Peso" }
        ];

        for (const campo of camposNumericos) {
            if (campo.valor !== "" && campo.valor < 0) {
                Swal.fire({
                    icon: "warning",
                    title: "Dato inválido",
                    text: `${campo.nombre} no puede ser negativo.`,
                    timer: 4000,
                    showConfirmButton: false
                });
                return;
            }
        }

        const fechaMuerte = document.getElementById("fechaMuerte").value;

        const patchData = {
            fechaBaja: fechaMuerte || null
        };

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
                const errorText = await response.text(); 
                console.error("Error respuesta API:", errorText);
                Swal.fire({
                    icon: "error",
                    title: "Error...",
                    text: "Error al actualizar el registro.",
                    timer: 4000,
                    showConfirmButton: false,
                });
                return;
            }

            console.log("Registro actualizado correctamente.");
            Swal.fire({
                icon: "success",
                title: "Registro actualizado correctamente...",
                timer: 4000,
                showConfirmButton: false,
            });
            window.location.href = "visualizarRegistroGanadoEmpleado.html";
        } catch (e) {
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Error de red al intentar actualizar.",
                timer: 4000,
                showConfirmButton: false,
            });
            console.error("Error en PATCH:", e);
        }
    });
});
