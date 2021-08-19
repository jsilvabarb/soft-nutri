'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('dieta', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
      },
      id_nutricionista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  { model: 'nutricionista', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      descricao: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      max_calorias: {
        type: Sequelize.FLOAT,
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
   
    return queryInterface.dropTable('dieta');

  }
     
}
