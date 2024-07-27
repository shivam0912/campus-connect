import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.usersList);
  const { users, loading, error } = usersList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userData } = userLogin;
  const userDelete = useSelector((state) => state.userDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = userDelete;

  useEffect(() => {
    if (userData && userData.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userData]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Users</h1>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>SN</th>
              <th style={{ textAlign: 'center' }}>ID</th>
              <th style={{ textAlign: 'center' }}>NAME</th>
              <th style={{ textAlign: 'center' }}>EMAIL</th>
              <th style={{ textAlign: 'center' }}>PHONE</th>
              <th style={{ textAlign: 'center' }}>ADDRESS</th>
              <th style={{ textAlign: 'center' }}>ADMIN</th>
              <th style={{ textAlign: 'center' }}></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td style={{ textAlign: 'center' }}>{index + 1}</td>
                <td style={{ textAlign: 'center' }}>{user._id}</td>
                <td style={{ textAlign: 'center' }}>{user.name}</td>
                <td style={{ textAlign: 'center' }}>{user.email}</td>
                <td style={{ textAlign: 'center' }}>{user.contact.phone_no}</td>
                <td style={{ textAlign: 'center' }}>{user.address}</td>
                <td style={{ textAlign: 'center' }}>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListScreen;
