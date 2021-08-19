const Nutricionista = require('../models/Nutricionista')
const Paciente = require('../models/Paciente');
const Mensagem = require('../models/Mensagem');
const { index } = require('./NutricionistaController');

module.exports = {
    
    async index(req, res) {
        const { id_paciente, id_nutricionista } = req.params;

        const [mensagens, metadata] = await Nutricionista.sequelize.query('SELECT remetente, destinatario, mensagem from mensagems WHERE id_nutricionista = :sqlIdnutri and id_paciente = :sqlIdpac',
            {
                replacements: {
                    sqlIdnutri: id_nutricionista,
                    sqlIdpac: id_paciente,
                }
            }
        )

        return res.json(mensagens);
    },
    async store(req, res){
        const { id_paciente, id_nutricionista } = req.params;
        const { 
            remetente,
            destinatario,
            mensagem,
         } = req.body;

        const msg = await Mensagem.create({ 
            remetente,
            destinatario,
            mensagem,
            id_paciente,
            id_nutricionista
         });

        return res.json(msg);
    }
};