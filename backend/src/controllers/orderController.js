const { Order, OrderItem, sequelize } = require('../../models');

const createOrder = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { customer_name, phone, order_type, items } = req.body;

        // Basic validation
        if (!customer_name || !phone || !order_type || !items || items.length === 0) {
            return res.status(400).json({ error: 'Invalid order data' });
        }

        // Calculate total price
        let total_price = 0;
        for (const item of items) {
            total_price += item.price * item.quantity;
        }

        // Create Order
        const newOrder = await Order.create({
            customer_name,
            phone,
            order_type,
            total_price
        }, { transaction: t });

        // Create Order Items
        const orderItemsData = items.map(item => ({
            order_id: newOrder.id,
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price
        }));

        await OrderItem.bulkCreate(orderItemsData, { transaction: t });

        await t.commit();
        res.status(201).json({ message: 'Order created successfully', orderId: newOrder.id });
    } catch (error) {
        await t.rollback();
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createOrder
};
