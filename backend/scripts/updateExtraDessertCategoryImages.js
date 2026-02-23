require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false
});

const categoryImageMap = [
    { name: 'Extras', image: '/images/categories/extra.png' },
    { name: 'Dessert', image: '/images/categories/Dessert.png' }
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected');

        for (const item of categoryImageMap) {
            await sequelize.query('UPDATE categories SET image = :image WHERE name = :name', {
                replacements: { image: item.image, name: item.name }
            });
            console.log(`📡 Updated "${item.name}" category image to ${item.image}`);
        }
    } catch (err) { console.error(err); } finally { await sequelize.close(); }
}
run();
