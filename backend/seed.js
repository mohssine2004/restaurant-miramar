const { sequelize, Category, Product } = require('./models');

const seedData = async () => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced successfully.');

        const categoriesData = [
            { name: 'Entrées Froides', image: '/images/img4.png' },
            { name: 'Entrées Chaudes', image: '/images/img5.png' },
            { name: 'Plats Marocains', image: '/images/img8.png' },
            { name: 'Plats Miramar', image: '/images/img18.png' },
            { name: 'Plats Italiens', image: '/images/img9.png' },
            { name: 'Pizzas', image: '/images/img1.png' },
            { name: 'Burgers', image: '/images/img2.png' },
            { name: 'Sandwiches', image: '/images/img6.png' },
            { name: 'Panini', image: '/images/img7.png' },
            { name: 'Tacos', image: '/images/img10.png' },
            { name: 'Dessert', image: '/images/img11.png' },
            { name: 'Extras', image: null }
        ];

        const categories = await Category.bulkCreate(categoriesData, { returning: true });
        console.log('Categories seeded.');

        const getCatId = (name) => categories.find(c => c.name === name).id;

        const productsData = [
            // Entrées Froides
            { category_id: getCatId('Entrées Froides'), name: 'Salade Russe', description: 'Pommes de terre, carottes, petits pois, mayonnaise', price: 40, images: ['/images/img4.png'] },
            { category_id: getCatId('Entrées Froides'), name: 'Salade Niçoise', description: 'Thon, œufs, tomates, olives, haricots verts', price: 40, images: ['/images/img4.png'] },
            { category_id: getCatId('Entrées Froides'), name: 'Salade César', description: 'Poulet grillé, laitue, parmesan, croûtons', price: 50, images: ['/images/img4.png'] },
            { category_id: getCatId('Entrées Froides'), name: 'Salade Fruit de Mer', description: 'Crevettes, calamars, légumes frais', price: 65, images: ['/images/img4.png'] },

            // Entrées Chaudes
            { category_id: getCatId('Entrées Chaudes'), name: 'Soupe du Jour', description: 'Soupe fraîche préparée chaque jour', price: 30, images: ['/images/img5.png'] },
            { category_id: getCatId('Entrées Chaudes'), name: 'Briouates', description: 'Feuilletés croustillants farcis au fromage et herbes', price: 35, images: ['/images/img5.png'] },

            // Plats Marocains
            { category_id: getCatId('Plats Marocains'), name: 'Tajine Poulet', description: 'Tajine de poulet aux olives et citrons confits', price: 85, images: ['/images/img8.png', '/images/img17.png'] },
            { category_id: getCatId('Plats Marocains'), name: 'Tajine Kefta', description: 'Boulettes de viande en sauce tomate épicée', price: 80, images: ['/images/img8.png'] },
            { category_id: getCatId('Plats Marocains'), name: 'Couscous Royal', description: 'Couscous aux légumes, agneau et merguez', price: 95, images: ['/images/img8.png', '/images/img17.png'] },
            { category_id: getCatId('Plats Marocains'), name: 'Pastilla Poulet', description: 'Feuilleté sucré-salé au poulet et amandes', price: 90, images: ['/images/img8.png'] },

            // Plats Miramar
            { category_id: getCatId('Plats Miramar'), name: 'Entrecôte Grillée', description: 'Entrecôte de bœuf grillée, frites maison, salade', price: 120, images: ['/images/img18.png', '/images/img19.png'] },
            { category_id: getCatId('Plats Miramar'), name: 'Saumon Grillé', description: 'Filet de saumon grillé, légumes vapeur, sauce citron', price: 140, images: ['/images/img18.png'] },
            { category_id: getCatId('Plats Miramar'), name: 'Crevettes Sautées', description: 'Crevettes royales sautées à l\'ail et persil', price: 130, images: ['/images/img18.png', '/images/img20.png'] },

            // Plats Italiens
            { category_id: getCatId('Plats Italiens'), name: 'Spaghetti Bolognese', description: 'Spaghetti à la sauce bolognaise maison', price: 70, images: ['/images/img9.png'] },
            { category_id: getCatId('Plats Italiens'), name: 'Penne Arrabiata', description: 'Penne à la sauce tomate épicée', price: 60, images: ['/images/img9.png'] },
            { category_id: getCatId('Plats Italiens'), name: 'Lasagne', description: 'Lasagne à la viande hachée et béchamel', price: 75, images: ['/images/img9.png'] },
            { category_id: getCatId('Plats Italiens'), name: 'Risotto aux Champignons', description: 'Risotto crémeux aux champignons et parmesan', price: 80, images: ['/images/img9.png'] },

            // Pizzas
            { category_id: getCatId('Pizzas'), name: 'Pizza Margarita', description: 'Sauce tomate, Mozzarella', price: 40, images: ['/images/img1.png'] },
            { category_id: getCatId('Pizzas'), name: 'Pizza Thon', description: 'Sauce tomate, Thon, Mozzarella', price: 55, images: ['/images/img1.png'] },
            { category_id: getCatId('Pizzas'), name: 'Pizza Poulet', description: 'Sauce tomate, Poulet, Champignon, Mozzarella', price: 55, images: ['/images/img1.png', '/images/img21.png'] },
            { category_id: getCatId('Pizzas'), name: 'Pizza Bolognese', description: 'Sauce tomate, Viande hachée, Mozzarella', price: 65, images: ['/images/img1.png'] },
            { category_id: getCatId('Pizzas'), name: 'Pizza Végétarienne', description: 'Sauce tomate, Mozzarella, Légumes', price: 45, images: ['/images/img1.png'] },
            { category_id: getCatId('Pizzas'), name: 'Pizza Pepperoni', description: 'Sauce tomate, Pepperoni, Mozzarella', price: 65, images: ['/images/img1.png', '/images/img21.png'] },
            { category_id: getCatId('Pizzas'), name: 'Pizza BBQ', description: 'Sauce BBQ, Poulet, Jambon de dinde, Champignons', price: 65, images: ['/images/img1.png'] },
            { category_id: getCatId('Pizzas'), name: 'Pizza 4 Fromages', description: 'Mozzarella, Emmental, Cheddar, Parmesan', price: 65, images: ['/images/img1.png'] },
            { category_id: getCatId('Pizzas'), name: 'Pizza Fruits de Mer', description: 'Crevettes, Calamars, Olives', price: 80, images: ['/images/img1.png', '/images/img21.png'] },

            // Burgers
            { category_id: getCatId('Burgers'), name: 'Classic Burger', description: 'Steak haché, cheddar, salade, tomate, oignon', price: 55, images: ['/images/img2.png'] },
            { category_id: getCatId('Burgers'), name: 'Chicken Burger', description: 'Poulet croustillant, sauce mayo, salade', price: 55, images: ['/images/img2.png'] },
            { category_id: getCatId('Burgers'), name: 'Double Smash Burger', description: 'Double steak smashé, double cheddar, sauce maison', price: 75, images: ['/images/img2.png', '/images/img12.png'] },
            { category_id: getCatId('Burgers'), name: 'BBQ Burger', description: 'Steak haché, sauce BBQ, oignons caramélisés', price: 65, images: ['/images/img2.png'] },

            // Sandwiches
            { category_id: getCatId('Sandwiches'), name: 'Sandwich Thon', description: 'Thon, tomate, œuf, harissa', price: 25, images: ['/images/img6.png'] },
            { category_id: getCatId('Sandwiches'), name: 'Sandwich Poulet', description: 'Poulet grillé, salade, sauce blanche', price: 30, images: ['/images/img6.png'] },
            { category_id: getCatId('Sandwiches'), name: 'Sandwich Kefta', description: 'Kefta grillée, tomate, oignon, harissa', price: 28, images: ['/images/img6.png'] },

            // Panini
            { category_id: getCatId('Panini'), name: 'Panini Poulet', description: 'Poulet, mozzarella, tomate, pesto', price: 40, images: ['/images/img7.png'] },
            { category_id: getCatId('Panini'), name: 'Panini Thon', description: 'Thon, mozzarella, tomate, olives', price: 38, images: ['/images/img7.png'] },
            { category_id: getCatId('Panini'), name: 'Panini Mixte', description: 'Jambon de dinde, fromage, tomate', price: 38, images: ['/images/img7.png'] },

            // Tacos
            { category_id: getCatId('Tacos'), name: 'Tacos Poulet', description: 'Poulet, frites, sauce blanche, fromage fondu', price: 45, images: ['/images/img10.png'] },
            { category_id: getCatId('Tacos'), name: 'Tacos Viande Hachée', description: 'Viande hachée, frites, sauce algérienne', price: 45, images: ['/images/img10.png'] },
            { category_id: getCatId('Tacos'), name: 'Tacos Mixte', description: 'Poulet + viande hachée, frites, double sauce', price: 55, images: ['/images/img10.png', '/images/img14.png'] },
            { category_id: getCatId('Tacos'), name: 'Tacos XL', description: 'Grande portion, triple garniture, frites, sauce au choix', price: 65, images: ['/images/img10.png', '/images/img14.png'] },

            // Dessert
            { category_id: getCatId('Dessert'), name: 'Tiramisu', description: 'Tiramisu maison au café et mascarpone', price: 40, images: ['/images/img11.png'] },
            { category_id: getCatId('Dessert'), name: 'Crème Brûlée', description: 'Crème brûlée à la vanille', price: 35, images: ['/images/img11.png'] },
            { category_id: getCatId('Dessert'), name: 'Moelleux au Chocolat', description: 'Gâteau fondant au chocolat, cœur coulant', price: 40, images: ['/images/img11.png'] },
            { category_id: getCatId('Dessert'), name: 'Cornes de Gazelle', description: 'Pâtisseries marocaines aux amandes', price: 30, images: ['/images/img11.png'] },

            // Extras
            { category_id: getCatId('Extras'), name: 'Frites Maison', description: 'Frites fraîches croustillantes', price: 20, images: [] },
            { category_id: getCatId('Extras'), name: 'Sauce Supplémentaire', description: 'Sauce au choix : blanche, algérienne, BBQ, harissa', price: 5, images: [] },
            { category_id: getCatId('Extras'), name: 'Supplément Fromage', description: 'Fromage fondu supplémentaire', price: 8, images: [] },
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
