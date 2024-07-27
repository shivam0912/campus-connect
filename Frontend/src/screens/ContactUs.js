import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();
  const [recipientEmail, setRecipientEmail] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_qzckam8', 'template_ayuvfrs', form.current, {
        publicKey: 't4MSkD_HCI-yW69KR',
        recipient_email: 'karthikkumawat007@gmail.com', // Correct the key to match the name attribute
      })
      .then(
        () => {
          console.log('SUCCESS!'); 
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="from_name" />
      
      <label>Email</label> 
      <input type="email" name="from_email" />
      
      <label>Recipient's Email</label> 
      <input 
        type="email" 
        name="recipient_email" 
        value={recipientEmail} 
        onChange={(e) => setRecipientEmail(e.target.value)} 
      /><br></br>
      
      <label>Message</label>
      <textarea name="message" />
      
      <input type="submit" value="Send" />
    </form>
  );
};
