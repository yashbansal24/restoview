import React, { useCallback, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { useNavigate } from 'react-router-dom';

export default function Layout(props) {
    let navigate = useNavigate();
    const signOut = useCallback(() => {
        props.logOut();
        navigate('');
    }, [props]);
    return (<Navbar bg="dark" variant="dark">
        <Container>
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="me-auto">
        <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        {
            props.token ? 
            <Nav.Link onClick={signOut}>Logout</Nav.Link>:
            <LinkContainer to="/signin">
                <Nav.Link>Login</Nav.Link>
            </LinkContainer>
        }
        </Nav>
        </Container>
    </Navbar>);
};