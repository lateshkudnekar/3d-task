import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../Context/authContext';

export default function Header() {
    const { authState, authActions } = React.useContext(AuthContext);
    let history = useHistory();
    
    const logout = () => {
        console.log(authState);
        authActions.logout()
        history.replace("/")
    }
    return (
        <>
            <nav className="navbar navbar-dark bg-dark">
                <Link to="/"><button className="btn btn-primary">Home</button></Link>
                <a className="navbar-brand" href="#">3D-Bank</a>
                {authState.user && <button onClick={() =>logout()} className="btn btn-primary">Logout</button>}
            </nav>
        </>
    )
}
