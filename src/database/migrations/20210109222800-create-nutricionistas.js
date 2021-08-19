'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('nutricionista', { 
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
      data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      crn: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      universidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_formacao: {
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
   
    return queryInterface.dropTable('nutricionista');

  }
     
}
