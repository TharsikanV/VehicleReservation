const Reservation = require('../models/Reservation');

// Create a new reservation
exports.createReservation = async (req, res) => {
    try {
        const { date, time, location, vehicle_no, mileage, message,username} = req.body;
        // const username = req.user.username;

        const newReservation = await Reservation.create({
            date, time, location, vehicle_no, mileage, message, username
        });
        
        res.status(201).json(newReservation);
    } catch (error) {
        res.status(500).json({ error:error.message });
    }
};

// Get all reservations for authenticated user
exports.getReservations = async (req, res) => {
    const username=req.query.username;
    console.log(username);
    try {
        const reservations = await Reservation.findAll({
            where: { username: username }
        });
        res.status(200).json(reservations);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a reservation
exports.deleteReservation = async (req, res) => {
    console.log(req.query.username);
    try {
        const reservation = await Reservation.findOne({
            where: { booking_id: req.params.id, username: req.query.username }
        });

        if (!reservation) {
            return res.status(404).json({ error: 'Reservation not found' });
        }

        await reservation.destroy();
        res.status(200).json({ message: 'Reservation deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
