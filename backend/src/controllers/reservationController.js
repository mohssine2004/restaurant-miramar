const { Reservation } = require('../../models');

const createReservation = async (req, res) => {
    try {
        const { name, phone, reservation_date, reservation_time, number_of_people } = req.body;

        // Basic validation
        if (!name || !phone || !reservation_date || !reservation_time || !number_of_people) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newReservation = await Reservation.create({
            name,
            phone,
            reservation_date,
            reservation_time,
            number_of_people
        });

        res.status(201).json(newReservation);
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createReservation
};
