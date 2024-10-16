// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
// //
// export default App;
import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
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
