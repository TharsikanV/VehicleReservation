import React from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import Dashboard from './pages/Dashboard';

const App = () => {
    const { signIn, signOut, state } = useAuthContext();

    return (
        <div className="App">
            <h1>Vehicle Service Reservation</h1>
            
            {!state?.isAuthenticated ? (
                <button onClick={() => signIn()}>Login</button>
            ) : (
                <div>
                    <p>Welcome, {state?.username}!</p>
                    <button onClick={() => signOut()}>Logout</button>
                    <Dashboard />
                </div>
            )}
        </div>
    );
};

export default App;
