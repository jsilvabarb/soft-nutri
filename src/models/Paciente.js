const { Model, DataTypes} = require('sequelize');

class Paciente extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            sobrenome: DataTypes.STRING,
            email: DataTypes.STRING,
            telefone: DataTypes.STRING,
            sexo: DataTypes.STRING,
            peso:DataTypes.FLOAT,
            altura:DataTypes.FLOAT,
            data_nascimento: DataTypes.DATE,
            senha: DataTypes.STRING,
        }, { //conexão com o bcd
           sequelize,
        });
    }

    static associate(models) {
        this.hasMany(models.Consulta, { foreignKey: 'id_paciente', as: 'consulta' });
        this.hasMany (models.Mensagem, { foreignKey: 'id_paciente', as: 'mensagem' });
        this.hasMany (models.DietaHistorico, { foreignKey: 'id_paciente', as: 'dietaHistorico' });
        this.hasMany (models.DiarioPaciente, { foreignKey: 'id_paciente', as: 'diarioPaciente' });        
    }
}

module.exports = Paciente;