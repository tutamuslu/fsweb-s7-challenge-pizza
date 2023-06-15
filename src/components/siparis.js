import React from "react";
import './siparis.css';
import WebFont from 'webfontloader';
import { useEffect } from "react";
import MyForm from "./Form";

export default function Siparis() {

    const malzemeler = [
        { name: "misir", title: "Mısır", secim: false },
        { name: "sucuk", title: "Sucuk", secim: false },
        { name: "peynir", title: "Peynir", secim: false },
        { name: "sosis", title: "Sosis", secim: false },
        { name: "salam", title: "Salam", secim: false },
        { name: "zeytin", title: "Zeytin", secim: false },
        { name: "mantar", title: "Mantar", secim: false },
        { name: "biber", title: "Biber", secim: false },
        { name: "domat", title: "Domates", secim: false }
    ]

    const urun = {
        isim: "Position Absolute Acı Pizza",
        fiyat: 85.50,
        puan: 4.9,
        degerlendirmeSayisi: 200,
        urunAciklama: "Frontent Dev olarak hala position:absolute kullanıyorsan bu çok acı pizza tam sana göre. Pizza, domates, peynir ve genellikle çeşitli diğer malzemelerle kaplanmış, daha sonra geleneksel olarak odun ateşinde bir fırında yüksek sıcaklıkta pişirilen, genellikle yuvarlak, düzleştirilmiş mayalı buğday bazlı hamurdan oluşan İtalyan kökenli lezzetli bir yemektir. . Küçük bir pizzaya bazen pizzetta denir"
    }

    useEffect(() => {
        WebFont.load({
            google: {
                families: ['Barlow', 'Bebas+Neue', 'Londrina+Solid']
            }
        });
    }, []);

    useEffect(() => {
        document.querySelector('body').style.background = '#FFF';
    }, []);

    return (
        <div id="siparis">
            <div className="ust">
                <div className="ust-icerik">
                    <h1>Teknolojik Yemekler</h1>
                    <p>
                        Anasayfa - Seçenekler - <span> Sipariş Oluştur </span>
                    </p>
                </div>
            </div>
            <div className="icerik">
                <h2>{urun.isim}</h2>
                <div className="bilgi">
                    <h3>{urun.fiyat}₺</h3>
                    <h4>{urun.puan}</h4>
                    <h5>({urun.degerlendirmeSayisi})</h5>
                </div>
                <p>
                    {urun.urunAciklama}
                </p>
                <MyForm malzemeler={malzemeler} urun={urun} />
            </div>
        </div>
    );
}