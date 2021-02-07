import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Container from '../Components/Container';
import Header from '../Components/Header';
import { AuthContext } from '../Context/authContext';

export default function Home() {
    const { authState={}, authActions } = React.useContext(AuthContext);

    return (
        <div className="mt-5">
            <Container>
                <Link to="/customer"><Button className='mr-1'>Customer</Button></Link>
                {!authState.user && <Link to="/manager"><Button>Manager</Button></Link>}
            </Container>
        </div>
    )
}
