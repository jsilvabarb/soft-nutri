const Agenda = require("../models/Agenda");

module.exports = {

    async index(req, res) {
        const { id_nutricionista } = req.params;

        const horarios = await Agenda.findAll({
            where : {
                id_nutricionista: id_nutricionista,
            }
        }); 

        return res.json(horarios);
    },
    async update(req, res) {
        const { id_nutricionista, id_horario } = req.params;

        const atualiza= await Agenda.sequelize.query('UPDATE agendas set status = "Marcada" WHERE id = :sqlIdhor and id_nutricionista = :sqlIdnutri', 
            { 
                replacements: {
                    sqlIdnutri: id_nutricionista,
                    sqlIdhor: id_horario,
                }
            }
        );

        return res.json(atualiza);
    },
    async store(req, res){
        try {
         const {  id_nutricionista } = req.params;
    
         const { 
             observacao,
             data,
             hora,
             status,
          } = req.body;
    
         const agenda = await Agenda.create({ 
             observacao,
             data,
             hora,
             status,
             id_nutricionista
          });
    
         return res.json(agenda);
    
        } catch (err) {
            console.log(err);
            return res.status(404).json({ Erro: 'Fail in created consulta' });
        }
     }
}