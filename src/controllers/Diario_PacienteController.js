const Paciente = require('../models/Paciente');
const DiarioPaciente = require('../models/DiarioPaciente');

module.exports = {
    
    async index(req, res) {
        const { id_paciente } = req.params;

        const [ diario, metadata ] = await DiarioPaciente.sequelize.query('SELECT data, fibras, proteinas, ferro, carboidratos, lipideos, calorias, created_at from diario_pacientes WHERE id_paciente = :sqlIdpac ORDER BY created_at DESC',
            {
                replacements: {
                    sqlIdpac: id_paciente,
                }
            }
        );

        return res.json(diario);
    },
    async store(req, res){
        const { id_paciente } = req.params;
        const { 
           data,
           fibras,
           proteinas,
           ferro,
           carboidratos,
           lipideos,
           calorias
         } = req.body;

        const postdiario = await DiarioPaciente.create({ 
            data,
            fibras,
            proteinas,
            ferro,
            carboidratos,
            lipideos,
            calorias,
            id_paciente 
         });

        return res.json(postdiario);
    }
};