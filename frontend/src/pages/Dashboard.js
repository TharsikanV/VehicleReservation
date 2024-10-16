import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationForm from '../components/ReservationForm';
import { useAuthContext } from '@asgardeo/auth-react';

const Dashboard = () => {
    const { getAccessToken } = useAuthContext();
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchReservations = async () => {
            const token = await getAccessToken();
            console.log(token)
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };
            const response = await axios.get('http://localhost:8000/api/reservations', config,{ withCredentials: true });
            setReservations(response.data);
        };
        fetchReservations();
    }, [getAccessToken]);

    const deleteReservation = async (id) => {
        const token = await getAccessToken();
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        await axios.delete(`http://localhost:8000/api/reservations/${id}`, config);
        setReservations(reservations.filter(reservation => reservation.booking_id !== id));
    };

    return (
        <div>
            <ReservationForm />
            <h2>Your Reservations</h2>
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.booking_id}>
                        <p>Service Date: {reservation.date}</p>
                        <p>Location: {reservation.location}</p>
                        <p>Vehicle No: {reservation.vehicle_no}</p>
                        <p>Mileage: {reservation.mileage}</p>
                        <p>Message: {reservation.message}</p>
                        <button onClick={() => deleteReservation(reservation.booking_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
