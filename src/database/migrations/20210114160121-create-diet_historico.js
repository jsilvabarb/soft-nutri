'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('dieta_historicos', { 
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
        // onDelete: 'CASCADE',
      },
      id_paciente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  { model: 'pacientes', key: 'id'},
        // onDelete: 'CASCADE',
      },
      id_dieta: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  { model: 'dieta', key: 'id'},       
      },
      status: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      data: {
        type:Sequelize.DATE,
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
   
    return queryInterface.dropTable('dieta_historicos');

  }
     
}