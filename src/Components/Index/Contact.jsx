// import { Container, Typography } from "@material-ui/core";
import React from "react";

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
const contactBody = {
    background: 'white',
    // height: '100vh',
};

export default function Contact() {
    return (
      <div style={contactBody} id='contact'>
        <div style={{height: '56px'}}/>
        <Divider />
        <Container maxWidth='md' 
            style={{ textAlign: 'center' }}>
            <h1>Contact</h1>
            <address>
              Email:&nbsp;
              <a href="mailto:datn.online.payment@gmail.com">datn.online.payment@gmail.com</a><br />
            </address>  
        </Container>
      </div> 
    );
};
