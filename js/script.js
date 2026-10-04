// navbar estatica al bajar y botón de subir
var navbar = document.querySelector(".navbar");
var botonSubir = document.createElement("button");
botonSubir.className = "subir";
botonSubir.innerHTML = '<i class="bi bi-arrow-up"></i>';
document.body.appendChild(botonSubir);

botonSubir.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", function () {
  navbar.classList.toggle("compacto", window.scrollY > 40);
  botonSubir.classList.toggle("visible", window.scrollY > 500);
});

// cerrar menu en celular al elegir una opcion
var enlacesMenu = document.querySelectorAll(
  ".navbar-nav a:not(.dropdown-toggle)",
);
enlacesMenu.forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    var menu = document.getElementById("navMenu");
    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Contadores para el inicio
var contadores = document.querySelectorAll("[data-count]");

function contar(elemento) {
  var final = parseInt(elemento.dataset.count);
  var inicio = null;
  function paso(tiempo) {
    if (!inicio) inicio = tiempo;
    var avance = Math.min((tiempo - inicio) / 1200, 1);
    elemento.textContent = Math.round(final * avance);
    if (avance < 1) requestAnimationFrame(paso);
  }
  requestAnimationFrame(paso);
}

var observador = new IntersectionObserver(
  function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        contar(entrada.target);
        observador.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.6 },
);

contadores.forEach(function (c) {
  observador.observe(c);
});

// buscador de asignaturas
var buscador = document.getElementById("buscar");
var conteo = document.getElementById("conteo");
var materias = document.querySelectorAll("#etiquetas span");

function filtrar() {
  var texto = buscador.value.toLowerCase();
  var total = 0;
  materias.forEach(function (materia) {
    var coincide = materia.textContent.toLowerCase().includes(texto);
    materia.classList.toggle("oculto", !coincide);
    if (coincide) total++;
  });
  conteo.textContent = texto
    ? total + " resultado(s)"
    : materias.length + " asignaturas";
}

buscador.addEventListener("input", filtrar);
filtrar();