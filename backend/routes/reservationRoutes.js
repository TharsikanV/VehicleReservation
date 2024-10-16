const express = require('express');
const { createReservation, getReservations, deleteReservation } = require('../controllers/reservationController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/reserve', createReservation);
router.get('/reservations', authenticate, getReservations);
router.delete('/reservations/:id', authenticate, deleteReservation);

module.exports = router;
