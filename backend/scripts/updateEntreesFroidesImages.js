require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

const froidesImageMap = [
    { match: 'césar', img: '/images/Entrées Froides/Salade César.jpg' },
    { match: 'cesar', img: '/images/Entrées Froides/Salade César.jpg' },
    { match: 'fruit de mer', img: '/images/Entrées Froides/Salade Fruit de Mer.webp' },
    { match: 'mer', img: '/images/Entrées Froides/Salade Fruit de Mer.webp' },
    { match: 'niçoise', img: '/images/Entrées Froides/Salade Niçoise.jpeg' },
    { match: 'nicoise', img: '/images/Entrées Froides/Salade Niçoise.jpeg' },
    { match: 'russe', img: '/images/Entrées Froides/Salade Russe.jpg' },
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        const [products] = await sequelize.query(`
            SELECT p.id, p.name, p.images
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE LOWER(c.name) LIKE '%froid%'
            ORDER BY p.id
        `);

        console.log(`\n🥗 Found ${products.length} Entrées Froides products:\n`);

        let updated = 0;
        for (const product of products) {
            const nameLower = product.name.toLowerCase();
            const found = froidesImageMap.find(e => nameLower.includes(e.match.toLowerCase()));

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

        console.log(`\n🎉 Done! Updated ${updated}/${products.length} Entrées Froides products.`);
        await sequelize.close();
    } catch (err) {
        console.error('❌ Error:', err.message);
        await sequelize.close();
        process.exit(1);
    }
}

run();
