const { Sequelize, Model, DataTypes } = require('sequelize');

class Server extends Model {}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
    logging: false
});

Server.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    ip: DataTypes.STRING,
    premium: DataTypes.BOOLEAN
}, { sequelize, modelName: 'server' });

exports.sequelize = sequelize;
exports.Server = Server;