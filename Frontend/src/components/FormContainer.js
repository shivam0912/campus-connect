import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', paddingBottom: '60px' }}>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            {children}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormContainer;
