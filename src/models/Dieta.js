const { Model, DataTypes} = require('sequelize');

class Dieta extends Model {
    static init(sequelize) {
        super.init({
          descricao: DataTypes.STRING,
          max_calorias: DataTypes.FLOAT,
            
        }, { //conexão com o bcd
           sequelize,
        });
    }    

    static associate(models) {
        this.belongsTo(models.Nutricionista, { foreignKey: 'id_nutricionista', as: 'nutricionista' });
    }
}

module.exports = Dieta;