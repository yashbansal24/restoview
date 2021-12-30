import React, {useState} from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Toast from 'react-bootstrap/Toast'

import LinkContainer from 'react-router-bootstrap/LinkContainer';

import { useNavigate } from 'react-router-dom';


async function loginUser(credentials) {
return fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
})
    .then(data => {
        if ((data.status) > 299) {
            throw new Error();
        }

        return data.json();
    })
    
}

export default function Login(props) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    let navigate = useNavigate();
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const token = await loginUser({
                username,
                password
            });
            props.setToken(token);
            navigate('/');
        }
        catch(err) {
            setError(true);
        }
    }
    return (<>
        <Form onSubmit={handleSubmit}>
            <Toast onClose={() => setError(false)} show={error} delay={3000} bg="danger" autohide>
            <Toast.Header>
                <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
                />
                <strong className="me-auto">Please try again</strong>
                <small>Error</small>
            </Toast.Header>
            <Toast.Body>Invalid Credentials!</Toast.Body>
            </Toast>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={e => setUserName(e.target.value)} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        <LinkContainer to="signup">
            <Button variant="primary" type="submit">
                Create Account
            </Button>
        </LinkContainer>
    </>);
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
};