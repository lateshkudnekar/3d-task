import { BrowserRouter, Link, Route, useRouteMatch } from 'react-router-dom'
import Deposit from './Deposit'
import Transactions from './Transactions'
import Withdraw from './Withdraw'
import React, { useEffect, useState } from 'react'
import { AuthContext } from '../../../Context/authContext';
import useCheckLogin from '../../../Hooks/useCheckLogin'
import { Form } from 'react-bootstrap'

export default  function Dashboard() {
    const { authState = {}, authActions } = React.useContext(AuthContext);
    const [customer, setCustomer] = useState({})
    const [defaultAccS, setDefaultAcc] = useState("")
     useCheckLogin();
    useEffect(() => {
        if (authState.user) {
            let customers = window.localStorage.getItem('customers') || "[]";
            customers = JSON.parse(customers)
            let loggedInCus = customers.find(c => c.id == authState.user.id) || {}
            setCustomer(loggedInCus)
            setDefaultAcc(loggedInCus?.accounts[0]?.accountId?.substr(0,4))
            if(!authState?.user?.defaultAcc)
                authActions.setDefaultAccount(loggedInCus?.accounts[0])
        }
    }, [])

    const setDefaultAccount = (acc) => {
        let c = customer?.accounts?.find(account => account.accountId == acc)
        setDefaultAcc(acc)
        authActions.setDefaultAccount(c)

    }

    let { path, url } = useRouteMatch();
    let { accounts = [] } = customer;
    let {  defaultAccount={} } = authState?.user || {}
    let { accountId="0", transactions=[],currency="",balance=0} = defaultAccount
    console.log(defaultAccount);
    return (
        <>
            <h1 className="mt-3">Welcome {authState?.user?.firstName + ' ' + authState?.user?.lastName}</h1>
            <div class={"form-container"}>
                <div className="mt-3 flex col align-center">
                    <Form>
                        <Form.Group controlId="exampleForm.CUSTOMER">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control as="select" onChange={(e) => setDefaultAccount(e.target.value)} value={defaultAccS} required >
                                {accounts.map(c => <option value={c.accountId}>{c.accountId.substr(0, 4)}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                    <div className="mt-2 flex">
                        <span className="mr-1">Account Nos: {accountId.substr(0,4)}</span>
                        <span className="mr-1">Balance: {balance || 0}</span>
                        <span className="mr-1">Currency: {currency || 0}</span>
                    </div>
                </div>
            </div>
                <div className="btn-group mt-1" role="group" aria-label="Basic example">
                    <Link to={`${url}/transactions`}><button type="button" className="btn btn-secondary mr-1">Transactions</button></Link>
                    <Link to={`${url}/withdraw`}><button type="button" className="btn btn-secondary  mr-1">Withdraw</button></Link>
                    <Link to={`${url}/deposit`}><button type="button" className="btn btn-secondary">Deposit</button></Link>
                </div>
                <Route exact path={`${path}/transactions`} component={Transactions} />
                <Route exact path={`${path}/withdraw`} component={Withdraw} />
                <Route exact path={`${path}/deposit`} component={Deposit} />
        </>
    )
}
