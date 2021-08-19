const { Model, DataTypes} = require('sequelize');

class Mensagem extends Model {
    static init(sequelize) {
        super.init({
            remetente: DataTypes.INTEGER,
            destinatario: DataTypes.INTEGER,
            mensagem: DataTypes.STRING(1000),
        }, { //conexão com o bcd
           sequelize,
        });
    }

    static associate(models) {
        this.belongsTo(models.Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
        this.belongsTo(models.Nutricionista, { foreignKey: 'id_nutricionista', as: 'nutricionista' });
    }
}

module.exports = Mensagem;