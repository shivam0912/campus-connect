import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={footerStyle}>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            Copyright &copy; 2024
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

const footerStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  position: 'relative',
  bottom: 0,
  width: '100%',
};

export default Footer;
