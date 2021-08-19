const { Model, DataTypes} = require('sequelize');

class Nutricionista extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            sobrenome: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            sexo: DataTypes.STRING,
            data_nascimento: DataTypes.DATE,
            crn: DataTypes.STRING,
            universidade: DataTypes.STRING,
            data_formacao: DataTypes.DATE,
            senha: DataTypes.STRING,
        }, { //conexão com o bcd
           sequelize,
        });
    }

    static associate(models) {
        this.hasMany(models.Consulta, { foreignKey: 'id_nutricionista', as: 'consulta' });
        this.hasMany( models.Mensagem, { foreignKey: 'id_nutricionista', as: 'mensagem' });
        this.hasMany( models.Dieta, { foreignKey: 'id_nutricionista', as: 'dieta' });
        this.belongsTo( models.PerfilNutricionista, { foreignKey: 'id_nutricionista', as: 'perfilNutricionista' });
       
    }
}

module.exports = Nutricionista;