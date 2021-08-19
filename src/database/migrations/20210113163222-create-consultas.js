'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('consulta', { 
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
      observacao: {
        type: Sequelize.STRING,
      },
      data: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      status: {
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
   
    return queryInterface.dropTable('consulta');

  }
     
}
