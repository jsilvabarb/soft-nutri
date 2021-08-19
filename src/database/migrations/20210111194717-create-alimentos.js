'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
    return queryInterface.createTable('alimentos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      umidade: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      calorias: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      energia_kj: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      proteinas: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      lipideos: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      colesterol: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      carboidratos: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      fibras: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      cinzas: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      calcio: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      magnezio: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      manganes: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },  
      fosforo: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      ferro: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      sodio: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      potassio: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      cobre: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      zinco: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      retinol: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      re: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      rae: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      tiamina: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      riboflavina: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      piridoxina: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      niacina: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      vitamina_c: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      saturados: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      mono_insaturados: {
        type: Sequelize.FLOAT,
        allowNull: false,
      }, 
      poli_insaturados: {
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
   
    return queryInterface.dropTable('alimentos');

  }
     
}
