const { Model, DataTypes} = require('sequelize');

class Consulta extends Model {
    static init(sequelize) {
        super.init({
            observacao: DataTypes.STRING,
            status: DataTypes.STRING,
            data: DataTypes.DATEONLY,
            hora: DataTypes.TIME,
        }, { //conexão com o bcd
           sequelize,
        });
    }

    static associate(models) {
        this.belongsTo(models.Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
        this.belongsTo(models.Nutricionista, { foreignKey: 'id_nutricionista', as: 'nutricionista' });
    }
}

module.exports = Consulta;