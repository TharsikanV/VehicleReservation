import React from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import Dashboard from './pages/Dashboard';

const App = () => {
    const { signIn, signOut, state } = useAuthContext();

    return (
        <div className="App min-h-screen flex flex-col items-center justify-center bg-gray-100" style={{
            backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/back_our/20190617/ourmid/pngtree-cute-children-s-drawing-style-car-rental-poster-board-vector-background-image_128984.jpg')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            minHeight: '100vh' 
        }}>
            <h1 className="text-4xl font-bold mb-6">Vehicle Service Reservation</h1>
            
            {!state?.isAuthenticated ? (
                <button 
                    onClick={() => signIn()} 
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                >
                    Login
                </button>
            ) : (
                <div className="text-center">
                    <p className="text-xl font-medium mb-4">Welcome, {state?.username}!</p>
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
