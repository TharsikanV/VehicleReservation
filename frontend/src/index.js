import React from 'react';
import ReactDOM from 'react-dom';
// import { AsgardeoAuthProvider } from '@asgardeo/auth-react';
import { AuthProvider } from "@asgardeo/auth-react";
import './index.css'; // Ensure this line is present
import App from './App';

const authConfig = {
  // clientID: process.env.REACT_APP_ASGARDEO_CLIENT_ID,
  // baseUrl: process.env.REACT_APP_ASGARDEO_BASE_URL,
  // signInRedirectURL: process.env.REACT_APP_ASGARDEO_REDIRECT_URL,
  // signOutRedirectURL: process.env.REACT_APP_ASGARDEO_REDIRECT_URL,
  clientID:"8ucfZTonbiKk0eaIcfNTW4BsWCoa",
  baseUrl:"https://api.asgardeo.io/t/tharsikan",
  signInRedirectURL:"http://localhost:3000/",
  signOutRedirectURL:"http://localhost:3000/",
  scope: [ "openid", "profile","email","address","phone"]

};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>,
  </React.StrictMode>

);

