import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Error from "../Pages/Error/Error";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
