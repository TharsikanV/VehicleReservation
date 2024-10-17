import React, { useEffect, useState } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import Dashboard from './pages/Dashboard';


const App = () => {
    const { signIn, signOut, state,getDecodedIDToken } = useAuthContext();
    const [userProfile,setUserProfile]=useState({
        username:"",
        name:"",
        email:"",
        country:"",
        phone:""
    });
    const fetchReservations = async () => {
        const user = await getDecodedIDToken();
        setUserProfile({
            username: user.username,
            name: user.org_name,
            email: user.email,
            country: user.address?.country,
            phone: user.phone_number
        })
        
    };
    useEffect(() => {
        if(state?.isAuthenticated){
            fetchReservations();
        }
        
        
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100" style={{
            backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/back_our/20190617/ourmid/pngtree-cute-children-s-drawing-style-car-rental-poster-board-vector-background-image_128984.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh'
        }}>
            <h1 className="text-4xl font-bold mb-6">Vehicle Service Reservation</h1>

            {!state?.isAuthenticated ? (
                <>
                <button
                    onClick={() => signIn()}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button> 
                <button
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200 mt-5"
                >
                    <a href='https://asgardeo.io/signup?visitor_id=671116c2ac9c26.96522686&utm_source=site&utm_medium=organic' >Register</a>
                </button> 
                </>
                       
                

            ) : (
                <div className="text-center">
                    <p className="text-xl font-medium mb-4">Welcome, {userProfile.name}!</p>
                    <p className="text-xl font-medium mb-4">User Name: {userProfile.username}</p>
                    <p className="text-xl font-medium mb-4">Email: {userProfile.email}</p>
                    <p className="text-xl font-medium mb-4">Phone Number: {userProfile.phone}</p>
                    <p className="text-xl font-medium mb-4">Country: {userProfile.country}</p>
                    <button
                        onClick={() => signOut()}
                        className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-red-700 transition duration-200 mb-4"
                    >
                        Logout
                    </button>
                    <Dashboard />
                </div>
            )}
        </div>
    );
};

export default App;
