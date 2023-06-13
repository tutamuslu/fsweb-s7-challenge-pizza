import React, { Component, useState, useEffect } from 'react';

import { Form, FormGroup, Label, Input, Button, FormFeedback, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import * as Yup from "yup";
import './Form.css';
const MyForm = (props) => {

    const {malzemeler, handleSubmit} = props;

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
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const onSizeSelected = (size) => {
        console.log(size)
        formData.hamurSecimi = size;
        setFormData({ ...formData });
        console.log(formData);

    }

    const inputCheckboxHandler = (name) => {
        // const secilenAdet = formData.malzemeler.find(x => x.secim == true).length;
        if (true) {
            console.log(formData)
            formData.malzemeler.find(x => x.name == name).secim = true;
            setFormData({ ...formData })
        } else {
            errors.malzemeler = "En fazla 5 malzeme seçebilirsiz";
            setFormErrors({ ...errors })
        }
    }

    const handleChange = (name, value) => {
        formData[name] = value;
        setFormData({ ...formData });
        console.log(formData)
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

    return (
        <Form id='pizza-form'>
            <FormGroup className='pizza-boyut'>
                <FormGroup>
                    <Label for='pizza-boyut'>Boyut Seç <span>*</span></Label>
                    <FormGroup check>
                        <Label check><Input type="radio" name="radio1" onClick={() => { handleChange("boyut", "Küçük") }} /> Küçük</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check> <Input type="radio" name="radio1" onClick={() => { handleChange("boyut", "Orta") }} /> Orta</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check><Input type="radio" name="radio1" onClick={() => { handleChange("boyut", "Büyük") }} /> Büyük</Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup className='pizza-kalinlik'>
                    <Label for='size-dropdown'>Hamur Seç<span>*</span></Label>
                    <Dropdown id='size-dropdown' isOpen={dropdownOpen} toggle={toggle} value={formData.hamurSecimi}>
                        <DropdownToggle caret>Seçim {formData.hamurSecimi}</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => { onSizeSelected("İnce") }}>İnce</DropdownItem>
                            <DropdownItem onClick={() => { onSizeSelected("Normal") }}>Normal</DropdownItem>
                            <DropdownItem onClick={() => { onSizeSelected("Kalın") }}>Kalın</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </FormGroup>
            </FormGroup>
            <h3>Ek Malzemeler</h3>
            <p>En fazla 5 malzeme seçebilirsiniz. 5₺</p>
            <FormGroup id='ek-malzemeler'>
                {
                    malzemeler.map(malzeme => (
                        <FormGroup className='malzeme'>
                            <Input
                                id={malzeme.name}
                                type="checkbox"
                                name={malzeme.name}
                                value={malzeme.secim}
                                onChange={() => { inputCheckboxHandler(malzeme.name) }}
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
                    <Button onClick={azalt}>-</Button>
                    <Label>{formData.adet}</Label>
                    <Button onClick={arttir}>+</Button>
                </div>
                <FormGroup>
                    <div id="siparis-toplami">
                        <h2>Sipariş Toplamı</h2>
                        <div className='secimler'>
                            <h3>Seçimler</h3>
                            <h4>25.00₺</h4>
                        </div>
                        <div className='toplam'>
                            <h3>Toplam</h3>
                            <h4>110.50₺</h4>
                        </div>
                    </div>
                    <Button id='siparis-ver' onClick={(e) => {handleSubmit(e, formData)}}>SİPARİŞ VER </Button>

                </FormGroup>
            </div>

        </Form>
    );
}

export default MyForm