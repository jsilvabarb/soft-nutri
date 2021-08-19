const Alimento = require('../models/Alimento')
const Dieta = require('../models/Dieta');
const DietaItem = require('../models/DietaItem');

module.exports = {
    async index(req, res) {
        const { id_dieta } = req.params;

        // const dieta = await Dieta.findByPk(id_dieta, {
        //     include: { association: 'dietaItem'},
            
        // });

        const [dietaItem, metadata] = await DietaItem.sequelize.query('SELECT dieta_items.id_alimento, dieta_items.refeicao, dieta_items.qtd, dieta_items.medida, alimentos.descricao, alimentos.tipo, alimentos.proteinas, alimentos.fibras, alimentos.ferro, alimentos.carboidratos, alimentos.lipideos, alimentos.calorias, alimentos.umidade, alimentos.saturados, alimentos.mono_insaturados, alimentos.poli_insaturados, alimentos.sodio, alimentos.vitamina_c from dieta_items join alimentos on dieta_items.id_alimento = alimentos.id WHERE dieta_items.id_dieta = :sqlIdDieta',
        {
            replacements: 
            {
                sqlIdDieta: id_dieta,
            }
        }
    );   

        return res.json(metadata);
    },
    async store(req, res){
        const  {  id_dieta } = req.params;
        const {            
            refeicao,
            id_alimento,
            qtd,
            medida,
         } = req.body;

        const dieta = await DietaItem.create({ 
           
            refeicao,
            qtd,
            medida,
            id_dieta,
            id_alimento
         });

        return res.json(dieta);
    }
};