const Alimento = require('../models/Alimento')

module.exports = {

    async index(req, res) {
        const { id_alimento } = req.params;

        const [ alimento, metadata ] = await Alimento.sequelize.query('SELECT  descricao, fibras, proteinas, ferro, carboidratos, lipideos, calorias from alimentos WHERE id = :sqlIdalim',
            {
                replacements: {
                    sqlIdalim: id_alimento,
                }
            }
        );

        return res.json(alimento);
    },
    async show(req, res) {
        
        const [alimentos, metadata] = await Alimento.sequelize.query(" SELECT id, descricao, tipo from alimentos")
        
        return res.json(alimentos);
    },
    // async store(req, res){
    //     const { 
    //         descricao,
    //         tipo,
    //         umidade,
    //         calorias,
    //         energia_kj,
    //         proteinas,
    //         lipideos,
    //         colesterol,
    //         carboidratos,
    //         fibras,
    //         cinzas,
    //         calcio,
    //         magnezio,
    //         manganes,
    //         fosforo,
    //         ferro,
    //         sodio,
    //         potassio,
    //         cobre,
    //         zinco,
    //         retinol,
    //         re,
    //         rae,
    //         tiamina,
    //         riboflavina,
    //         piridoxina,
    //         niacinaT,
    //         vitamina_c,
    //         saturados,
    //         mono_insaturados,
    //         poli_insaturados,
    //      } = req.body;

    //     const alimento = await Alimento.create({ 
    //         descricao,
    //         tipo,
    //         umidade,
    //         calorias,
    //         energia_kj,
    //         proteinas,
    //         lipideos,
    //         colesterol,
    //         carboidratos,
    //         fibras,
    //         cinzas,
    //         calcio,
    //         magnezio,
    //         manganes,
    //         fosforo,
    //         ferro,
    //         sodio,
    //         potassio,
    //         cobre,
    //         zinco,
    //         retinol,
    //         re,
    //         rae,
    //         tiamina,
    //         riboflavina,
    //         piridoxina,
    //         niacinaT,
    //         vitamina_c,
    //         saturados,
    //         mono_insaturados,
    //         poli_insaturados,
    //      });

    //     return res.json(alimento);
    // }
}