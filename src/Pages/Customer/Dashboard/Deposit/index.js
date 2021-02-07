import { Button,Form } from 'react-bootstrap'
import React, { useState } from 'react'
import useCheckLogin from '../../../../Hooks/useCheckLogin'
import { AuthContext } from '../../../../Context/authContext'
import { useAlert } from 'react-alert'
export default function Deposit() {
    const alert = useAlert()
    useCheckLogin()
    const [amount, setAmount] = useState("")
    const [validated, setValidated] = useState(false)
    const { authState = {}, authActions } = React.useContext(AuthContext);
    let { user } = authState
    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true)
            return
        } else {
            let {defaultAccount} = user

            let transaction = {
                datetime:new Date().toISOString(),
                type:"Debit",
                amount:amount
            }
            let {balance=0} = defaultAccount
            defaultAccount.transactions.push(transaction)
            defaultAccount.balance = parseFloat(balance) + parseFloat(amount)
            user.accounts = user.accounts.map(a => {
                if(a.accountId == defaultAccount.accountId) {
                    a = defaultAccount
                }
                return a
            })
            let customers = window.localStorage.getItem('customers');
            customers = JSON.parse(customers).map(c => {
                if(c.id == user.id) {
                    c = user
                }
                return c;
            })
            console.log("user>",user);
            window.localStorage.setItem('customers',JSON.stringify(customers));
            authActions.setDefaultAccount(defaultAccount)
            alert.show('Deposit Succesfull!!')
        }
    }
    return (
        <div className={"form-container"}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group >
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control  type="number" onChange={(e) => setAmount(e.target.value)} value={amount} min={1} required />
                </Form.Group>
                
                <Button type="submit">Process</Button>
            </Form>
        </div>
    )
}
