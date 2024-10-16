// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
// import { AsgardeoAuthProvider } from '@asgardeo/auth-react';
import { AuthProvider } from "@asgardeo/auth-react";
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
  scope: [ "openid", "profile"]

};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <App />
    </AuthProvider>,
  </React.StrictMode>

);

