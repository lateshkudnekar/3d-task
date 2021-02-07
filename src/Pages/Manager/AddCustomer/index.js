import React, { useState } from 'react'
import './AddCustomer.css'
import { Button, Form, InputGroup, Col } from "react-bootstrap";
import uuid from 'react-uuid'
import { useAlert } from 'react-alert'

export default function AddCustomer() {
    let alert = useAlert()
    const [validated, setValidated] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [postCode, setPostCode] = useState("")
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true)
            return
        } else {
            setValidated(false)
            //save to local storage
            let cusObj = {
                id: uuid(),
                firstName,
                lastName,
                postCode
            }
           let customers =  window.localStorage.getItem('customers') || "[]"
           customers = JSON.parse(customers)
           customers.push(cusObj)
           window.localStorage.setItem('customers', JSON.stringify(customers))
           setFirstName("") 
           setLastName("") 
           setPostCode("") 
           alert.show("New Customer created!")
        }
    };
    return (
        <div className="form-container">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group md="12" controlId="validationCustom01">
                        <Form.Label>First name:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>

                </Form.Row>
                <Form.Row>
                    <Form.Group md="12" controlId="validationCustom02">
                        <Form.Label>Last name:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group md="12" controlId="validationCustom02">
                        <Form.Label>Post Code:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Post Code"
                            value={postCode}
                            onChange={(e) => setPostCode(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>
                <Button type="submit">Add Customer</Button>
            </Form>
        </div>
    )
}
