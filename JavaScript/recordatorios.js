 function irRegistroCuidadoEmpleado(){
  window.location.href = "registroCuidadoEmpleado.html"; 
    }
document.addEventListener("DOMContentLoaded", () => {
  const fechaActual = new Date();
  const formatoFecha = (fecha) => fecha.toLocaleDateString("es-ES");

  const sumarDias = (dias) => {
    const nuevaFecha = new Date(fechaActual);
    nuevaFecha.setDate(fechaActual.getDate() + dias);
    return formatoFecha(nuevaFecha);
  };
  
    document.querySelector('.btn-atras').addEventListener('click', () => {
     window.location.href = "homeEmpleado.html";
    });
  document.getElementById("fecha-banos").textContent = sumarDias(120);
  document.getElementById("fecha-tratamientos").textContent = sumarDias(90);
  document.getElementById("fecha-vacunas").textContent = sumarDias(180);
});
