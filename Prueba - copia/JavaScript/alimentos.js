const btnAgregar = document.querySelector(".btn-agregar");
  btnAgregar.addEventListener("click", () => {
    window.location.href = "agregarAlimento.html";
  });
const btnAtras = document.querySelector(".btn-atras");
  btnAtras.addEventListener("click", () => {
    window.location.href = "home.html";
  });
document.querySelector('.activo2').addEventListener('click', function() {
  window.location.href ="reporteAlimentos.html";
});
