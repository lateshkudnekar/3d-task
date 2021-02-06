import { BrowserRouter, Link, Route, useRouteMatch } from 'react-router-dom'
import Deposit from './Deposit'
import Transactions from './Transactions'
import Withdraw from './Withdraw'
import React, { useEffect,useState } from 'react'
import { AuthContext } from '../../../Context/authContext';
import useCheckLogin from '../../../Hooks/useCheckLogin'

export default function Dashboard() {
    const { authState={}, authActions } = React.useContext(AuthContext);
    const [customer, setCustomer] = useState({})
    useCheckLogin()
    useEffect(() => {
        if(authState.user) {
            let customers = window.localStorage.getItem('customers')|| "[]";
            customers = JSON.parse(customers)
            setCustomer(customers.find(c => c.id == authState.user.id))
        }
    }, [])

    let { path, url } = useRouteMatch();

    return (
        <div>
            <h1>welcome {authState?.user?.firstName+' '+ authState?.user?.lastName}</h1>

                <div className="btn-group mt-5" role="group" aria-label="Basic example">
                    <Link to={`${url}/transactions`}><button type="button" className="btn btn-secondary mr-1">Transactions</button></Link>
                    <Link to={`${url}/withdraw`}><button type="button" className="btn btn-secondary  mr-1">Withdraw</button></Link>
                    <Link to={`${url}/deposit`}><button type="button" className="btn btn-secondary">Deposit</button></Link>
                </div>
                <Route exact path={`${path}/transactions`} component={Transactions} />
                <Route exact path={`${path}/withdraw`} component={Withdraw} />
                <Route exact path={`${path}/deposit`} component={Deposit} />
        </div>
    )
}
