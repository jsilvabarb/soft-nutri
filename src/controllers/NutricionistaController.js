const Nutricionista = require('../models/Nutricionista');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn:86400,
    });
}

function Dado(token, id) {
    this.token = token;
    this.id = id;
}

//https://azure.microsoft.com/pt-br/develop/nodejs/

function isEmail(email){
    var exclude=/[^@-.w]|^[_@.-]|[._-]{2}|[@.]{2}|(@)[^@]*1/;
    var check=/@[w-]+./;
    var checkend=/.[a-zA-Z]{2,3}$/;
    if(((email.search(exclude) != -1)||(email.search(check)) == -1)||(email.search(checkend) == -1)){return false;}
    else {return true;}
}

module.exports = {
    async index(req, res) {
       
        const [nutris, metadata] = await Nutricionista.sequelize.query('SELECT id, nome, sobrenome, universidade from nutricionista');

        return res.json(nutris);
    }, 
    async indexOne(req, res) {
        const { id_nutri } = req.params;

        const [ nutri, metadata ] = await Nutricionista.sequelize.query('SELECT nome, sobrenome, universidade  from nutricionista WHERE id = :sqlIdnutri',
            {
                replacements: 
                { 
                    sqlIdnutri:id_nutri,                                
                }
            }
        );

        return res.json(nutri);
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
            crn,
            universidade,
            data_formacao,           
        } = req.body;
         
        
        var senha_hash = await bcrypt.hash(req.body.senha, 10);
        const senha = senha_hash;        

        //TODO Validar Email

        // if(!isEmail(email)) {
        //     return res.status(404).send({ message: 'Email Invalid' });
        // }
       
        values.push(
            nome,
            sobrenome,
            email,
            telefone,
            sexo,
            data_nascimento,
            crn,
            universidade,
            data_formacao,
            senha,
            //confirmaSenha
        );       
        console.log(values.length);
        //console.log(senha, confirmaSenha);

       try {
            //não permitir cadastro com campos em branco 
            for(var cont = 0; cont < values.length; cont++){
                if(values[cont] == "") {
                    return res.json({ Aviso: 'Preencha todos os campos' });
                }
            }

            //Consulta bruta na tabela para checar se existe o email 
            const [busca, metadata] = await Nutricionista.sequelize.query('SELECT  email from nutricionista WHERE email = :sqlemail',
                {
                    replacements: { sqlemail: email }
                }
            );      

            if (busca.length == 0 ) {
                console.log("Autorizado");

                const nutri = await Nutricionista.create({ 
                    nome, 
                    sobrenome,
                    email,
                    telefone,
                    sexo,
                    data_nascimento,
                    crn,
                    universidade,
                    data_formacao,
                    senha
                });
               

                console.log("Usuário cadastrado com sucesso!");
                return res.json(nutri);           
            
            } else {
                console.log("ACESSO NEGADO!");
                return res.json({ erro: 'O email já possui cadastro' });
            }       
       } catch (err) {
           console.log(err);
           return res.status(400).send({ error: 'Resgistration failed'});
       }
    },
   async login(req, res) {

        const values = [];
       
        const { 
            email,
            senha 
        } = req.body;

        values.push(
            email,
            senha
        );

        for(var cont = 0; cont < values.length; cont++){
            if(values[cont] == "") {
                return res.json({ Aviso: 'Preencha todos os campos' });
            }
        }
        
        const [busca, metadata] = await Nutricionista.sequelize.query('SELECT id,  email, senha from nutricionista WHERE email =:sqlemail',
            {
             replacements: 
                { 
                    sqlemail:email,                                
                }
            }
        );
       

        if (busca.length > 0 && await bcrypt.compare(senha, busca[0].senha)) {

            console.log("Autorizado");         
            
            const cap_id = busca[0].id;
            const cap_email = busca[0].email;
           

            let jwtoken = generateToken({ id: cap_id });             
           
            const dado = new Dado(jwtoken, cap_id);
            return res.json(dado);

        } else {

            console.log("ACESSO NEGADO!");
            return res.status(400).send({ erro: 'Usuário ou senha incorretos.' });
        }        
    },
   //Recuperação de Senha 
    async forgotPassword(req, res) {

        const email = req.body.email;      

        try {
            const [busca, metadata] = await Nutricionista.sequelize.query('SELECT id, nome, email from nutricionista WHERE email =:sqlemail',
                {
                replacements: 
                    { 
                        sqlemail:email,                                
                    }
                }
            );
            
            const nome = busca[0].nome;
            const id = busca[0].id;           
           
           
            
            if ( busca.length > 0 ) {
                console.log("Email encontrado!");
                
                const token = crypto.randomBytes(4).toString('hex');
              
                mailer.sendMail({
                    from: 'Administrador <0f906a03d6-7ed0bd@inbox.mailtrap.io>',
                    to: email,
                    subject: 'Recuperação de Senha',
                    html: '<p>Olá '+ nome +'! Sua nova senha de acesso para o softnutri é: '+ token + '<br><a href="http://localhost:3000/">Login</a>',
                }).then(
                    () => {
                        bcrypt.hash(token, 10).then(
                            password =>  {
                                Nutricionista.sequelize.query('UPDATE nutricionista SET senha = :sqlsenha WHERE id = :sqlid',
                                    {
                                        replacements:
                                        {
                                            sqlsenha: password,
                                            sqlid: id,
                                        }
                                    }
                                )
                            }
                        ).then(
                            () => {
                                return res.status(200).send({ message: 'Email sended' });
                            }
                        )
                    }
                ).catch(
                    () => {
                        res.status(404).send({ message: 'Fail to send email' });
                    }
                )      
            } else {    
                console.log("Email não encontrado");
                return res.status(400).send({ erro: 'User not found' });
            }
            
        } catch (err) {
            console.log(err);
            res.status(400).send({ error: 'Erro on forgot password, try again' });
        }

    }
};



//-------------------------------------------------------------------------------------------------------


//const busca = await Nutricionista.sequelize.query('SELECT email from nutricionista WHERE email="'+email+'" and senha = "' +senha+'"');
//params.append('id', cap_id); 
       
//    const user = await Nutricionista.findOne(email).select('+password');

//    if(!user) {
//        return res.render('index.html', { Aviso: 'Usuário não encontrado!' });
//    } 

//