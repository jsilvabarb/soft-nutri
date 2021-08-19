const PerfilNutricionista = require('../models/PerfilNutricionista');
const Nutricionista = require('../models/Nutricionista');


module.exports = {
    async index(req, res) {
        const { id_nutricionista } = req.params;

        const [perfilNutri, metadata] = await Nutricionista.sequelize.query('SELECT perfil_nutricionista.id, perfil_nutricionista.id_nutricionista, perfil_nutricionista.name, perfil_nutricionista.url,  nutricionista.nome, nutricionista.sobrenome from nutricionista join perfil_nutricionista WHERE perfil_nutricionista.id_nutricionista = :sqlIdnutri and nutricionista.id = :sqlIdnutri ',
            {
                replacements: {
                    sqlIdnutri: id_nutricionista
                }
            }
        );

        return res.json(perfilNutri);       
    },
    async store(req, res) {

        try {

        console.log(req);
        console.log("-------------------------------");
        const { id_nutricionista } = req.params;

        const  name  = req.file.originalname;
        const  size = req.file.size;
        const  key  = req.file.filename;
        const  url  = req.file.filename;
       

        const perfilNutri = await PerfilNutricionista.create({
            name,
            size,
            key,
            url,
            id_nutricionista
        });

        return res.json(perfilNutri);
        } catch (err) {
            console.log(err);
        }
    },
    async delete(req, res) {
        const { id_nutricionista } = req.params;

        const deletaPerfil = await PerfilNutricionista.sequelize.query('DELETE from perfil_nutricionista WHERE id_nutricionista = :sqlIdnutri',
            {
                replacements: {
                    sqlIdnutri: id_nutricionista,
                }
            }
        );

        return res.send({ message: ' Foto deletada com sucesso '});

    }
}