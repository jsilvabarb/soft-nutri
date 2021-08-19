const express = require('express');

const NutricionistaController = require('../controllers/NutricionistaController');
const PacienteController = require('../controllers/PacienteController');

const routes = express.Router();




routes.post('/cadastroNutricionistas', NutricionistaController.store); //Alterar post para cadastro nutricionista

routes.post('/loginNutricionista', NutricionistaController.login );

routes.post('/forgot_password', NutricionistaController.forgotPassword);

routes.get('/', (req, res) => {
    res.render('index.html')
}); 

routes.get('/home', (req, res) => {
    res.render('home.html')
});

routes.get('/dietas', (req, res) => {
    res.render('dietas.html')
});
routes.get('/pacientes', (req, res) => {
    res.render('pacientes.html')
});
routes.get('/detalhespaciente/:id_paciente', PacienteController.detail);


//Rotas relacionadas ao Paciente

routes.post('/cadastroPacientes', PacienteController.store);

routes.post('/loginPaciente', PacienteController.login);

routes.get('/homePaciente', (req, res) => {
    res.render('home_paciente.html')
});

routes.get('/nutricionistas', (req, res) => {
    res.render('nutricionistas.html')
});

routes.get('/detalhesnutricionista/:id_nutri', NutricionistaController.indexOne)

routes.get('/diario', (req, res) => {
    res.render('diarioPaciente.html')
});

routes.get('/consultasPaciente', (req, res) => {
    res.render('consultasPaciente.html')
});

module.exports = routes;