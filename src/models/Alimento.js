const { Model, DataTypes} = require('sequelize');

class Alimento extends Model {
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
            tipo: DataTypes.STRING,
            umidade: DataTypes.FLOAT,
            calorias: DataTypes.FLOAT,
            energia_kj: DataTypes.FLOAT,
            proteinas: DataTypes.FLOAT,
            lipideos: DataTypes.FLOAT,
            colesterol: DataTypes.FLOAT,
            carboidratos: DataTypes.FLOAT,
            fibras: DataTypes.FLOAT,
            cinzas: DataTypes.FLOAT,
            calcio: DataTypes.FLOAT,
            magnezio: DataTypes.FLOAT,
            manganes: DataTypes.FLOAT,
            fosforo: DataTypes.FLOAT,
            ferro: DataTypes.FLOAT,
            sodio: DataTypes.FLOAT,
            potassio: DataTypes.FLOAT,
            cobre: DataTypes.FLOAT,
            zinco: DataTypes.FLOAT,
            retinol: DataTypes.FLOAT,
            re: DataTypes.FLOAT,
            rae: DataTypes.FLOAT,
            tiamina: DataTypes.FLOAT,
            riboflavina: DataTypes.FLOAT,
            piridoxina: DataTypes.FLOAT,
            niacina: DataTypes.FLOAT,
            vitamina_c: DataTypes.FLOAT,
            saturados: DataTypes.FLOAT,
            mono_insaturados: DataTypes.FLOAT,
            poli_insaturados: DataTypes.FLOAT,
        }, { //conexão com o bcd
           sequelize,
        });
    }

    // static associate(models) {
   
    // }
}

module.exports = Alimento;