'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('dieta_diarios', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
      },
      id_paciente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  { model: 'nutricionista', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_alimento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  { model: 'alimentos', key: 'id'},
      },
      qtd: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      medida: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },     
    });
    
  },

  down: async (queryInterface, Sequelize) => {
   
    return queryInterface.dropTable('dieta_diarios');

  }
     
}
