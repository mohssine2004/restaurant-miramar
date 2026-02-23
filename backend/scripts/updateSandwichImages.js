require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

const sandwichImageMap = [
    { match: 'cordon bleu', img: '/images/Sandwiches/Cordon Bleu.webp' },
    { match: 'cordon', img: '/images/Sandwiches/Cordon Bleu.webp' },
    { match: 'duo meat', img: '/images/Sandwiches/Sandwich Duo Meat.avif' },
    { match: 'duo', img: '/images/Sandwiches/Sandwich Duo Meat.avif' },
    { match: 'américain', img: '/images/Sandwiches/Sandwiche Américain.png' },
    { match: 'americain', img: '/images/Sandwiches/Sandwiche Américain.png' },
    { match: 'américaine', img: '/images/Sandwiches/Sandwiche Américain.png' },
    { match: 'chicken', img: '/images/Sandwiches/Sandwiche chicken.jpg' },
    { match: 'poulet', img: '/images/Sandwiches/Sandwiche chicken.jpg' },
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        const [products] = await sequelize.query(`
            SELECT p.id, p.name, p.images
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%sandwich%'
            ORDER BY p.id
        `);

        console.log(`\n🥪 Found ${products.length} sandwich products:\n`);

        let updated = 0;
        for (const product of products) {
            const nameLower = product.name.toLowerCase();
            const found = sandwichImageMap.find(e => nameLower.includes(e.match.toLowerCase()));

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

        console.log(`\n🎉 Done! Updated ${updated}/${products.length} sandwich products.`);
        await sequelize.close();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await sequelize.close();
        process.exit(1);
    }
}

run();
