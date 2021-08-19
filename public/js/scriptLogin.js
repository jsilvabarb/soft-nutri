
var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");

var btnRegistrarNutri = document.querySelector("#registro-nutricionista");
var btnRegistrarPac = document.querySelector("#registro-paciente");

var btnVoltar = document.querySelector("#back");
var btnVoltarInd = document.querySelector("#back-index");

var btnEntrarNutri = document.querySelector("#entrar-nutri");
var btnEntrarPac = document.querySelector("#entrar-pac");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 

});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
})

btnRegistrarNutri.addEventListener("click", function () {
   document.getElementById("modalRegistro-nutri").style.display= "block";
   cadastroNutricionista();
})

btnRegistrarPac.addEventListener("click", function () {
   document.getElementById("modalRegistro-paciente").style.display= "block";
   cadastroPaciente();
})

btnVoltar.addEventListener("click", function () {
   document.getElementById("modalRegistro-nutri").style.display= "none";
   document.getElementById("modalRegistro-paciente").style.display= "none";
})

btnVoltarInd.addEventListener("click", function () {
   document.getElementById("modalRegistro-paciente").style.display= "none";
})

btnEntrarNutri.addEventListener("click", function() {
   loginNutri();
})

btnEntrarPac.addEventListener("click", function() {
   loginPac();
})


