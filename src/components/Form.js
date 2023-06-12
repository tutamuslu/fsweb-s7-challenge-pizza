import React, { Component, useState, useEffect } from 'react';

import { Form, FormGroup, Label, Input, Button, FormFeedback, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from "reactstrap";
import * as Yup from "yup";
import './Form.css';
const MyForm = (props) => {
    // const bosData = {
    //     isim: "",
    //     boyut: "",
    //     malzeme1: false,
    //     malzeme2: false,
    //     özel: "",
    // }
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <Form id='pizza-form'>
            <FormGroup className='pizza-boyut'>
                <FormGroup>
                    <Label for='pizza-boyut'>Boyut Seç <span>*</span></Label>
                    <FormGroup check>
                        <Label check><Input type="radio" name="radio1" /> Küçük</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check> <Input type="radio" name="radio1" /> Orta</Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check><Input type="radio" name="radio1" /> Büyük</Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup className='pizza-kalinlik'>
                    {/* <Label>Hamur Seç<span>*</span></Label>
                    <Dropdown id='size-dropdown'>
                        <DropdownItem>İpince Hamur</DropdownItem>
                        <DropdownItem>İnce Hamur</DropdownItem>
                        <DropdownItem>Normal Hamur</DropdownItem>
                        <DropdownItem>Kalın Hamur</DropdownItem>
                    </Dropdown> */}
                    <Label for='size-dropdown'>Hamur Seç<span>*</span></Label>
                    <Dropdown id='size-dropdown' isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret>Hamur Kalınlığı</DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem>İnce</DropdownItem>
                            <DropdownItem>Normal</DropdownItem>
                            <DropdownItem>Kalın</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </FormGroup>
            </FormGroup>
        </Form>
    );
}

export default MyForm