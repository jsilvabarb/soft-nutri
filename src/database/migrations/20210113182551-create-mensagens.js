'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('mensagems', { 
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
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_nutricionista: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:  { model: 'nutricionista', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      remetente: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      destinatario: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      mensagem: {
        type: Sequelize.STRING(1000),
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
   
    return queryInterface.dropTable('mensagems');

  }
     
}