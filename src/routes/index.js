import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from '../Components/Header'
import Home from '../Pages'
import CustomerLogin from '../Pages/Customer'
import Dashboard from '../Pages/Customer/Dashboard'
import Manager from '../Pages/Manager'
import AddCustomer from '../Pages/Manager/AddCustomer'
import Customers from '../Pages/Manager/Customers'
import OpenAccount from '../Pages/Manager/OpenAccount'

export default function Routes(props) {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route  path="/customer" component={CustomerLogin}/>
                     <Route path={`/dashboard`} component={Dashboard} />
                    <Route  path="/manager" component={Manager}/>
                </Switch>
            </BrowserRouter>
        </>
    )
}
