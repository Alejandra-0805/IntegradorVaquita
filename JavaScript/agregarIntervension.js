urlBase = "http://98.95.239.253:8548";

async function getMedicamentos() {
    const response = await fetch(urlBase + "/medicamentos", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    });

    if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudo obtener el catálogo de medicamentos.`);
    }

    return response.json();
}

document.addEventListener("DOMContentLoaded", async () => {

    const selectMedicamento = document.getElementById("medicamento");
    const form = document.getElementById("formIntervencion");

    const padecimientoInput = document.getElementById("padecimiento");
    const dosisInput = document.getElementById("dosis");

    try {
        const medicamentos = await getMedicamentos();

        selectMedicamento.innerHTML = '<option value="">Seleccione un medicamento</option>';

        medicamentos.forEach((med) => {
            const option = document.createElement("option");
            option.value = med.idMedicamento;
            option.textContent = med.nombre;
            option.title = med.descripcion || med.nombre;
            selectMedicamento.appendChild(option);
        });
    } catch (error) {
        console.error("❌ Error al cargar medicamentos:", error);
        Swal.fire({
            icon: "error",
            title: "Error...",
            text: "Error al cargar los medicamentos.",
            timer: 4000,
            showConfirmButton: false,
        });
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const idAnimal = document.getElementById("idAnimal").value.trim();
        const padecimiento = padecimientoInput.value.trim();
        const idMedicamentoSel = document.getElementById("medicamento").value;
        const dosis = dosisInput.value.trim();
        const fechaInicio = document.getElementById("fechaInicio").value;
        const fechaRecordatorio = document.getElementById("fechaRecordatorio").value;

        if (idAnimal === "" || isNaN(idAnimal) || Number(idAnimal) <= 0) {
            Swal.fire({
                icon: "warning",
                title: "ID inválido",
                text: "El ID del animal debe ser un número positivo.",
                timer: 4000,
                showConfirmButton: false,
            });
            return;
        }

        if (padecimiento === "" || /\d/.test(padecimiento)) {
            Swal.fire({
                icon: "warning",
                title: "Padecimiento inválido",
                text: "El padecimiento no puede contener números.",
                timer: 4000,
                showConfirmButton: false,
            });
            return;
        }

        if (idMedicamentoSel === "") {
            Swal.fire({
                icon: "warning",
                title: "Seleccione un medicamento",
                timer: 4000,
                showConfirmButton: false,
            });
            return;
        }
        if (dosis === "" || isNaN(dosis) || Number(dosis) <= 0) {
            Swal.fire({
                icon: "warning",
                title: "Dosis inválida",
                text: "La dosis debe ser un número mayor que 0.",
                timer: 4000,
                showConfirmButton: false,
            });
            return;
        }

        if (!fechaInicio || !fechaRecordatorio) {
            Swal.fire({
                icon: "warning",
                title: "Fechas incompletas",
                text: "Debe ingresar ambas fechas.",
                timer: 4000,
                showConfirmButton: false,
            });
            return;
        }

        if (new Date(fechaRecordatorio) <= new Date(fechaInicio)) {
            Swal.fire({
                icon: "warning",
                title: "Fechas incorrectas",
                text: "La fecha de recordatorio debe ser mayor que la fecha de inicio.",
                timer: 4000,
                showConfirmButton: false,
            });
            return;
        }

        const data = {
            idAreteGanado: Number(idAnimal),
            padecimiento: padecimiento,
            idMedicamento: Number(idMedicamentoSel),
            dosis: Number(dosis),
            fechaInicio: fechaInicio,
            fechaRecordatorio: fechaRecordatorio
        };

        console.log("Enviando datos:", data);

        try {
            const response = await fetch(`${urlBase}/receta`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Error del servidor (${response.status}): ${errorBody}`);
            }

            Swal.fire({
                icon: "success",
                title: "Intervención agregada correctamente",
                timer: 4000,
                showConfirmButton: false,
            });

            window.location.href = "registroCuidadoEmpleado.html";

        } catch (error) {
            console.error("❌ Error en POST:", error);
            Swal.fire({
                icon: "error",
                title: "Error...",
                text: "Ocurrió un error al agregar la intervención.",
                timer: 4000,
                showConfirmButton: false,
            });
        }
    });
});
