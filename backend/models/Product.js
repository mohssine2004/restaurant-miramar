const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.DECIMAL(8, 2),
        allowNull: false
    },
    note: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    tableName: 'products',
    timestamps: false
});

module.exports = Product;
