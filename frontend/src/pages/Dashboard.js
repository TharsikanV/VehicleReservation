import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationForm from '../components/ReservationForm';
import { useAuthContext } from '@asgardeo/auth-react';

const Dashboard = () => {
    const { getAccessToken, state, getIDToken } = useAuthContext();
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        const token = await getAccessToken();
        const IDtoken = await getIDToken();
        console.log(token);
        console.log(IDtoken);
        const config = {
            headers: { Authorization: `Bearer ${IDtoken}` }
        };
        const response = await axios.get('http://localhost:8000/api/reservations',{
            params: {
                username: state?.username
            }
        }, { withCredentials: true });
        setReservations(response.data);
    };
    useEffect(() => {
        fetchReservations();
    }, []);

    const deleteReservation = async (id) => {
        await axios.delete(`http://localhost:8000/api/reservations/${id}`, {
            params: {
                username: state?.username
            }
        }, { withCredentials: true });
        setReservations(reservations.filter(reservation => reservation.booking_id !== id));
    };

    return (
        <div className="container mx-auto p-6 flex">
            <ReservationForm fetchReservations={fetchReservations}/>
            {reservations && reservations.length > 0 && (
                <div className="space-x-5">
                    <h2 className="text-2xl font-bold mb-4">Your Reservations</h2>
                    <ul className="mt-4 space-y-4">
                        {reservations.map((reservation) => (
                            <li key={reservation.booking_id} className="bg-white shadow-md rounded-lg p-4">
                                <p className="font-semibold">
                                    Service Date: <span className="font-normal">{reservation.date}</span>
                                </p>
                                <p className="font-semibold">
                                    Location: <span className="font-normal">{reservation.location}</span>
                                </p>
                                <p className="font-semibold">
                                    Vehicle No: <span className="font-normal">{reservation.vehicle_no}</span>
                                </p>
                                <p className="font-semibold">
                                    Mileage: <span className="font-normal">{reservation.mileage}</span>
                                </p>
                                <p className="font-semibold">
                                    Message: <span className="font-normal">{reservation.message}</span>
                                </p>
                                <button
                                    onClick={() => deleteReservation(reservation.booking_id)}
                                    className="mt-2 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
