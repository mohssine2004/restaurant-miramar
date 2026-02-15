const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const categoryRoutes = require('./src/routes/categoryRoutes');
const productRoutes = require('./src/routes/productRoutes');
const reservationRoutes = require('./src/routes/reservationRoutes');
const orderRoutes = require('./src/routes/orderRoutes');

app.get('/', (req, res) => {
    res.send('Welcome to Miramar Restaurant Backend!');
});

app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
