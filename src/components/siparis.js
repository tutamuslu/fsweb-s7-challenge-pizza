import React from "react";
import './siparis.css';
import WebFont from 'webfontloader';
import { useEffect } from "react";
import MyForm from "./Form";
export default function Siparis(props) {

    useEffect(() => {
        WebFont.load({
          google: {
            families: ['Barlow', 'Bebas+Neue', 'Londrina+Solid']
          }
        });
       }, []);

    return (
        <>
            <div className="ust">
                <div className="ust-icerik">
                    <h1>Teknolojik Yemekler</h1>
                    <p>
                        Anasayfa - Seçenekler - <span> Sipariş Oluştur </span>
                    </p>
                </div>
            </div>
            <div className="icerik">
                <h2>Position Absolute Acı Pizza</h2>
                <div className="bilgi">
                    <h3>85.50₺</h3>
                    <h4>4.9</h4>
                    <h5>(200)</h5>
                </div>
                <p>
                Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir
                </p>
                <MyForm/>
            </div>
        </>
    );
}