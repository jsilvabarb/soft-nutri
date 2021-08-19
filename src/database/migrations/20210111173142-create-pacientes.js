'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('pacientes', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sobrenome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      sexo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      peso: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      altura: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      senha: {
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
   
    return queryInterface.dropTable('pacientes');

  }
     
}
