import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, FormFeedback, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import * as Yup from "yup";
import './Form.css';

const MyForm = (props) => {

    const { malzemeler, urun } = props;

    const bosData = {
        isim: "",
        boyut: "",
        hamurSecimi: "",
        malzemeler: malzemeler,
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
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [valid, setValid] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const formSchema = Yup.object().shape({
        isim: Yup.string().required("İsim boş bırakılamaz!").min(5, "İsim Soyisim minimum 5 karakter olmalı!"),
        boyut: Yup.string().required("Pizza boyutunu seçmelisin!"),
        hamurSecimi: Yup.string().required("Hamur seçimi yapmalısınız!"),
        not: Yup.string()
    });

    const onSizeSelected = (size) => {
        formData.hamurSecimi = size;
        setFormData({ ...formData });
    }

    const malzemeAdet = () => {
        let count = 0;
        formData.malzemeler.forEach(m => {
            if (m.secim === true) {
                count++;
            }
        })
        return count;
    }

    const inputCheckboxHandler = (e) => {
        const { name, checked } = e.target;
        formData.malzemeler.find(x => x.name === name).secim = checked;
        setFormData({ ...formData })
        if (malzemeAdet() > 5) {
            errors.malzemeler = "En fazla 5 malzeme seçebilirsiz";
            setFormErrors({ ...errors })
        } else {
            errors.malzemeler = "";
            setFormErrors({ ...errors })
        }
        console.log(errors)
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

        formData[name] = value;
        setFormData({ ...formData });
    }

    const azalt = (e) => {
        e.preventDefault();
        if (formData.adet > 1) {
            formData.adet--;
            setFormData({ ...formData })
        }
    }

    const arttir = (e) => {
        e.preventDefault();
        formData.adet++;
        setFormData({ ...formData })
    }

    const toplam = () => {
        const ekmalzeme = malzemeAdet() * 5;
        const urunFiyat = urun.fiyat + ekmalzeme;
        return urunFiyat * formData.adet;
    }

    useEffect(() => {
        formSchema.isValid(formData).then((vld) => {
            console.log(malzemeAdet())
            setValid(vld && malzemeAdet() < 6)
        });
    }, [formData]);

    return (
        <Form id='pizza-form'>
            <FormGroup className='pizza-boyut'>
                <FormGroup>
                    <Label for='pizza-boyut'>Boyut Seç <span>*</span></Label>
                    <FormGroup check>
                        <Label check><Input type="radio" id='kucuk' name="boyut" onClick={() => { handleChange("boyut", "Küçük") }} /> Küçük</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check> <Input type="radio" id='orta' name="boyut" onClick={() => { handleChange("boyut", "Orta") }} /> Orta</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check><Input type="radio" id='buyuk' name="boyut" onClick={() => { handleChange("boyut", "Büyük") }} /> Büyük</Label>
                    </FormGroup>
                    <FormFeedback>{errors.boyut}</FormFeedback>
                </FormGroup>
                <FormGroup className='pizza-kalinlik'>
                    <Label for='size-dropdown'>Hamur Seç<span>*</span></Label>
                    <Dropdown id='size-dropdown' isOpen={dropdownOpen} toggle={toggle} value={formData.hamurSecimi}>
                        <DropdownToggle name="secim" caret>Seçim {formData.hamurSecimi}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem name="ince" onClick={() => { onSizeSelected("İnce") }}>İnce</DropdownItem>
                            <DropdownItem name="normal" onClick={() => { onSizeSelected("Normal") }}>Normal</DropdownItem>
                            <DropdownItem name="kalin" onClick={() => { onSizeSelected("Kalın") }}>Kalın</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <FormFeedback>{errors.hamurSecimi}</FormFeedback>
                </FormGroup>
            </FormGroup>
            <h3 className='ek-baslik'>Ek Malzemeler</h3>
            <p>En fazla 5 malzeme seçebilirsiniz. 5₺</p>
            <FormGroup id='ek-malzemeler'>
                {
                    formData.malzemeler.map(malzeme => (
                        <FormGroup key={malzeme.name} className='malzeme'>
                            <Input
                                id={malzeme.name}
                                type="checkbox"
                                name={malzeme.name}
                                value={malzeme.secim}
                                onChange={inputCheckboxHandler}
                            />
                            <Label style={{ "marginLeft": "10px" }}>
                                {malzeme.title}
                            </Label>
                        </FormGroup>
                    ))
                }
                <FormFeedback aria-invalid={!!errors.malzemeler}>{errors.malzemeler}</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="name-input">
                    İsim Soyisim
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
                    <Link to="/siparis-onay"> <Button id='siparis-ver' disabled={!valid}>SİPARİŞ VER </Button></Link>

                </FormGroup>
            </div>
        </Form>
    );
}

export default MyForm