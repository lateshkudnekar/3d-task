import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { AuthContext } from '../../Context/authContext'
import { Route, useHistory } from "react-router-dom"

export default function CustomerLogin() {
    const [customer, setCustomer] = useState("")
    const [validated, setValidated] = useState(false)
    const [customers, setCustomers] = useState([])
    const { authState, authActions } = React.useContext(AuthContext);
    let history = useHistory();
    useEffect(() => {
        if(authState.user) {
            history.replace("/dashboard")
        } 
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
         
            authActions.authStateChanged({...customers.find(c => c.id ==customer)}); 
            console.log(authState);
            history.replace("/dashboard")
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
                
                <Button type="submit">Login</Button>
            </Form>

    </div>
    )
}
