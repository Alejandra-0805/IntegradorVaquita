const urlBase = "http://98.95.239.253:8548";

document.querySelector('.btn-agregar').addEventListener('click', async () => {

  // CAMPOS DEL FORMULARIO
  const idArete = document.getElementById("idArete").value.trim();
  const fechaBaja = document.getElementById("fecha-venta").value.trim();
  const pesoFinal = document.getElementById("peso-final").value.trim();
  const precioVenta = document.getElementById("precio").value.trim();

  // VALIDACIÓN
  if (!idArete || !fechaBaja || !pesoFinal || !precioVenta) {
    alert("⚠️ Por favor complete todos los campos.");
    return;
  }

  // JSON EXACTO que espera la API
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
      throw new Error("❌ Error en la API al registrar la venta");
    }

    const resultado = await response.json();
    console.log("Venta registrada:", resultado);

    alert("✅ Venta registrada correctamente.");
    window.location.href = "visualizarRegistroVentaMuerte.html";

  } catch (error) {
    console.error("❌ Error al conectar con la API:", error);
    alert("❌ No se pudo registrar la venta. Revisa datos o el servidor.");
  }

});

