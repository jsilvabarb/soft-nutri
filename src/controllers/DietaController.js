const Nutricionista = require('../models/Nutricionista')
const Dieta = require('../models/Dieta');
const { index } = require('./NutricionistaController');
const { include } = require('underscore');
const { associate } = require('../models/Nutricionista');
const { Model } = require('sequelize');

module.exports = {
    async index(req, res) {
        const { id_nutricionista } = req.params;

        const [nutri, metadata] = await Nutricionista.sequelize.query('SELECT dieta.id, dieta.id_nutricionista, dieta.descricao, dieta.max_calorias,  nutricionista.nome, nutricionista.sobrenome from nutricionista join dieta on dieta.id_nutricionista= :sqlIdnutri WHERE nutricionista.id = :sqlIdnutri ORDER BY dieta.id DESC',
            {
                replacements: {
                    sqlIdnutri: id_nutricionista
                }
            }
        )

        return res.json(nutri);
    },
    async store(req, res){
        const { id_nutricionista } = req.params;
        const { 
            descricao,
            max_calorias,
         } = req.body;

        const dieta = await Dieta.create({ 
            descricao,
            max_calorias,
            id_nutricionista
         });

        return res.json(dieta);
    }
};