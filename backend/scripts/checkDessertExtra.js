require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        // Check categories
        const [categories] = await sequelize.query("SELECT id, name FROM categories WHERE name IN ('Dessert', 'Extras', 'Extra')");
        console.log('Categories:', JSON.stringify(categories, null, 2));

        if (categories.length > 0) {
            const catIds = categories.map(c => c.id);
            const [products] = await sequelize.query(`SELECT id, name, category_id FROM products WHERE category_id IN (${catIds.join(',')})`);
            console.log('Products:', JSON.stringify(products, null, 2));
        }
    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
}
run();
