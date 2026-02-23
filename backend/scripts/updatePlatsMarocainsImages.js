require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

const marocainsImageMap = [
    { match: 'kefta', img: '/images/Plats Marocains/Tajine Kefta.jpg' },
    { match: 'poulet', img: '/images/Plats Marocains/Tajine de Poulet.png' },
    { match: 'viande', img: '/images/Plats Marocains/Tajine de Viande.webp' },
    { match: 'boeuf', img: '/images/Plats Marocains/Tajine de Viande.webp' },
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        const [products] = await sequelize.query(`
            SELECT p.id, p.name, p.images
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%maroc%'
            ORDER BY p.id
        `);

        console.log(`\n🥘 Found ${products.length} Plats Marocains products:\n`);

        let updated = 0;
        for (const product of products) {
            const nameLower = product.name.toLowerCase();
            const found = marocainsImageMap.find(e => nameLower.includes(e.match.toLowerCase()));

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

        console.log(`\n🎉 Done! Updated ${updated}/${products.length} Plats Marocains products.`);
        await sequelize.close();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await sequelize.close();
        process.exit(1);
    }
}

run();
