require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

const extraImageMap = [
    { match: 'nugget', img: '/images/Extra/chicken-nuggets-bild.jpg' },
    { match: 'chicken', img: '/images/Extra/chicken-nuggets-bild.jpg' },
    { match: 'frit', img: '/images/Extra/extra frit.webp' },
    { match: 'fries', img: '/images/Extra/extra frit.webp' },
    { match: 'sauce', img: '/images/Extra/extra souce.jpg' },
    { match: 'souce', img: '/images/Extra/extra souce.jpg' },
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        const [products] = await sequelize.query(`
            SELECT p.id, p.name, p.images
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%extra%'
            ORDER BY p.id
        `);

        console.log(`\n➕ Found ${products.length} extra products:\n`);

        let updated = 0;
        for (const product of products) {
            const nameLower = product.name.toLowerCase();
            const found = extraImageMap.find(e => nameLower.includes(e.match.toLowerCase()));

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

        console.log(`\n🎉 Done! Updated ${updated}/${products.length} extra products.`);
        await sequelize.close();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await sequelize.close();
        process.exit(1);
    }
}

run();
