document.addEventListener("DOMContentLoaded", () => {
  const btnAtras = document.querySelector(".btn-atras");
  const btnVisualizar = document.querySelector(".btn-registrar");
  const btnVentaMuerte = document.querySelector(".btn-ver");

  btnAtras.addEventListener("click", () => {
    window.location.href = "../Page/homeEmpleado.html";
  });

  btnVisualizar.addEventListener("click", () => {
    window.location.href = "../Page/visualizarRegistroGanadoEmpleado.html";
  });


  btnVentaMuerte.addEventListener("click", () => {
    window.location.href = "../Page/visualizarRegistroVentaMuerteEmpleado.html";
  });


});
