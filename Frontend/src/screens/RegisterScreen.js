import React, { useState, useEffect } from 'react';
import { Spinner, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import { verify } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userVerification = useSelector((state) => state.userVerification);
  const { verification, loading, error } = userVerification;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (verification) {
      history.push(redirect);
    }
  }, [history, redirect, verification]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else {
      dispatch(verify(name, email, password, contact, address));
    }
  };

  const handleContactChange = (e) => {
    const inputContact = e.target.value;
  const digitsOnly = inputContact.replace(/\D/g, ''); // Remove non-numeric characters
  const limitedContact = digitsOnly.slice(0, 10); // Limit to 10 digits
  if (limitedContact.length <= 10 || limitedContact.length > 9) {
    // If 10 digits entered or input is empty, clear the error message
    setMessage(null);
    setContact(limitedContact);
  } else {
    // Otherwise, display an error message
    setMessage('Please enter a 10-digit number');
  }
  };
  useEffect(() => {
    if (verification) {
      history.push('/login');
    }
  }, [history, verification]);
  return (
    <section className="vh-80 bg-image" >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{borderRadius: '15px'}}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="email">
                      <Form.Label>Your Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="contact">
                      <Form.Label>Mobile No</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Mobile No"
                        value={contact}
                        onChange={handleContactChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Repeat your password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Repeat Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </Form.Group>

                   

                    <div className="d-flex justify-content-center">
                      <Button type="submit" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">
                        {loading ? (
                          <Spinner animation="border" role="status" className="me-2">
                            <span className="sr-only">Loading...</span>
                          </Spinner>
                        ) : (
                          'Register'
                        )}
                      </Button>
                    </div>

                    {message && <Message variant="danger" className="mt-4">{message}</Message>}
                    {error && <Message variant="danger" className="mt-4">{error}</Message>}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterScreen;
