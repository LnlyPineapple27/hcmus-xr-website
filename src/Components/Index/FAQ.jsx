// import { Container, Typography } from "@material-ui/core";
import React from "react";

import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
const faqBody = {
    background: 'white',
    // height: '70vh',
};

export default function FAQ() {
    // return (
		// <div style={faqBody} id='faq'>
		// 	<div style={{height: '56px'}}/>
		// 	<h1>FAQ</h1>
		// </div>
    // );
    return (
      <div style={faqBody} id='faq'>
        <div style={{height: '56px'}}/>
        <Divider />
        <Container maxWidth='md' 
            style={{ textAlign: 'center' }}>
            <h1>FAQ</h1>
            <address>
              Survey link:&nbsp;
              <a href="https://forms.gle/wA2evr3k8M1f26Pg8" target="_blank">Open here</a><br />
            </address>  
        </Container>
      </div> 
    );
};