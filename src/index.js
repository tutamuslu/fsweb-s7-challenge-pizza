import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Siparis from "./components/siparis";
import SiparisOnay from "./components/siparis-onay";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<App />} />
            <Route exact path="/siparis" element={<Siparis />} />
            <Route exact path="/siparis-onay" element={<SiparisOnay />} />
        </Routes>
    </BrowserRouter>
    , document.getElementById("root"));
