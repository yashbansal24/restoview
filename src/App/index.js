import React from 'react';
import './App.scss';
import Login from './signin/login';
import Signup from './signin/signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './layout';
import Home from "./home";
import useToken from './helpers';

export default function App(props) {
    const {token, setToken, logOut} = useToken();
    return <>
        <BrowserRouter>
            <Layout token={!!token} logOut={logOut}/>
            <Routes>
                <Route path="/" element={<Home token={token}/>} />
                <Route path="/signin">
                    <Route index element={<Login setToken={setToken}/>} />
                    <Route path="signup" element={<Signup setToken={setToken}/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    
    </>;
};