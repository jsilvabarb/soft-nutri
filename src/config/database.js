module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root123',
    database: 'tccSenai',
    define: {
        timestamps: true,  //crated_at, updated_at
        underscored: true,
    },
};