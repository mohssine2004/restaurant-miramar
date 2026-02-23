require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

const paniniImageMap = [
    { match: 'viande hachée', img: '/images/panini/Panini Viande Hachée.jpg' },
    { match: 'viande hachee', img: '/images/panini/Panini Viande Hachée.jpg' },
    { match: 'viande', img: '/images/panini/Panini Viande Hachée.jpg' },
    { match: 'mix', img: '/images/panini/panini mix.jpg' },
    { match: 'mixte', img: '/images/panini/panini mix.jpg' },
    { match: 'poulet', img: '/images/panini/panini poulet.jpeg' },
    { match: 'chicken', img: '/images/panini/panini poulet.jpeg' },
    { match: 'thon', img: '/images/panini/panini thon.jpeg' },
    { match: 'tuna', img: '/images/panini/panini thon.jpeg' },
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        const [products] = await sequelize.query(`
            SELECT p.id, p.name, p.images
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%panini%'
            ORDER BY p.id
        `);

        console.log(`\n🥖 Found ${products.length} panini products:\n`);

        let updated = 0;
        for (const product of products) {
            const nameLower = product.name.toLowerCase();
            const found = paniniImageMap.find(e => nameLower.includes(e.match.toLowerCase()));

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

        console.log(`\n🎉 Done! Updated ${updated}/${products.length} panini products.`);
        await sequelize.close();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await sequelize.close();
        process.exit(1);
    }
}

run();
