'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('dieta_items', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
      },
      id_dieta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  { model: 'dieta', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_alimento: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  { model: 'alimentos', key: 'id'},
      },
      refeicao: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      qtd: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      medida: {
        type: Sequelize.STRING(15),
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
   
    return queryInterface.dropTable('dieta_items');

  }
     
}
