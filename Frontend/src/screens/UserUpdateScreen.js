import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct } from '../actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { updateUser, getUserDetails } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_RESET, USER_DETAILS_RESET } from '../types/userConstants';

const UserUpdateScreen = ({ history, match }) => {
  const userId = match.params.id;
  var i = 1;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone_no, setPhone_no] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userLogin.userData);
  const { user, loading: loadingDetails } = useSelector((state) => state.userDetails);
  const { success, loading, error } = useSelector((state) => state.userUpdate);
  const { products, loading: loadinglist } = useSelector((state) => state.productList);

  useEffect(() => {
    dispatch(listProducts());
    if (!userData || success) {
      dispatch({ type: USER_UPDATE_RESET });
      dispatch({ type: USER_DETAILS_RESET });

      if (userData && userData.isAdmin) {
        history.push('/admin/userlist');
      } else {
        history.push('/');
      }
    } else {
      if (!user?.name) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setAddress(user.address);
        setPhone_no(user?.contact?.phone_no);
        setEmail(user.email);
      }
    }
  }, [history, userData, user, success, dispatch, userId]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } else {
      dispatch(
        updateUser({
          _id: userId,
          name,
          email,
          password,
          address,
          phone_no,
        })
      );
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', padding: '40px' }}>
      <FormContainer>
        <h1>Details</h1>

        {loadingDetails && <Loader />}
        <Form onSubmit={submitHandler} className='mt-5 mb-2'>
          {/* Name */}
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          {/* Email */}
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className='text-muted'>*Be sure to enter your valid email address</Form.Text>
          </Form.Group>

          {/* Address */}
          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='address'
              placeholder='Enter Address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          {/* Mobile Number */}
          <Form.Group controlId='contact'>
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              type='contact'
              placeholder='Enter Mobile No'
              value={phone_no}
              onChange={(e) => setPhone_no(e.target.value)}
            />
            <Form.Text className='text-muted'>* Be sure to enter a correct 10 digit number starting with 9</Form.Text>
          </Form.Group>

          {/* Password */}
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          {/* Confirm Password */}
          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {loading && <Loader />}

          {/* Submit Button */}
          <Button type='submit' variant='primary'>
            Update Profile
          </Button>
        </Form>

        {/* Display Messages */}
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile updated successfully</Message>}
      </FormContainer>

      {/* Uploaded Products */}
      <Row>
        <Col md={12}>
          {loadinglist ? (
            <Loader />
          ) : (
            <>
              <h3>My Uploads</h3>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>SN</th>
                    <th>ID</th>
                    <th>Product Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Negotiable</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.length > 0 &&
                    products.map(
                      (product) =>
                        product &&
                        product.user === userData._id && (
                          <tr key={product._id}>
                            <td>{i++}</td>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product?.Cost.price}</td>
                            <td>
                              {product?.Cost.negotiable ? (
                                <i className='fas fa-check' style={{ color: 'green' }}></i>
                              ) : (
                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                              )}
                            </td>
                            <td>
                              <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                <Button variant='light' className='btn-sm'>
                                  <i className='fas fa-edit'></i>
                                </Button>
                              </LinkContainer>
                              <Button
                                variant='danger'
                                className='btn-sm'
                                onClick={() => deleteHandler(product._id)}
                              >
                                <i className='fas fa-trash'></i>
                              </Button>
                            </td>
                          </tr>
                        )
                    )}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserUpdateScreen;
