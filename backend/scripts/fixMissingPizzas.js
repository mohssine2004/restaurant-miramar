require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

// Direct ID-based updates for the ones that didn't match
// From the DB output:
//  18 = Pizza Margarita      → margherita image
//  21 = Pizza Bolognese       → bolognaise image
//  22 = Pizza Végétarienne    → vegetarienne image (may be empty, fix it)

const fixes = [
    { id: 18, img: '/images/Pizza/pizza margherita.jpg' },
    { id: 21, img: '/images/Pizza/pizza bolognaise.jpg' },
    { id: 22, img: '/images/Pizza/Pizza vegetarienne.jpeg' },
];

async function run() {
    await sequelize.authenticate();
    console.log('Connected');
    for (const fix of fixes) {
        await sequelize.query(
            'UPDATE products SET images = :images WHERE id = :id',
            { replacements: { images: JSON.stringify([fix.img]), id: fix.id } }
        );
        console.log('Updated id=' + fix.id + ' -> ' + fix.img);
    }
    console.log('All done!');
    await sequelize.close();
}

run().catch(e => { console.error(e.message); sequelize.close(); });
