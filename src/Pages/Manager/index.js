import React from 'react'
import { BrowserRouter, Link, Route, useRouteMatch } from 'react-router-dom'
import AddCustomer from './AddCustomer'
import Customers from './Customers'
import OpenAccount from './OpenAccount'

export default function Manager() {
    let { path, url } = useRouteMatch();
    return (
        <div>
                <div className="btn-group mt-5" role="group" aria-label="Basic example">
                    <Link to={`${url}/add-customer`}><button type="button" className="btn btn-secondary mr-1">Add Customer</button></Link>
                    <Link to={`${url}/open-account`}><button type="button" className="btn btn-secondary  mr-1">Open Account</button></Link>
                    <Link to={`${url}/customers`}><button type="button" className="btn btn-secondary">Customers</button></Link>
                </div>
                <Route exact path={`${path}/add-customer`} component={AddCustomer} />
                <Route exact path={`${path}/open-account`} component={OpenAccount} />
                <Route exact path={`${path}/customers`} component={Customers} />
        </div>
    )
}
