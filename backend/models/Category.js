const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    image: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'categories',
    timestamps: false
});

module.exports = Category;
