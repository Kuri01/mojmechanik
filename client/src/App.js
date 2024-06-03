// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Account from './components/Account/Account';
import Search from './components/Search';
import MyReservations from './components/MyReservations/MyReservations';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/home' element={<Home />}>
                    <Route index path='' element={<Search />} />
                    <Route path='account' element={<Account />} />
                    <Route path='my-reservations' element={<MyReservations />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
