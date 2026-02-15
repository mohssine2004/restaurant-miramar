const { sequelize, Category, Product } = require('./models');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced successfully.');

        const categoriesData = [
            { name: 'Entrées Froides' },
            { name: 'Entrées Chaudes' },
            { name: 'Plats Marocains' },
            { name: 'Plats Miramar' },
            { name: 'Plats Italiens' },
            { name: 'Pizzas' },
            { name: 'Burgers' },
            { name: 'Sandwiches' },
            { name: 'Panini' },
            { name: 'Tacos' },
            { name: 'Dessert' },
            { name: 'Extras' }
        ];

        const categories = await Category.bulkCreate(categoriesData, { returning: true });
        console.log('Categories seeded.');

        // Helper to find category ID by name (in case IDs are not sequential 1-12)
        const getCatId = (name) => categories.find(c => c.name === name).id;

        const productsData = [
            // Entrées Froides (Category ID 1 in user SQL, but we look up dynamically)
            { category_id: getCatId('Entrées Froides'), name: 'Salade Russe', description: null, price: 40 },
            { category_id: getCatId('Entrées Froides'), name: 'Salade Niçoise', description: null, price: 40 },
            { category_id: getCatId('Entrées Froides'), name: 'Salade César', description: null, price: 50 },
            { category_id: getCatId('Entrées Froides'), name: 'Salade Fruit de Mer', description: null, price: 65 },

            // Pizzas (Category ID 6 in user SQL)
            { category_id: getCatId('Pizzas'), name: 'Pizza Margarita', description: 'Sauce tomate, Mozzarella', price: 40 },
            { category_id: getCatId('Pizzas'), name: 'Pizza Thon', description: 'Sauce tomate, Thon, Mozzarella', price: 55 },
            { category_id: getCatId('Pizzas'), name: 'Pizza Poulet', description: 'Sauce tomate, Poulet, Champignon, Mozzarella', price: 55 },
            { category_id: getCatId('Pizzas'), name: 'Pizza Bolognese', description: 'Sauce tomate, Viande hachée, Mozzarella', price: 65 },
            { category_id: getCatId('Pizzas'), name: 'Pizza Végétarienne', description: 'Sauce tomate, Mozzarella, Légumes', price: 45 },
            { category_id: getCatId('Pizzas'), name: 'Pizza Pepperoni', description: 'Sauce tomate, Pepperoni, Mozzarella', price: 65 },
            { category_id: getCatId('Pizzas'), name: 'Pizza BBQ', description: 'Sauce BBQ, Poulet, Jambon de dinde, Champignons', price: 65 },
            { category_id: getCatId('Pizzas'), name: 'Pizza 4 Fromages', description: 'Mozzarella, Emmental, Cheddar, Parmesan', price: 65 },
            { category_id: getCatId('Pizzas'), name: 'Pizza Fruits de Mer', description: 'Crevettes, Calamars, Olives', price: 80 }
        ];

        await Product.bulkCreate(productsData);
        console.log('Products seeded.');

        console.log('Database seeding completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
