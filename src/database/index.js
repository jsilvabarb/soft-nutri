const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const Nutricionista = require('../models/Nutricionista');
const Paciente = require('../models/Paciente');
const Alimento = require('../models/Alimento');
const Consulta = require('../models/Consulta');
const Mensagem = require('../models/Mensagem');
const Dieta = require('../models/Dieta');
const DietaItem = require('../models/DietaItem');
const DietaHistorico = require('../models/DietaHistorico');
const PerfilNutricionista = require('../models/PerfilNutricionista');
const PerfilPaciente = require('../models/PerfilPaciente');
const DiarioPaciente = require('../models/DiarioPaciente');
const Agenda = require('../models/Agenda');
const DietaDiario = require('../models/DietaDiario');

const connection = new Sequelize(dbConfig);

Nutricionista.init(connection);
Paciente.init(connection);
Alimento.init(connection);
Consulta.init(connection);
Mensagem.init(connection);
Dieta.init(connection);
DietaItem.init(connection);
DietaHistorico.init(connection);
PerfilNutricionista.init(connection);
PerfilPaciente.init(connection);
DiarioPaciente.init(connection);
Agenda.init(connection);
DietaDiario.init(connection);

Paciente.associate(connection.models);
Nutricionista.associate(connection.models);
Consulta.associate(connection.models);
Mensagem.associate(connection.models);
Dieta.associate(connection.models);
DietaItem.associate(connection.models);
DietaHistorico.associate(connection.models);
PerfilNutricionista.associate(connection.models);
PerfilPaciente.associate(connection.models);
DiarioPaciente.associate(connection.models);
Agenda.associate(connection.models);
DietaDiario.associate(connection.models);
module.exports = connection;