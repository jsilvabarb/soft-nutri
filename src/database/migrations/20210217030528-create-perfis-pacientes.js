'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('perfil_pacientes', { 
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
      name: {
        type: Sequelize.STRING,
      },
      size: {
        type:Sequelize.FLOAT,
      },
      key: {
        type:Sequelize.STRING,
      },
      url: {
        type:Sequelize.STRING,
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
   
    return queryInterface.dropTable('perfil_pacientes');

  }
     
}
