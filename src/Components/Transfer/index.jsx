import { React } from 'react'
import { FormControl, Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Link } from 'react-router-dom';
import './trans.css'

export default function Transfer() {
    return (
        <div className="form-container">
            <FormControl className='login-form' 
                focused style={{
                    borderRadius: "8px",
                    minWidth: "256px"
                }}>
                <Button sx={{m: 2, py: 5}} 
                    fullWidth  
                    variant="outlined" 
                    endIcon={<ArrowForwardIosIcon/>}
                    className="bank-btn"
                    component={Link} to="/user/transfer/bank"
                    >Bank Account </Button>
                <Button sx={{m: 2, py: 5}} 
                    fullWidth  
                    variant="outlined" 
                    endIcon={<ArrowForwardIosIcon/>}
                    component={Link} to="/user/transfer/e-wallet"
                    >E-Wallet </Button>
            </FormControl>
        </div>
    )
}