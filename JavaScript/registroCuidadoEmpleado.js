function irRecordatorios() {
    window.location.href = "recordatorios.html"; 
  }
document.addEventListener("DOMContentLoaded", () => {


  document.querySelector('.btn-atras').addEventListener('click', () => {
    window.location.href = "homeEmpleado.html";
  });

  document.querySelector('.btn-agregar').addEventListener('click', () => {
    window.location.href = "agregarIntervension.html";
  });
});
