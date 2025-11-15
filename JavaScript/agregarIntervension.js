urlBase = "http://98.95.239.253:8548";

async function getMedicamentos() {
    const response = await fetch(urlBase + "/medicamentos", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo obtener el catálogo de medicamentos.`);
    }

    return response.json();
}

document.addEventListener("DOMContentLoaded", async () => {
    const selectMedicamento = document.getElementById("medicamento");
    const form = document.getElementById("formIntervencion");

    if (selectMedicamento) {
        try {
            const medicamentos = await getMedicamentos();
    
            selectMedicamento.innerHTML = '<option value="">Seleccione un medicamento</option>';

            medicamentos.forEach((med) => {
                const option = document.createElement("option");
                option.value = med.idMedicamento;
                option.textContent = med.nombre; 
                option.title = med.descripcion ? med.descripcion : med.nombre; 
                selectMedicamento.appendChild(option);
            });
        } catch (error) {
            console.error("❌ Error al cargar el catálogo de medicamentos:", error);
            alert("❌ Ocurrió un error al cargar la lista de medicamentos. (Verificar CORS)");
        }
    } else {
        console.warn("Elemento <select> con ID 'medicamento' no encontrado.");
    }

    if (!form) {
        console.warn("Formulario con ID 'formIntervencion' no encontrado.");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        let valido = true;

        const camposAEnviar = form.querySelectorAll("input:not(#descripcion), select:not(#descripcion)");

        camposAEnviar.forEach((campo) => {
            if (campo.value.trim() === "" || campo.value === "") {
                campo.classList.add("error");
                valido = false;
            } else {
                campo.classList.remove("error");
            }
        });

        if (!valido) {
            alert("Por favor, llena todos los campos obligatorios.");
            return;
        }

        const data = {
            idAreteGanado: Number(document.getElementById("idAnimal").value),
            padecimiento: document.getElementById("padecimiento").value.trim(),
            idMedicamento: Number(document.getElementById("medicamento").value),
            dosis: Number(document.getElementById("dosis").value),
            fechaInicio: document.getElementById("fechaInicio").value,
            fechaRecordatorio: document.getElementById("fechaRecordatorio").value
        };

        console.log("Enviando datos de intervención:", data);

        try {
            const response = await fetch(`${urlBase}/receta`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Error en el servidor (${response.status}). Mensaje: ${errorBody.substring(0, 100)}...`);
            }

            alert("✅ Intervención agregada correctamente");
            window.location.href = "registroCuidadoEmpleado.html"; // Redirigir al listado

        } catch (error) {
            console.error("❌ Error al realizar la solicitud POST:", error);
            alert("❌ Ocurrió un error al agregar la intervención. (Verificar CORS y conexión)");
        }
    });
});