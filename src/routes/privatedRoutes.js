//Neste arquivo estão todas as rotas que precisam de autenticação para serem acessadas 

const express = require('express');

const NutricionistaController = require('../controllers/NutricionistaController');
const PacienteController = require('../controllers/PacienteController');
const AlimentoController = require('../controllers/AlimentoController');
const ConsultaController = require('../controllers/ConsultaController');
const MensagemController = require('../controllers/MensagemController');
const DietaController = require('../controllers/DietaController');
const DietaItemController = require('../controllers/DietaItemController');
const DietaHitoricoController = require('../controllers/DietaHitoricoController');
const Perfil_NutricionistaController = require('../controllers/Perfil_NutricionistaController');

const authMiddleware = require('../middlewares/auth');

const multer = require('multer');
const multerConfig = require('../config/multer');
const Perfil_PacienteController = require('../controllers/Perfil_PacienteController');
const Diario_PacienteController = require('../controllers/Diario_PacienteController');
const AgendaController = require('../controllers/AgendaController');
const Dieta_DiarioController = require('../controllers/Dieta_DiarioController');


const privRoutes = express.Router();

privRoutes.use(authMiddleware);

privRoutes.post('http://localhost:3000/login', NutricionistaController.login );

privRoutes.get('/allPacientes/', PacienteController.index)

privRoutes.get('/allNutris', NutricionistaController.index);
privRoutes.get('/nutri/:id_nutri', NutricionistaController.indexOne);

privRoutes.get('/perfilNutri/:id_nutricionista', Perfil_NutricionistaController.index);
privRoutes.post('/nutriPerfil/:id_nutricionista', multer(multerConfig).single('file') , Perfil_NutricionistaController.store);
privRoutes.delete('/image/:id_nutricionista',  Perfil_NutricionistaController.delete);

privRoutes.get('/pacPerfil/:id_paciente', Perfil_PacienteController.index);
privRoutes.post('/addFotoPac/:id_paciente', multer(multerConfig).single('file') , Perfil_PacienteController.store);
privRoutes.delete('/deletePacImage/:id_paciente',  Perfil_PacienteController.delete);


//privRoutes.get('/paciente/:id_paciente', PacienteController.index); 

privRoutes.get('/alimentos', AlimentoController.show); 
privRoutes.get('/nutrientes/:id_alimento', AlimentoController.index); 


privRoutes.get('/detalhespaciente/:id_paciente', PacienteController.detail);

privRoutes.get('/verDisp/:id_nutricionista', AgendaController.index);
privRoutes.post('/disponibilizarHora/:id_nutricionista', AgendaController.store);
privRoutes.put('/atualizaHorario/:id_nutricionista/:id_horario', AgendaController.update);

privRoutes.get('/nutris/consultas/:id_nutricionista/:date', ConsultaController.indexNutricionistaHome);
privRoutes.get('/allConsultas/:id_nutricionista', ConsultaController.indexNutricionistaAgenda);

privRoutes.get('/pacientesConsultas/:id_paciente/:date', ConsultaController.indexPacienteHome);
privRoutes.get('/consultas/pacientes/:id_nutricionista', ConsultaController.indexPacientes);
privRoutes.get('/pacientesAllConsultas/:id_paciente', ConsultaController.indexAllPacientes);
privRoutes.get('/nutrisAllConsultas/:id_nutricionista', ConsultaController.indexAllNutris);
privRoutes.post('/consulta/:id_nutricionista/:id_paciente', ConsultaController.storeNutricionista);
privRoutes.put('/cancelarConsulta/:id_paciente/:id_consulta', ConsultaController.updatePaciente);
privRoutes.put('/nutriCancelarConsulta/:id_nutricionista/:id_consulta', ConsultaController.updateNutri);


privRoutes.get('/allMessages/:id_paciente/:id_nutricionista', MensagemController.index);
privRoutes.post('/mensagem/:id_paciente/:id_nutricionista', MensagemController.store);

privRoutes.get('/dietas/:id_nutricionista', DietaController.index);
privRoutes.post('/dieta/:id_nutricionista', DietaController.store);

privRoutes.get('/dietas/itens/:id_dieta', DietaItemController.index);
privRoutes.post('/addItens/:id_dieta', DietaItemController.store);

privRoutes.get('/dietasPaciente/:id_paciente', DietaHitoricoController.index);
privRoutes.get('/testeretornodietas/:id_paciente/:id_nutricionista', DietaHitoricoController.indexTest);
privRoutes.get('/dietaDiario/:id_paciente', DietaHitoricoController.indexDiario);
privRoutes.get('/historicoDietas/:id_paciente', DietaHitoricoController.indexHitorico);
privRoutes.post('/addDieta/:id_paciente/:id_nutricionista', DietaHitoricoController.store);
privRoutes.put('/updateDietas/:id_paciente/:id_nutricionista', DietaHitoricoController.update);

privRoutes.get('/verAlimento/:id_alimento/', Dieta_DiarioController.index);
privRoutes.post('/adicionarAlimento/:id_nutricionista/', Dieta_DiarioController.store);

privRoutes.get('/diario/:id_paciente', Diario_PacienteController.index);
privRoutes.post('/graficoDiario/:id_paciente', Diario_PacienteController.store);



module.exports = privRoutes;
