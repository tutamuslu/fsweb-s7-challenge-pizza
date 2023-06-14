import React from "react";
import './siparis-onay.css';
import WebFont from 'webfontloader';
import { useEffect } from "react";

export default function SiparisOnay() {

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Bebas+Neue', 'Londrina+Solid']
            }
        });
    }, []);

    useEffect(() => {
        document.querySelector('body').style.background = '#CE2829';
    }, []);

    return (
        <div id="siparis-onay">
            <div id="onay">
                <h1>Teknolojik Yemekler</h1>
                <h2>TEBRIKLER!</h2>
                <h2>SİPARİŞİNİZ ALINDI!</h2>
            </div>
        </div>
    );
}