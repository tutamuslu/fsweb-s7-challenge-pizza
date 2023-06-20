import React from "react";
import './App.css'
import WebFont from 'webfontloader';
import { useEffect } from "react";
import { Link } from 'react-router-dom'

const App = () => {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Barlow', 'Quattrocento', 'Satisfy']
      }
    });
  }, []);

  return (
    <>
      <section>
        <div id="anasayfa-icerik">
          <h1>Teknolojik Yemekler</h1>
          <h2>KOD ACIKTIRIR</h2>
          <h2>PİZZA, DOYURUR</h2>
          <Link id="order-pizza" to="/pizza">
            ACIKTIM
          </Link>
        </div>
      </section>
    </>
  );
};
export default App;
