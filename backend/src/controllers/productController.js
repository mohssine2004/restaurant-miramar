const { Product, Category } = require('../../models');

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

module.exports = {
    getAllProducts,
    getProductById
};
