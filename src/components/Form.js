import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import * as Yup from "yup";
import './Form.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const MyForm = (props) => {

    const navigate = useNavigate();

    const { malzemeler, urun } = props;

    const bosData = {
        isim: "",
        boyut: "",
        hamurSecimi: "",
        malzemeler: [],
        not: "",
        adet: 1
    }

    const formErrors = {
        isim: "",
        boyut: "",
        hamurSecimi: "",
        malzemeler: ""
    }

    const [formData, setFormData] = useState(bosData)
    const [errors, setFormErrors] = useState(formErrors)
    const [valid, setValid] = useState(false);

    // dropdown için
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const formSchema = Yup.object().shape({
        isim: Yup.string().required("İsim boş bırakılamaz!").min(5, "İsim Soyisim minimum 5 karakter olmalı!"),
        boyut: Yup.string().required("Pizza boyutunu seçmelisin!"),
        hamurSecimi: Yup.string().required("Hamur seçimi yapmalısınız!"),
        malzemeler: Yup.array().max(5, "En fazla 5 tane ek malzeme seçebilirsin!"),
        not: Yup.string()
    });

    const malzemeAdet = () => {
        return formData.malzemeler.length;
    }

    const inputCheckboxHandler = (e) => {

        const { name } = e.target;

        let kopya = [...formData.malzemeler]

        if (kopya.find(x => x.name === name) != null) {
            kopya = kopya.filter(x => x.name !== name)
        }
        else {
            kopya.push(malzemeler.find(x => x.name === name))
        }

        // input change ile birlikte yup validasyon yapsın
        handleChange("malzemeler", kopya);

    }

    // axios isteğinden sonra sipariş onaya geçeriz
    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("https://620d69fb20ac3a4eedc05e3a.mockapi.io/api/products", formData)
        .then(r => {
            // sipariş bilgileri
            console.log(r.data)
            navigate("/siparis-onay")
        })
    }

    const handleChange = (name, value) => {
        Yup.reach(formSchema, name)
            .validate(value)
            .then(() => {
                setFormErrors({ ...errors, [name]: "" });
            })
            .catch((err) => {
                setFormErrors({ ...errors, [name]: err.errors[0] });
            });

        setFormData({ ...formData, [name]: value });
    }

    const azalt = (e) => {
        e.preventDefault();
        if (formData.adet > 1) {
            setFormData({ ...formData, ["adet"]: formData.adet - 1 })
        }
    }

    const arttir = (e) => {
        e.preventDefault();
        setFormData({ ...formData, ["adet"]: formData.adet + 1 })
    }

    const toplam = () => {
        const ekmalzeme = malzemeAdet() * 5;
        const urunFiyat = urun.fiyat + ekmalzeme;
        return urunFiyat * formData.adet;
    }

    useEffect(() => {
        formSchema.isValid(formData).then((vld) => {
            setValid(vld && malzemeAdet() < 6)
        });
    }, [formData]);

    return (
        <Form id='pizza-form' onSubmit={onSubmit} action='/siparis-onay'>
            <FormGroup className='pizza-boyut'>
                <FormGroup>
                    <Label for='pizza-boyut'>Boyut Seç <span>*</span></Label>
                    <FormGroup check>
                        <Label check><Input type="radio" id='kucuk' name="boyut" invalid={!!errors.boyut} onClick={() => { handleChange("boyut", "Küçük") }} /> Küçük</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check> <Input type="radio" id='orta' name="boyut" invalid={!!errors.boyut} onClick={() => { handleChange("boyut", "Orta") }} /> Orta</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check><Input type="radio" id='buyuk' name="boyut" invalid={!!errors.boyut} onClick={() => { handleChange("boyut", "Büyük") }} /> Büyük</Label>
                    </FormGroup>
                    <FormFeedback>{errors.boyut}</FormFeedback>
                </FormGroup>
                <FormGroup className='pizza-kalinlik'>
                    <Label for='size-dropdown'>Hamur Seç<span>*</span></Label>
                    <Dropdown id='size-dropdown' isOpen={dropdownOpen} toggle={toggle} value={formData.hamurSecimi}>
                        <DropdownToggle name="secim" caret>Seçim {formData.hamurSecimi}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name="ince" onClick={() => { handleChange("hamurSecimi", "İnce") }}>İnce</DropdownItem>
                            <DropdownItem name="normal" onClick={() => { handleChange("hamurSecimi", "Normal") }}>Normal</DropdownItem>
                            <DropdownItem name="kalin" onClick={() => { handleChange("hamurSecimi", "Kalın") }}>Kalın</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <FormFeedback>{errors.hamurSecimi}</FormFeedback>
                </FormGroup>
            </FormGroup>
            <h3 className='ek-baslik'>Ek Malzemeler</h3>
            <p>En fazla 5 malzeme seçebilirsiniz. 5₺</p>
            <FormGroup id='ek-malzemeler'>
                {
                    malzemeler.map(malzeme => (
                        <FormGroup key={malzeme.name} className='malzeme'>
                            <Input
                                id={malzeme.name}
                                type="checkbox"
                                name={malzeme.name}
                                value={malzeme.secim}
                                onChange={inputCheckboxHandler}
                                invalid={!!errors.malzemeler}
                            />
                            <Label style={{ "marginLeft": "10px" }}>
                                {malzeme.title}
                            </Label>
                        </FormGroup>
                    ))
                }
                <FormFeedback>{errors.malzemeler}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="name-input">
                    İsim Soyisim
                    <span> * </span>
                </Label>
                <Input
                    id="name-input"
                    name="name-input"
                    placeholder="İsim-Soyisim giriniz.."
                    type="text"
                    value={formData.isim}
                    onChange={(e) => { handleChange("isim", e.target.value) }}
                    invalid={!!errors.isim}
                />
                <FormFeedback>{errors.isim}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="not">
                    Sipariş Notu
                </Label>
                <Input
                    id="not"
                    name="not"
                    placeholder="Siparişinize eklemek istediğiniz bir not var mı?"
                    type="text"
                    value={formData.not}
                    onChange={(e) => { handleChange("not", e.target.value) }}
                />
            </FormGroup>
            <hr />
            <div id="siparis-ozet">
                <div id='siparis-adet'>
                    <Button id='azalt' onClick={azalt}>-</Button>
                    <Label>{formData.adet}</Label>
                    <Button id='arttir' onClick={arttir}>+</Button>
                </div>
                <FormGroup>
                    <div id="siparis-toplami">
                        <h2>Sipariş Toplamı</h2>
                        <div className='secimler'>
                            <h3>Seçimler</h3>
                            <h4>{malzemeAdet() * 5}.00₺</h4>
                        </div>
                        <div className='toplam'>
                            <h3>Toplam</h3>
                            <h4>{toplam()}₺</h4>
                        </div>
                    </div>
                    <Button id='siparis-ver' disabled={!valid}>SİPARİŞ VER </Button>

                </FormGroup>
            </div>
        </Form>
    );
}

export default MyForm