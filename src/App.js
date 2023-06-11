import React from "react";
import './App.css'
import WebFont from 'webfontloader';
import { useEffect } from "react";
import {Link} from 'react-router-dom'

const App = () => {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Barlow', 'Bebas+Neue', 'Londrina+Solid']
      }
    });
   }, []);

  return (
    <>
    <section>
        <div>
            <h1>Teknolojik Yemekler</h1>
            <h2>KOD ACIKTIRIR</h2>
            <h2>PİZZA, DOYURUR</h2>
            <Link to = "/siparis">
            ACIKTIM
            </Link>
        </div>
    </section>
    </>
  );
};
export default App;
