import React, { useState,useEffect } from 'react'
import { Modal, Button, Form, InputGroup, Col } from 'react-bootstrap';
import uuid from 'react-uuid'
export default function EditCustomerModal({ open, closeModal,customer,refresh }) {
    const [validated, setValidated] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [postCode, setPostCode] = useState("")
    useEffect(() => {
        setFirstName(customer.firstName) 
        setLastName(customer.lastName) 
        setPostCode(customer.postCode) 
       
    }, [customer])

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
                firstName,
                lastName,
                postCode
            }
            console.log(cusObj);
           let customers =  window.localStorage.getItem('customers') || "[]"
           customers = JSON.parse(customers)
           customers = customers.map(c => {
                if(c.id == customer.id) {
                    c = {...c, ...cusObj}
                }
               return c
           })
           window.localStorage.setItem('customers', JSON.stringify(customers))
           refresh(r => !r)
           closeModal()

        }
    };
    return (
        <Modal show={open} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    <Button className="mr-1" variant="secondary" onClick={closeModal}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                                Save Changes
                    </Button>
                </Form>
     
            </Modal.Body>
           
        </Modal>
    )
}
