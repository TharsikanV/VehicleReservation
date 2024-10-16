import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '@asgardeo/auth-react';

const ReservationForm = () => {
    const { getAccessToken } = useAuthContext();
    const [token, setToken] = useState('');

    const [formData, setFormData] = useState({
        date: '',
        time: '10 AM',
        location: '',
        vehicle_no: '',
        mileage: '',
        message: ''
    });

    useEffect(() => {
        const fetchToken = async () => {
            const accessToken = await getAccessToken();
            setToken(accessToken);
        };
        fetchToken();
    }, [getAccessToken]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        try {
            await axios.post('http://localhost:8000/api/reserve', formData, config,{ withCredentials: true });
            alert('Reservation created successfully!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Service Date:
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </label>
            <label>
                Preferred Time:
                <select name="time" value={formData.time} onChange={handleChange}>
                    <option value="10 AM">10 AM</option>
                    <option value="11 AM">11 AM</option>
                    <option value="12 PM">12 PM</option>
                </select>
            </label>
            <label>
                Location:
                <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </label>
            <label>
                Vehicle Registration Number:
                <input type="text" name="vehicle_no" value={formData.vehicle_no} onChange={handleChange} required />
            </label>
            <label>
                Current Mileage:
                <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} required />
            </label>
            <label>
                Message:
                <textarea name="message" value={formData.message} onChange={handleChange} required></textarea>
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ReservationForm;
