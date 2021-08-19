const Paciente = require('../models/Paciente');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const { defaultMaxListeners } = require('nodemailer/lib/mailer');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn:86400,
    });
}
module.exports = {

    async index(req, res) {
       

        const pacientes = await Paciente.findAll();

        res.json(pacientes);
    },   
    async store(req, res){

        const values = [];

        const { 
            nome,
            sobrenome,
            email,
            telefone,
            sexo,
            data_nascimento,
            peso,
            altura,
           
        } = req.body;

        var senha_hash = await bcrypt.hash(req.body.senha, 8);

        const senha = senha_hash;
      

        values.push( 
        nome,
        sobrenome,
        email,
        telefone,
        sexo,
        data_nascimento,
        peso,
        altura,
        senha
        );

       try {

        //não permitir cadastro com campos em branco 
        for(var cont = 0; cont < values.length; cont++){
            if(values[cont] == "") {
                return res.json({ Aviso: 'Preencha todos os campos' });
            }
        }

        //Consulta bruta na tabela para checar se existe o email 
        const [busca, metadata] = await Paciente.sequelize.query('SELECT  email from pacientes WHERE email = :sqlemail',
            {
                replacements: { sqlemail: email }
            }
        ); 

        if(busca.length == 0){
            console.log("Autorizado");
            const paciente = await Paciente.create({ 
                nome,
                sobrenome,
                email,
                telefone,
                sexo,
                data_nascimento,
                peso,
                altura,
                senha
             });

             console.log("Usuário cadastrado com sucesso!");
    
            return res.json(paciente);
        }
       } catch (err) {
        console.log("ACESSO NEGADO!");
        console.log(err);
        return res.json({ erro: 'O email já possui cadastro' });
       }
    },
    async detail(req, res) {
        const { id_paciente } = req.params;

        const paciente = await Paciente.findByPk(id_paciente);

        res.json(paciente);
    },
    async login(req, res) {

        const values = [];
       
       const { email, senha } = req.body;

        values.push(
            email,
            senha
        );

        for(var cont = 0; cont < values.length; cont++){
            if(values[cont] == "") {
                return res.json({ Aviso: 'Preencha todos os campos' });
            }
        }
        
        const [busca, metadata] = await Paciente.sequelize.query('SELECT id, nome, sobrenome, email, senha from pacientes WHERE email = :sqlemail',
            {
             replacements: 
                { 
                    sqlemail: email,                                
                }
            }
        );        
    

        if (busca.length > 0 && await bcrypt.compare(senha, busca[0].senha)) {

            console.log("Autorizado");         
            
            const cap_id = busca[0].id;
            const cap_nome = busca[0].nome;
            const cap_sobrenome = busca[0].sobrenome;
            busca[0].senha = undefined;

            var jwtoken = generateToken({id: cap_id})
           
            return res.json({token: jwtoken, id: cap_id});        
        } else {
            console.log("ACESSO NEGADO!");
            return res.status(400).send({ erro: 'Usuário ou senha incorretos.' });
        }        
    }
};