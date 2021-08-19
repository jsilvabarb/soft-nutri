const Consulta = require('../models/Consulta');
const { index } = require('./NutricionistaController');
const { meta } = require('../modules/mailer');
const _ = require('underscore');

module.exports = {
    //retorna objeto com as consultas do dia  para paciente
    async indexPacienteHome(req, res) {
        
        const { id_paciente,date } = req.params;

        const [consulta, metadata] = await Consulta.sequelize.query('SELECT consulta.id_nutricionista, consulta.data, consulta.hora, consulta.status, nutricionista.nome, nutricionista.sobrenome from consulta join nutricionista on consulta.id_nutricionista = nutricionista.id where consulta.id_paciente = :sqlIdPac and consulta.data = :sqlDate',
            {
                replacements: 
                {
                    sqlIdPac: id_paciente,
                    sqlDate: date,
                }
            }
        );

        return res.json(metadata);
    },
    //retorna objeto com as consultas do dia  para nutricionista
    async indexNutricionistaHome(req, res) {
        const { id_nutricionista, date } = req.params;      

        const [consulta, metadata] = await Consulta.sequelize.query('SELECT consulta.id_paciente, consulta.data, consulta.hora, consulta.status, pacientes.nome, pacientes.sobrenome from consulta join pacientes on consulta.id_paciente = pacientes.id where consulta.id_nutricionista = :sqlIdnutri and consulta.data = :sqlDate',
            {
                replacements: 
                {
                    sqlIdnutri: id_nutricionista,
                    sqlDate: date,
                }
            }
        );
               
        // console.log(metadata); 
        return res.json(metadata);
    },
    async indexNutricionistaAgenda(req, res) {
        const { id_nutricionista } = req.params; 
        
       

        const [consulta, metadata] = await Consulta.sequelize.query('SELECT data, hora from consulta WHERE id_nutricionista = :sqlIdnutri  ORDER BY data and hora ASC' ,
            {
                replacements: 
                {
                    sqlIdnutri: id_nutricionista,
                   
                }
            }
        );
        return res.json(metadata);
    },
    //Retorna objeto com todas as consultas do paciente por ordem cronológica
    async indexAllPacientes(req, res) {
        const { id_paciente } = req.params;      

        const [consulta, metadata] = await Consulta.sequelize.query('SELECT consulta.id, consulta.id_paciente, consulta.data, consulta.hora, consulta.status, nutricionista.nome, nutricionista.sobrenome from consulta join nutricionista on consulta.id_nutricionista = nutricionista.id where consulta.id_paciente = :sqlIdPac ORDER BY data ASC' ,
            {
                replacements: 
                {
                    sqlIdPac:  id_paciente,
                   
                }
            }
        );
        return res.json(metadata);
    },
    async indexAllNutris(req, res) {
        const { id_nutricionista } = req.params;      

        const [consulta, metadata] = await Consulta.sequelize.query('SELECT consulta.id, consulta.id_nutricionista, consulta.data, consulta.hora, consulta.status, pacientes.nome, pacientes.sobrenome from consulta join pacientes on consulta.id_paciente = pacientes.id where consulta.id_nutricionista = :sqlIdnutri ORDER BY data ASC' ,
            {
                replacements: 
                {
                    sqlIdnutri:  id_nutricionista,
                   
                }
            }
        );
        return res.json(metadata);
    },

    async updatePaciente(req, res) {
        const { id_paciente, id_consulta } = req.params;      

        const [consulta, metadata] = await Consulta.sequelize.query('UPDATE consulta set status = "cancelada"  where id_paciente = :sqlIdPac and id = :sqlIdcon' ,
            {
                replacements: 
                {
                    sqlIdPac:  id_paciente,
                    sqlIdcon:  id_consulta,
                   
                }
            }
        );
        return res.json(metadata);
    },

    async updateNutri(req, res) {
        const { id_nutricionista, id_consulta } = req.params;      

        const [consulta, metadata] = await Consulta.sequelize.query('UPDATE consulta set status = "cancelada"  where id_nutricionista = :sqlIdnutri and id = :sqlIdcon' ,
            {
                replacements: 
                {
                    sqlIdnutri:  id_nutricionista,
                    sqlIdcon:  id_consulta,
                   
                }
            }
        );
        return res.json(metadata);
    },
    //retorna os pacientes do nutricionista
    //regra: o paciente só pertence ao nutri enquanto há consulta marcada
    async indexPacientes(req, res) {
        const { id_nutricionista} = req.params;        

        const [consulta, metadata] = await Consulta.sequelize.query('SELECT consulta.id_paciente, pacientes.nome, pacientes.sobrenome from consulta join pacientes on consulta.id_paciente = pacientes.id WHERE consulta.id_nutricionista = :sqlIdnutri',
            {
                replacements: 
                {
                    sqlIdnutri: id_nutricionista,
                }
            }
        );   

        var pacientes = [];
        
        //Retirando os valores duplicados para exibir somente os pacientes 
        //Relacionados com X nutri
        pacientes = _.uniq(metadata, function(item, key, nome) { return item.nome; })
        
        console.log(pacientes);

        console.log("--------------------------------");

        return res.json(pacientes);
    },
    async storeNutricionista(req, res){
       try {
        const {  id_nutricionista, id_paciente  } = req.params;

        const { 
            observacao,
            data,
            hora,
            status,
         } = req.body;

        const consulta = await Consulta.create({ 
            observacao,
            data,
            hora,
            status,
            id_nutricionista,
            id_paciente,
         });

        return res.json(consulta);

       } catch (err) {
           console.log(err);
           return res.status(404).json({ Erro: 'Fail in created consulta' });
       }
    }
};

//----------------------------------------------
//Dia 03/02/2021

//[ok] pegar o paciente da consulta
//[ok]pegar a data da consulta comparar com o dia atual
//[ok]exibir para o nutricionista na página principal


 // const nutri = await Nutricionista.findByPk(id_nutricionista, {
        //     include: 
        //     { 
        //         association: 'consulta',
        //         attributes: ['data', 'id_paciente'] , 

        //     }
        // });

        //const [consulta, metadata] = await Consulta.sequelize.query('SELECT id_paciente, data from consulta WHERE id_nutricionista = :sqlIdnutri',