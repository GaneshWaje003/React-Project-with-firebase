import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes ,Route } from 'react-router-dom'
import Login from './Components/Pages/Login';
import Signup from './Components/Pages/Signup';
import Admin from './Components/Pages/Admin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>

            <Route path='/' element={<App/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Signup  />} />
            <Route path='/admin' element={<Admin  />} />

      </Routes>
    
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
