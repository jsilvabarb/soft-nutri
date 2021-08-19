const PerfilPaciente = require('../models/PerfilPaciente');
const Nutricionista = require('../models/Nutricionista');


module.exports = {
    async index(req, res) {
        const { id_paciente } = req.params;

        const [perfilPac, metadata] = await Nutricionista.sequelize.query('SELECT perfil_pacientes.id, perfil_pacientes.id_paciente, perfil_pacientes.name, perfil_pacientes.url,  pacientes.nome, pacientes.sobrenome from pacientes join perfil_pacientes WHERE perfil_pacientes.id_paciente = :sqlIdpac and pacientes.id = :sqlIdpac',
            {
                replacements: {
                    sqlIdpac: id_paciente
                }
            }
        );

        return res.json(perfilPac);       
    },
    async store(req, res) {

        try {

        console.log(req);
        console.log("-------------------------------");
        const { id_paciente } = req.params;

        const  name  = req.file.originalname;
        const  size = req.file.size;
        const  key  = req.file.filename;
        const  url  = req.file.filename;
       

        const perfilPac = await PerfilPaciente.create({
            name,
            size,
            key,
            url,
            id_paciente
        });

        return res.json(perfilPac);
        } catch (err) {
            console.log(err);
        }
    },
    async delete(req, res) {
        const { id_paciente } = req.params;

        const deletaPerfil = await PerfilPaciente.sequelize.query('DELETE from perfil_pacientes WHERE id_paciente = :sqlIdpac',
            {
                replacements: {
                    sqlIdpac: id_paciente,
                }
            }
        );

        return res.send({ message: ' Foto deletada com sucesso '});

    }
}