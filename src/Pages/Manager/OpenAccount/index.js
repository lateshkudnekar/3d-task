import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import uuid from 'react-uuid'
import { useAlert } from "react-alert";
export default function OpenAccount() {
    let alert = useAlert()
    const [customer, setCustomer] = useState("")
    const [currency, setCurrency] = useState("")
    const [validated, setValidated] = useState(false)
    const [customers, setCustomers] = useState([])
    useEffect(() => {
        let customers = window.localStorage.getItem('customers')|| "[]";
        customers = JSON.parse(customers)
        setCustomers(customers)
    }, [])

   
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true)
            return
        } else {
            setValidated(false)
            let cusObj = await customers.map((c) => {
                if(c.id == customer) {
                    if(c.accounts) {
                        c.accounts.push({
                            currency,
                            transactions:[],
                            accountId:uuid()
                        })
                    } else {
                        c.accounts = []
                        c.accounts.push({
                            currency,
                            transactions:[],
                            accountId:uuid()
                        })
                    }
                }
                return c
            })
           window.localStorage.setItem('customers',JSON.stringify(cusObj))
           setCustomer("")
           setCurrency("")
           alert.show("Created new account!")

        }
    }
    return (
        <div className="form-container">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.CUSTOMER">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control  as="select" onChange={(e) => setCustomer(e.target.value)} value={customer} required >
                        <option value="">Select Customer</option>
                        {customers.map(c=> <option value={c.id}>{c.firstName}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="exampleForm.CURRENCY">
                    <Form.Label>Currency</Form.Label>
                    <Form.Control as="select" required  onChange={(e) => setCurrency(e.target.value)} value={currency} >
                        <option value="">Select curreny</option>
                        <option value="INR">INR</option>
                        <option value="USD">USD</option>
                    </Form.Control>
                </Form.Group>
                <Button type="submit">Add Customer</Button>
            </Form>
        </div>
    )
}
