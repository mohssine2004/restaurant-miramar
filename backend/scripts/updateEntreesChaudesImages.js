require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

const chaudesImageMap = [
    { match: 'légumes', img: '/images/Entrées Chaudes/Soupe de Légumes.jpg' },
    { match: 'legumes', img: '/images/Entrées Chaudes/Soupe de Légumes.jpg' },
    { match: 'poisson spéciale', img: '/images/Entrées Chaudes/Soupe de Poisson Spéciale.jpg' },
    { match: 'poisson speciale', img: '/images/Entrées Chaudes/Soupe de Poisson Spéciale.jpg' },
    { match: 'spéciale', img: '/images/Entrées Chaudes/Soupe de Poisson Spéciale.jpg' },
    { match: 'poisson', img: '/images/Entrées Chaudes/Soupe de Poisson.jpg' },
    { match: 'tortilla', img: '/images/Entrées Chaudes/Tortilla.png' },
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        const [products] = await sequelize.query(`
            SELECT p.id, p.name, p.images
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%chaud%'
            ORDER BY p.id
        `);

        console.log(`\n🍲 Found ${products.length} Entrées Chaudes products:\n`);

        let updated = 0;
        for (const product of products) {
            const nameLower = product.name.toLowerCase();
            // Sort matches by length descending so more specific matches win first
            const sortedMap = [...chaudesImageMap].sort((a, b) => b.match.length - a.match.length);
            const found = sortedMap.find(e => nameLower.includes(e.match.toLowerCase()));

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

        console.log(`\n🎉 Done! Updated ${updated}/${products.length} Entrées Chaudes products.`);
        await sequelize.close();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await sequelize.close();
        process.exit(1);
    }
}

run();
