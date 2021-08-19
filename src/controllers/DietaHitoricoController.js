const Alimento = require('../models/Alimento')
const Dieta = require('../models/Dieta')
const Paciente = require('../models/Paciente');
const DietaHistorico = require('../models/DietaHistorico');

module.exports = {
    async index(req, res) {
        const { id_paciente  } = req.params;

        const dietas = await Paciente.findByPk( id_paciente, {
            include: { association: 'dietaHistorico'},
            
        });

        return res.json(dietas);
    },
    async indexTest(req, res) {
        const { id_paciente, id_nutricionista } = req.params;

        const [dietas, metadata] = await DietaHistorico.sequelize.query('SELECT  dieta.id, dieta.id_nutricionista, dieta.descricao, dieta.max_calorias,  dieta_historicos.id_dieta, dieta_historicos.status from dieta_historicos join dieta on dieta.id = dieta_historicos.id_dieta WHERE dieta_historicos.id_nutricionista = :sqlIdnutri and dieta_historicos.id_paciente = :sqlIdpac ORDER BY dieta_historicos.id DESC',
            {
                replacements:{
                    sqlIdnutri: id_nutricionista,
                    sqlIdpac: id_paciente,
                }
            }
        )
        
        return res.json(dietas)
    },
    async indexDiario(req, res) {

        //
        // Retorna a dieta ativa.
        // 
        const { id_paciente, id_nutricionista } = req.params;

        const [dietas, metadata] = await DietaHistorico.sequelize.query('SELECT  false as "isMarked", dieta_items.id_dieta, dieta_items.refeicao, dieta_items.id_alimento, dieta_items.qtd, dieta_items.medida, dieta_historicos.id_dieta, dieta_historicos.status, alimentos.descricao, alimentos.fibras, alimentos.proteinas, alimentos.ferro, alimentos.carboidratos, alimentos.lipideos, alimentos.calorias from dieta_historicos join dieta_items on dieta_items.id_dieta = dieta_historicos.id_dieta INNER join alimentos on alimentos.id = dieta_items.id_alimento WHERE dieta_historicos.id_paciente = :sqlIdpac and dieta_historicos.status = "Ativa"',
            {
                replacements:{
                    sqlIdpac: id_paciente,
                }
            }
        )
        
        return res.json(dietas)
    },
    async indexHitorico(req, res) {
        const { id_paciente } = req.params;

        const [dietas, metadata] = await DietaHistorico.sequelize.query('SELECT  dieta.id, dieta.id_nutricionista, dieta.descricao, dieta.max_calorias,  dieta_historicos.id_dieta, dieta_historicos.status from dieta_historicos join dieta on dieta.id = dieta_historicos.id_dieta WHERE dieta_historicos.id_paciente = :sqlIdpac ORDER BY dieta_historicos.id DESC',
            {
                replacements:{
                   sqlIdpac: id_paciente,
                }
            }
        )
        
        return res.json(dietas)
    },
    async store(req, res){

        const { id_paciente, id_nutricionista } = req.params;

        const  { 
            id_dieta,           
            status,
            data
         } = req.body;   

        const dieta = await DietaHistorico.create({ 
            id_dieta,
            status,
            data,
            id_paciente,
            id_nutricionista
         });

        return res.json(dieta);
    },

    async update(req, res) {
        const { id_paciente, id_nutricionista } = req.params;

        const [updateStaus, metadata] = await DietaHistorico.sequelize.query('UPDATE dieta_historicos set status = "desativada" WHERE id_nutricionista= :sqlIdnutri and id_paciente = :sqlIdpac',
            {
                replacements: {
                    sqlIdnutri: id_nutricionista,
                    sqlIdpac: id_paciente,
                }
            }
        );

        return res.json(updateStaus);        
    }
};