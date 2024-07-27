import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './AboutUsScreen.css'; // Import CSS file for styling

const AboutUsScreen = () => {
  return (
    <div className='about-body'>
      <Row md={3}>
        <Col md={3}></Col>
        <Col md={6} className='about-section'>
          <h1 className='section-title'>Who are We?</h1>
          <p className='section-content'>
            This website has been created for the purpose of to adiding students in buying and selling notes and other items they no longer need, which might be useful for other new students. We do not charge for this service. Our goal is to facilitate communication between buyers and sellers. Items can include notes, bikes, drawing instruments, utensils, and furniture, especially from students who are leaving campus soon or in the future.
          </p>
        </Col>
        <Col md={3}></Col>
      </Row>
      
      {/* Add some space */}
      <div className='space'></div>

      <Row>
        <Col md={3}></Col>
        <Col md={6} className='about-section'>
          <h1 className='section-title'>Developer</h1>
          <p className='section-content'>
            Designed and developed by <br />
            <strong>Shivam Gupta</strong> & <strong>Karthik Kumawat</strong>
          </p>
          <h3 className='contact-title'>Contact Details</h3>
          <p className='contact-info'>
            <i className='fas fa-phone'></i> 8840748023 <br />
            <i className='fas fa-envelope-square'></i>{' '}
            <a target='_blank' href='mailto:campus.connect@gmail.com'>campus.connect@gmail.com</a>
          </p>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
};

export default AboutUsScreen;
