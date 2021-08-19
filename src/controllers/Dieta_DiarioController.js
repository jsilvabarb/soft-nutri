const Paciente = require('../models/Paciente');
const DiarioPaciente = require('../models/DiarioPaciente');
const Alimento = require('../models/Alimento');

module.exports = {
    
    async index(req, res) {
        const { id_alimento } = req.params;

        const [ alimento, metadata ] = await Alimento.sequelize.query('SELECT false as "isMarked", descricao, fibras, proteinas, ferro, carboidratos, lipideos, calorias from alimentos WHERE id = :sqlIdalim',
            {
                replacements: {
                    sqlIdalim: id_alimento,
                }
            }
        );

        return res.json(alimento);
    },
    async store(req, res){
        const { id_paciente } = req.params;
        const { 
           id_alimento,
           qtd,
           medida,
         } = req.body;

        const alimento = await DiarioPaciente.create({ 
            id_alimentp,
            qtd,
            medida,
            id_paciente 
         });

        return res.json(alimento);
    }
};