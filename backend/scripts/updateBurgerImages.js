require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

const burgerImageMap = [
    { match: 'cheese burger', img: '/images/Burgers/Cheese Burger.jpg' },
    { match: 'cheese', img: '/images/Burgers/Cheese Burger.jpg' },
    { match: 'chicken', img: '/images/Burgers/Chicken Burger.jpg' },
    { match: 'poulet', img: '/images/Burgers/Chicken Burger.jpg' },
    { match: 'mixte', img: '/images/Burgers/Mixte Burger.jpg' },
    { match: 'double cheese', img: '/images/Burgers/double cheese burger.webp' },
    { match: 'double', img: '/images/Burgers/double cheese burger.webp' },
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        const [products] = await sequelize.query(`
            SELECT p.id, p.name, p.images
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%burger%'
            ORDER BY p.id
        `);

        console.log(`\n🍔 Found ${products.length} burger products:\n`);

        let updated = 0;
        for (const product of products) {
            const nameLower = product.name.toLowerCase();
            const found = burgerImageMap.find(entry =>
                nameLower.includes(entry.match.toLowerCase())
            );

            if (found) {
                await sequelize.query(
                    'UPDATE products SET images = :images WHERE id = :id',
                    { replacements: { images: JSON.stringify([found.img]), id: product.id } }
                );
                console.log(`  ✅  "${product.name}"  →  ${found.img}`);
                updated++;
            } else {
                console.log(`  ⚠️   "${product.name}"  →  no match found`);
            }
        }

        console.log(`\n🎉 Done! Updated ${updated}/${products.length} burger products.`);
        await sequelize.close();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await sequelize.close();
        process.exit(1);
    }
}

run();
