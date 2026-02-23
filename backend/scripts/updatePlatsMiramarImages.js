require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

const miramarImageMap = [
    { match: 'cordon bleu', img: '/images/Plats Miramar/Cordon Bleu.jpg' },
    { match: 'cordon', img: '/images/Plats Miramar/Cordon Bleu.jpg' },
    { match: 'boeuf', img: '/images/Plats Miramar/Eminé de Boeuf.jpg' },
    { match: 'beef', img: '/images/Plats Miramar/Eminé de Boeuf.jpg' },
    { match: 'émincé de boeuf', img: '/images/Plats Miramar/Emincé de Boeuf.jpg' },
    { match: 'émincé de poulet', img: '/images/Plats Miramar/Emincé de Poulet.jpeg' },
    { match: 'émincé', img: '/images/Plats Miramar/Emincé de Poulet.jpeg' },
    { match: 'emince', img: '/images/Plats Miramar/Emincé de Poulet.jpeg' },
    { match: 'poulet', img: '/images/Plats Miramar/Emincé de Poulet.jpeg' },
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        const [products] = await sequelize.query(`
            SELECT p.id, p.name, p.images
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%miramar%'
            ORDER BY p.id
        `);

        console.log(`\n🍽️ Found ${products.length} Plats Miramar products:\n`);

        let updated = 0;
        for (const product of products) {
            const nameLower = product.name.toLowerCase();
            // Sort by match length descending so specific matches win
            const sortedMap = [...miramarImageMap].sort((a, b) => b.match.length - a.match.length);
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

        console.log(`\n🎉 Done! Updated ${updated}/${products.length} Plats Miramar products.`);
        await sequelize.close();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await sequelize.close();
        process.exit(1);
    }
}

run();
