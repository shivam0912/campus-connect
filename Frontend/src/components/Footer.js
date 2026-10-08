import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='site-footer'>
      <Container className='footer-inner'>
        <div>
          <strong>Campus Connect</strong>
          <p>Useful things, kept in circulation.</p>
        </div>
        <div className='footer-links'>
          <Link to='/about'>About</Link>
          <a href='https://github.com/shivam0912/campus-connect' target='_blank' rel='noreferrer'>GitHub</a>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
