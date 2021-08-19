const { Model, DataTypes} = require('sequelize');

class DietaItem extends Model {
    static init(sequelize) {
        super.init({
            id_alimento: DataTypes.INTEGER,
            refeicao: DataTypes.STRING,
            qtd: DataTypes.FLOAT,
            medida: DataTypes.STRING,
        }, { //conexão com o bcd
           sequelize,
        });
    }

    static associate(models) {
        this.belongsTo(models.Dieta, { foreignKey: 'id_dieta', as: 'dieta' });
    }
}

module.exports = DietaItem;