require('dotenv').config();
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres', protocol: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }, logging: false
});
const query = 'SELECT p.id, p.name, p.images FROM products p JOIN categories c ON p.category_id = c.id WHERE LOWER(c.name) LIKE \'%pizza%\' ORDER BY p.id';
sequelize.query(query)
    .then(([rows]) => {
        rows.forEach(r => console.log(r.id + ' | ' + r.name + ' | ' + JSON.stringify(r.images)));
        sequelize.close();
    })
    .catch(e => { console.error(e.message); sequelize.close(); });
