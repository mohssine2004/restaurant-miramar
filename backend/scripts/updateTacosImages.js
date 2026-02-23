require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

const tacosImageMap = [
    { match: 'cordon bleu', img: '/images/Tacos/Tacos Cordon Bleu.png' },
    { match: 'cordon', img: '/images/Tacos/Tacos Cordon Bleu.png' },
    { match: 'nugget', img: '/images/Tacos/Tacos Nuggets.jpg' },
    { match: 'viande hach', img: '/images/Tacos/Tacos viande hachee.png' },
    { match: 'viande', img: '/images/Tacos/Tacos viande hachee.png' },
    { match: 'mix', img: '/images/Tacos/tacos mix.webp' },
    { match: 'mixte', img: '/images/Tacos/tacos mix.webp' },
    { match: 'poulet', img: '/images/Tacos/tacos poulet.jpeg' },
    { match: 'chicken', img: '/images/Tacos/tacos poulet.jpeg' },
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        const [products] = await sequelize.query(`
            SELECT p.id, p.name, p.images
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%taco%'
            ORDER BY p.id
        `);

        console.log(`\n🌮 Found ${products.length} tacos products:\n`);

        let updated = 0;
        for (const product of products) {
            const nameLower = product.name.toLowerCase();
            const found = tacosImageMap.find(e => nameLower.includes(e.match.toLowerCase()));

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

        console.log(`\n🎉 Done! Updated ${updated}/${products.length} tacos products.`);
        await sequelize.close();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await sequelize.close();
        process.exit(1);
    }
}

run();
