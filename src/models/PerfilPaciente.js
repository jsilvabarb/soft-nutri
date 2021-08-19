const { Model, DataTypes} = require('sequelize');

class PerfilPaciente extends Model {
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
        this.belongsTo(models.Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
    }
}

module.exports = PerfilPaciente;