const { Model, DataTypes} = require('sequelize');

class PerfilNutricionista extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            size: DataTypes.FLOAT,
            key: DataTypes.STRING,
            url: DataTypes.STRING,
        }, { //conexão com o bcd
           sequelize,
        });
    }    

    static associate(models) {
        this.belongsTo(models.Nutricionista, { foreignKey: 'id_nutricionista', as: 'nutricionista' });
    }
}

module.exports = PerfilNutricionista;