require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});

async function run() {
    const [products] = await sequelize.query(`
        SELECT p.id, p.name, p.images
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE LOWER(c.name) LIKE '%italien%'
        ORDER BY p.id
    `);
    products.forEach(p => console.log(p.id, '|', p.name, '|', JSON.stringify(p.images)));
    await sequelize.close();
}
run().catch(e => { console.error(e.message); sequelize.close(); });
