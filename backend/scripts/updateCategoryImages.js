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
    { name: 'Entrées Froides', image: '/images/categories/Entrées%20Froides.png' },
    { name: 'Entrées Chaudes', image: '/images/categories/Entrées%20Chaudes.png' },
    { name: 'Plats Marocains', image: '/images/categories/Plats%20Marocains.png' },
    { name: 'Plats Miramar', image: '/images/categories/Plats%20Miramar.png' },
    { name: 'Plats Italiens', image: '/images/categories/Plats%20Italiens.png' },
    { name: 'Pizzas', image: '/images/categories/pizzas.png' },
    { name: 'Burgers', image: '/images/categories/Burgers.png' },
    { name: 'Sandwiches', image: '/images/categories/Sandwiches.png' },
    { name: 'Panini', image: '/images/categories/Panini.png' },
    { name: 'Tacos', image: '/images/categories/tacos.png' }
];

async function run() {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to the database.');

        let updatedCount = 0;
        for (const item of categoryImageMap) {
            const [result] = await sequelize.query(
                'UPDATE categories SET image = :image WHERE name = :name',
                {
                    replacements: {
                        image: item.image,
                        name: item.name
                    }
                }
            );
            console.log(`📡 Updated category "${item.name}" with image: ${item.image}`);
            updatedCount++;
        }

        console.log(`\n🎉 Successfully updated ${updatedCount} categories.`);
    } catch (err) {
        console.error('❌ Error updating categories:', err.message);
    } finally {
        await sequelize.close();
        console.log('🔒 Database connection closed.');
    }
}

run();
