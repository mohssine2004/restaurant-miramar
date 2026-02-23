const { Product, Category, sequelize } = require('../../models');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [{ model: Category, attributes: ['name'] }]
        });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, {
            include: [{ model: Category, attributes: ['name'] }]
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPopularDishes = async (req, res) => {
    try {
        const categories = ['Plats Miramar', 'Plats Marocains', 'Plats Italiens'];
        const popularDishes = [];

        for (const catName of categories) {
            const dish = await Product.findOne({
                include: [{
                    model: Category,
                    where: { name: catName },
                    attributes: ['name']
                }],
                order: sequelize.random() // Get a random one each time or just the first
            });
            if (dish) popularDishes.push(dish);
        }

        res.json(popularDishes);
    } catch (error) {
        console.error('Error fetching popular dishes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    getPopularDishes
};
