const { Model, DataTypes} = require('sequelize');

class DiarioPaciente extends Model {
    static init(sequelize) {
        super.init({
          date: DataTypes.DATEONLY,
          fibras: DataTypes.FLOAT,
          proteinas: DataTypes.FLOAT,
          ferro: DataTypes.FLOAT,
          carboidratos: DataTypes.FLOAT,
          lipideos: DataTypes.FLOAT,
          calorias: DataTypes.FLOAT,
            
        }, { //conexão com o bcd
           sequelize,
        });
    }    

    static associate(models) {
        this.belongsTo(models.Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
    }
}

module.exports = DiarioPaciente;