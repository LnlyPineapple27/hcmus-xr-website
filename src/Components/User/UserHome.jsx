import React from 'react';
import { CssBaseline } from '@mui/material';

const homeBody = {
    backgroundColor: '#FFFFF0',
	height: '100vh',
};

export default function UserHome() {
    return (
        <>
            <CssBaseline/>
            <div style={homeBody}>
                <div style={{height:'64px'}} />
                <h1>UserHome</h1>
            </div>
        </>
    );
};