const { Model, DataTypes} = require('sequelize');

class Agenda extends Model {
    static init(sequelize) {
        super.init({
            observacao: DataTypes.STRING,
            data: DataTypes.DATEONLY,
            hora: DataTypes.TIME,
            status: DataTypes.STRING,
        }, { //conexão com o bcd
           sequelize,
        });
    }

    static associate(models) {
        this.belongsTo(models.Nutricionista, { foreignKey: 'id_nutricionista', as: 'nutricionista' });
    }
}

module.exports = Agenda;