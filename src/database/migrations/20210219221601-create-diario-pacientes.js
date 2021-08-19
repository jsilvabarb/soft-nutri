'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('diario_pacientes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
      },
      id_paciente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  { model: 'pacientes', key: 'id'},
        // onDelete: 'CASCADE',
      },
      data: {
        type: Sequelize.DATEONLY,
      },
      fibras: {
        type: Sequelize.FLOAT,
      },
      proteinas: {
        type: Sequelize.FLOAT,
      },
      ferro: {
        type: Sequelize.FLOAT,
      },
      carboidratos: {
        type: Sequelize.FLOAT,
      },
      lipideos: {
        type: Sequelize.FLOAT,
      },
      calorias: {
        type: Sequelize.FLOAT,
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
   
    return queryInterface.dropTable('diario_pacientes');

  }
     
}
