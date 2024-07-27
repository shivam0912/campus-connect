import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { login } from '../actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userData, loading, error } = userLogin;
  const redirect = location.search ? location.search.split('=')[1] : '/';
  
  useEffect(() => {
    if (userData) {
      history.push(redirect);
    }
  }, [history, userData, redirect]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer style={containerStyle}>
      <h1 style={titleStyle}>SIGN IN</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className='mt-5'>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </Form.Group>
        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?
          <Link
            className='underlined1 '
            to={'/register'}
          >
            <span className='btn-primary'> Register</span>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};
const containerStyle = {
  backgroundColor: 'rgba(20, 00,100, 0.2)', // Sky blue color with low opacity (20%)
  padding: '30px',
  borderRadius: '10px',
  fontWeight: 'bold',
  fontSize: '15px',
  color: '#000',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};


const titleStyle = {
  fontSize: '50px',
  fontWeight: 'bold',
  marginBottom: '20px',
  textAlign: 'center', // Center align text within the title
};

const inputStyle = {
  borderRadius: '10px',
  fontWeight: 'bold',
  color: '#000',
  backgroundColor: '#fff',
  textAlign: 'center', // Center align text within the input
};

export default LoginScreen;
