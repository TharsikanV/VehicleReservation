import React, { useEffect, useState } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import Dashboard from './pages/Dashboard';

const App = () => {
    const { signIn, signOut, state, getDecodedIDToken } = useAuthContext();
    const [userProfile, setUserProfile] = useState({
        username: "",
        name: "",
        email: "",
        country: "",
        phone: ""
    });
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    const fetchUserProfile = async () => {
        const user = await getDecodedIDToken();
        setUserProfile({
            username: user.username,
            name: user.org_name,
            email: user.email,
            country: user.address?.country,
            phone: user.phone_number
        });
    };

    useEffect(() => {
        if (state?.isAuthenticated) {
            fetchUserProfile();
        }
    }, [state]);

    const togglePopup = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 relative">
            <h1 className="text-3xl font-bold mt-10">Vehicle Service Reservation</h1>

            {!state?.isAuthenticated ? (
                <>
                    <p className="text-lg text-center max-w-xl mx-auto text-gray-800 mt-10">
                        Welcome to Vehicle Service Reservation – your one-stop solution for hassle-free vehicle service reservations! Book, manage, and track your vehicle’s maintenance appointments effortlessly and keep your car in top shape with just a few clicks.
                    </p>
                    <button
                        onClick={() => signIn()}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition my-10 mt-10"
                    >
                        Login with Asgardeo
                    </button>
                    <p className="text-md text-center text-gray-700 mt-4">
                        Don't have an account?
                    </p>
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition mt-5">
                        <a href='https://asgardeo.io/signup'>Create Asgardeo Account</a>
                    </button>
                </>

            ) : (
                <>
                    <button onClick={togglePopup} className="bg-gray-300 text-black py-2 px-4 mt-4 rounded-lg shadow hover:bg-gray-400 transition">
                        Profile
                    </button>
                    {isPopupVisible && (
                        <div className="absolute z-10 top-16 right-1/2 transform translate-x-1/2 bg-blue-100 p-5 rounded-lg shadow-lg w-80 mt-20">
                            <h2 className="text-xl font-semibold">User Info</h2>
                            <p className="text-lg">Welcome, {userProfile.name}!</p>
                            <p className="text-lg">User: {userProfile.username}</p>
                            <p className="text-lg">Email: {userProfile.email}</p>
                            <p className="text-lg">Phone: {userProfile.phone}</p>
                            <p className="text-lg">Country: {userProfile.country}</p>
                            <button
                                onClick={() => signOut()}
                                className="bg-red-600 text-white py-2 px-4 rounded-lg shadow hover:bg-red-700 transition mt-4"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                    <Dashboard />
                </>
            )}
        </div>
    );
};

export default App;

