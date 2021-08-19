const { Model, DataTypes} = require('sequelize');

class DietaDiario extends Model {
    static init(sequelize) {
        super.init({
          id_alimento: DataTypes.INTEGER,
          qtd: DataTypes.FLOAT,
          medida: DataTypes.STRING,            
        }, { //conexão com o bcd
           sequelize,
        });
    }    

    static associate(models) {
        this.belongsTo(models.Paciente, { foreignKey: 'id_paciente', as: 'paciente' });
    }
}

module.exports = DietaDiario;