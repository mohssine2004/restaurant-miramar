const sequelize = require('../config/database');
const Category = require('./Category');
const Product = require('./Product');
const Reservation = require('./Reservation');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

// Associations
Category.hasMany(Product, { foreignKey: 'category_id', onDelete: 'CASCADE' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
    sequelize,
    Category,
    Product,
    Reservation,
    Order,
    OrderItem
};
