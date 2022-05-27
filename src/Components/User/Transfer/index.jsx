import { React } from 'react'
import { FormControl, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Link } from 'react-router-dom';
import './trans.css'

const homeBody = {
    backgroundColor: '#FFFFF0',
	height: '100vh',
    width: '100%'
};

export default function Transfer() {
    return (
        <div style={homeBody} className="form-container">
            <FormControl focused>
                <Button sx={{m: 4, p: 5}} 
                    // fullWidth  
                    variant="outlined" 
                    endIcon={<ArrowForwardIosIcon/>}
                    className="bank-btn"
                    component={Link} to="/user/transfer/bank"
                    >Bank Account </Button>
                <Button sx={{m: 4, px: 8, py : 5}} 
                    // fullWidth  
                    variant="outlined" 
                    endIcon={<ArrowForwardIosIcon/>}
                    component={Link} to="/user/transfer/e-wallet"
                    >E-Wallet </Button>
            </FormControl>
        </div>
    )
}