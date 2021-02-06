import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Container from '../Components/Container';
import Header from '../Components/Header';

export default function Home() {
    return (
        <div className="mt-5">
            <Container>
                <Link to="/customer"><Button className='mr-1'>Customer</Button></Link>
                <Link to="/manager"><Button>Manager</Button></Link>
            </Container>
        </div>
    )
}
