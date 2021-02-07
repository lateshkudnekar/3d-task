import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, useLocation, useRouteMatch } from 'react-router-dom'

import AddCustomer from './AddCustomer'
import Customers from './Customers'
import OpenAccount from './OpenAccount'

export default function Manager() {
    const [activePath, setActivePath] = useState("")
    let location = useLocation()

    let { path, url } = useRouteMatch();
    useEffect(() => {
        setActivePath(location.pathname)
    }, [location])
    return (
        <div>
                <div className="btn-group mt-5" role="group" aria-label="Basic example">
                    <Link to={`${url}/add-customer`}><button type="button" className={`btn  mr-1 ${activePath.includes("add-customer")? "btn-primary":"btn-secondary"}`}>Add Customer</button></Link>
                    <Link to={`${url}/open-account`}><button type="button" className={`btn  mr-1 ${activePath.includes("open-account")? "btn-primary":"btn-secondary"}`}>Open Account</button></Link>
                    <Link to={`${url}/customers`}><button type="button" className={`btn ${activePath.includes("customers")? "btn-primary":"btn-secondary"}`}>Customers</button></Link>
                </div>
                <Route exact path={`${path}/add-customer`} component={AddCustomer} />
                <Route exact path={`${path}/open-account`} component={OpenAccount} />
                <Route exact path={`${path}/customers`} component={Customers} />
        </div>
    )
}
