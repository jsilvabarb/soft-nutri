const { Model, DataTypes} = require('sequelize');

class DietaHistorico extends Model {
    static init(sequelize) {
        super.init({
            id_nutricionista: DataTypes.INTEGER,
            id_dieta: DataTypes.INTEGER,
            status: DataTypes.STRING,
            data: DataTypes.DATE,
        }, { //conexão com o bcd
           sequelize,
        });
    }

    static associate(models) {
        this.belongsTo(models.Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
    }
}

module.exports = DietaHistorico;