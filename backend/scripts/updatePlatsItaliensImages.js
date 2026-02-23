require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

// Clean paths — no spaces, no encoding needed
const italiensImageMap = [
    { match: 'gratin fruit de mer', img: '/images/Plats-Italiens-baked/Gratin Fruit de Mer.jpg' },
    { match: 'gratin poulet', img: '/images/Plats-Italiens-baked/Gratin Poulet.jpg' },
    { match: 'lasagne bolognaise', img: '/images/Plats-Italiens-baked/Lasagne Bolognaise.jpg' },
    { match: 'lasagne', img: '/images/Plats-Italiens-baked/Lasagne Bolognaise.jpg' },
    { match: 'gratin', img: '/images/Plats-Italiens-baked/Gratin Poulet.jpg' },
    { match: 'alfredo', img: '/images/Plats-Italiens-pasta/Alfredo.jpg' },
    { match: 'bolognaise', img: '/images/Plats-Italiens-pasta/Bolognaise.webp' },
    { match: 'bolognese', img: '/images/Plats-Italiens-pasta/Bolognaise.webp' },
    { match: 'fruit de mer', img: '/images/Plats-Italiens-pasta/Fruit de Mer.jpg' },
    { match: 'mer', img: '/images/Plats-Italiens-pasta/Fruit de Mer.jpg' },
    { match: 'poulet', img: '/images/Plats-Italiens-baked/Gratin Poulet.jpg' },
];

async function run() {
    try {
        await sequelize.authenticate();
        const [products] = await sequelize.query(`
            SELECT p.id, p.name FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%italien%' ORDER BY p.id
        `);
        console.log(`🍝 Found ${products.length} products\n`);
        let updated = 0;
        for (const product of products) {
            const nameLower = product.name.toLowerCase();
            const sortedMap = [...italiensImageMap].sort((a, b) => b.match.length - a.match.length);
            const found = sortedMap.find(e => nameLower.includes(e.match.toLowerCase()));
            if (found) {
                await sequelize.query('UPDATE products SET images = :images WHERE id = :id',
                    { replacements: { images: JSON.stringify([found.img]), id: product.id } });
                console.log(`  ✅  "${product.name}"  →  ${found.img}`);
                updated++;
            } else {
                console.log(`  ⚠️   "${product.name}"  →  no match`);
            }
        }
        console.log(`\n🎉 Updated ${updated}/${products.length}`);
        await sequelize.close();
    } catch (err) { console.error(err.message); await sequelize.close(); }
}
run();
