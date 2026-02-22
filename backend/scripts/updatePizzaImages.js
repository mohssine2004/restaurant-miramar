/**
 * Script: updatePizzaImages.js
 * Updates the `images` column for pizza products using images from /images/Pizza/
 * Run: node scripts/updatePizzaImages.js
 */

require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
    logging: false
});

// Map: product name (case-insensitive substring match) → public image path
const pizzaImageMap = [
    { match: 'margherita', img: '/images/Pizza/pizza margherita.jpg' },
    { match: 'pepperoni', img: '/images/Pizza/Pizza Pepperoni.jpg' },
    { match: 'fruits de mer', img: '/images/Pizza/Pizza Fruits de Mer.jpg' },
    { match: 'végétarienne', img: '/images/Pizza/Pizza vegetarienne.jpeg' },
    { match: 'vegetarienne', img: '/images/Pizza/Pizza vegetarienne.jpeg' },
    { match: '4 fromage', img: '/images/Pizza/pizza 4 fromage.jpg' },
    { match: 'fromage', img: '/images/Pizza/pizza 4 fromage.jpg' },
    { match: 'thon', img: '/images/Pizza/pizza Thon.jpg' },
    { match: 'bbq', img: '/images/Pizza/pizza bbq.webp' },
    { match: 'bolognaise', img: '/images/Pizza/pizza bolognaise.jpg' },
    { match: 'poulet', img: '/images/Pizza/pizza poulet.png' },
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to database');

        // Fetch all products in the Pizzas category
        const [products] = await sequelize.query(`
            SELECT p.id, p.name, p.images, c.name as category_name
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%pizza%'
            ORDER BY p.id
        `);

        console.log(`\n🍕 Found ${products.length} pizza products:\n`);

        let updated = 0;
        for (const product of products) {
            const nameLower = product.name.toLowerCase();

            // Find the best matching image
            const found = pizzaImageMap.find(entry =>
                nameLower.includes(entry.match.toLowerCase())
            );

            if (found) {
                await sequelize.query(
                    `UPDATE products SET images = :images WHERE id = :id`,
                    {
                        replacements: {
                            images: JSON.stringify([found.img]),
                            id: product.id
                        }
                    }
                );
                console.log(`  ✅  "${product.name}" → ${found.img}`);
                updated++;
            } else {
                console.log(`  ⚠️   "${product.name}" → no matching image found`);
            }
        }

        console.log(`\n🎉 Done! Updated ${updated}/${products.length} pizza products.`);
        await sequelize.close();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await sequelize.close();
        process.exit(1);
    }
}

run();
