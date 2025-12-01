const urlBase = "http://98.95.239.253:8548";

document.querySelector('.btn-agregar').addEventListener('click', async () => {

  const idArete = document.getElementById("idArete").value.trim();
  const fechaBaja = document.getElementById("fecha-venta").value.trim();
  const pesoFinal = document.getElementById("peso-final").value.trim();
  const precioVenta = document.getElementById("precio").value.trim();

  if (!idArete || !fechaBaja || !pesoFinal || !precioVenta) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "Por favor complete todos los campos.",
      timer: 4000,
      showConfirmButton: false,
    });
    return;
  }

  let ganadoData;
  try {
    const resp = await fetch(`${urlBase}/ganado/arete/${idArete}`);
    if (!resp.ok) throw new Error("Ganado no encontrado");
    ganadoData = await resp.json();
  } catch (e) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "No se encontró el ganado con ese número de arete.",
      timer: 4000,
      showConfirmButton: false,
    });
    return;
  }

  const fechaNacArray = ganadoData.fechaNacimiento;
  const fechaNac = new Date(fechaNacArray[0], fechaNacArray[1] - 1, fechaNacArray[2]);
  const fechaVenta = new Date(fechaBaja);
  const hoy = new Date();

  if (fechaVenta > hoy) {
    Swal.fire({
      icon: "warning",
      title: "Fecha inválida",
      text: "La fecha de venta no puede ser futura.",
      timer: 4000,
      showConfirmButton: false,
    });
    return;
  }

  if (fechaVenta <= fechaNac) {
    Swal.fire({
      icon: "warning",
      title: "Fecha inválida",
      text: "La fecha de venta debe ser después de la fecha de nacimiento.",
      timer: 4000,
      showConfirmButton: false,
    });
    return;
  }

  const datosVenta = {
    ganado: {
      idArete: Number(idArete)
    },
    precioVenta: Number(precioVenta),
    pesoFinal: Number(pesoFinal),
    fechaBaja: fechaBaja
  };

  console.log("JSON ENVIADO A LA API:", datosVenta);

  try {
    const response = await fetch(`${urlBase}/ventas/${idArete}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosVenta)
    });

    console.log("Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error respuesta API:", errorText);
      Swal.fire({
        icon: "error",
        title: "Error...",
        text: "Error al registrar la venta.",
        timer: 4000,
        showConfirmButton: false,
      });
      throw new Error("Error en la API");
    }

    const resultado = await response.json();
    console.log("Venta registrada:", resultado);

    Swal.fire({
      icon: "success",
      title: "Venta registrada correctamente...",
      timer: 4000,
      showConfirmButton: false,
    });

    window.location.href = "visualizarRegistroVentaMuerte.html";

  } catch (error) {
    console.error("Error al conectar con la API:", error);
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: "No se pudo registrar la venta. Revisa datos o el servidor.",
      timer: 4000,
      showConfirmButton: false,
    });
  }

});
