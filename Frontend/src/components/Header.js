import React from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import SearchBox from './SearchBox'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import logo from '../components/cc.png';

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userData } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
  }
  
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          
            <Navbar.Brand>
            <img
              src={logo} // Path to your logo image file
              alt='Campus Hub Logo' // Alt text for accessibility
              height='10' // Adjust height as needed
              width='10'
              className='d-inline-block align-top mr-1 logo-img' // Add custom styles if needed
            />
              Campus Connect</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          <Navbar.Collapse id='basic-navbar-nav'>
            <Route render={({ history }) => <SearchBox history={history} />} />

            <Nav className='ml-auto'>
              {userData ? (
                <NavDropdown
                  title={` ${userData.name}`}
                  id='username'
                >
                  <LinkContainer to={`/admin/users/${userData._id}/edit`}>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userData && userData.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  {/* <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item> */}
                </NavDropdown>
              )}
              <LinkContainer to='/about'>
                <Nav.Link>
                  {/* <i className='far fa-address-card'></i>  */}
                  About Us
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
