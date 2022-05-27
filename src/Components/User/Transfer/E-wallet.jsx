import { React, useState } from 'react'
import {  Button, TextField, MenuItem } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

const homeBody = {
    backgroundColor: '#FFFFF0',
	height: '100vh',
    width: '100%'
};

const walletOptions = [
	{
		value: 'MoMo',
		label: 'MoMo',
	},
    {
        value: 'ViettelPay',
        label: 'ViettelPay',
    },
    {
        value: 'AirPay',
        label: 'AirPay',
    },
    {
        value: 'ZaloPay',
        label: 'ZaloPay',
    },
];

export default function BankForm() {
	const [formData, setFormData] = useState({
		wallet: '',
		phoneNum: '',
		amount: '',
		note: '',
    })
	const {wallet, phoneNum, note, amount} = formData;

	const onChange = (e) => 
    	setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		// console.log(formData);
		if (!isNaN(amount) && !isNaN(phoneNum)){
			// console.log(formData);
			// const newTransDetail = {
			// 	bank,
			// 	account,
			// 	amount,
			// 	note
			// };

			// try {
			// 	const body = JSON.stringify(newTransDetail);
			// 	const res = await axios.post("", body);
			// 	console.log(res.data);
			// } catch (err) {
			// 	console.error(err.response.data);
			// }
		}
	};

    return (
        <div className="form-container" style={homeBody}>
            <form className='login-form' onSubmit={onSubmit}
				style={{
                    borderRadius: "8px",
					minWidth: "256px", 
					maxWidth: "512px"
                }}>
				<TextField fullWidth
					onChange={onChange}
					name='wallet'
					value={wallet}
					select
					label="E-wallet" 
					variant="outlined" 
					required>
					<MenuItem value=""><em>None</em></MenuItem>
					{walletOptions.map((opt) => (
					<MenuItem value={opt.value} key={opt.label}>
						{opt.label}
					</MenuItem>
					))}
				</TextField>
                <TextField fullWidth 
					onChange={onChange}
					value={phoneNum}
					name='phoneNum'
					margin="normal"
					label="Phone Number" 
					variant="outlined" 
					required/>
				<TextField fullWidth 
					onChange={onChange}
					value={amount}
					name='amount'
					margin="normal"
					label="Amount" 
					variant="outlined" 
					required/>
				<TextField fullWidth
					onChange={onChange}
					value={note}
					name='note'
					margin="normal"
					label="Note"
					placeholder="Input your note"
					multiline
					variant="standard"/>

				<div style={{ display: 'flex',
						alignContent: 'center',
						justifyContent: 'center' }}>
					<Button fullWidth
						type='submit'
						sx={{m:3}}
						variant="contained"
						endIcon={<ArrowForwardIosIcon/>}
						>Confirm</Button>
				</div>
			</form>
        </div>
    )
}