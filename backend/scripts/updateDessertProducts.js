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

const dessertImageMap = [
    { match: 'tarte au citron', img: '/images/Dessert/Tarte-Au-Citron.webp' },
    { match: 'flan', img: '/images/Dessert/Flan.jpg' },
    { match: 'tiramisu', img: '/images/Dessert/Tiramisu.jpg' }
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        const [products] = await sequelize.query(`
            SELECT p.id, p.name FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%dessert%'
        `);

        console.log(`🍰 Found ${products.length} products\n`);

        for (const product of products) {
            const nameLower = product.name.toLowerCase();
            const found = dessertImageMap.find(d => nameLower.includes(d.match.toLowerCase()));

            if (found) {
                await sequelize.query('UPDATE products SET images = :images WHERE id = :id', {
                    replacements: { images: JSON.stringify([found.img]), id: product.id }
                });
                console.log(`  ✅  "${product.name}" → ${found.img}`);
            }
        }
    } catch (err) { console.error(err); } finally { await sequelize.close(); }
}
run();
