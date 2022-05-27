import { React, useState } from 'react'
import {  Button, TextField, MenuItem } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './trans.css'

const bankOptions = [
	{
		value: 'Asia Commercial Bank (ACB)',
		label: 'ACB',
	},
	{
		value: 'Orient Commercial Joint Stock Bank (OCB)',
		label: 'OCB',
	},
	{
		value: 'Tien Phong Commercial Joint Stock Bank (TP Bank)',
		label: 'TP Bank',
	},
	{
		value: 'Maritime Commercial Joint Stock Bank (Maritime Bank)',
		label: 'Maritime Bank',
	},
	{
		value: 'Sai Gon Thuong Tin Commercial Joint-stock Bank (Sacombank)',
		label: 'Sacombank',
	},
	{
		value: 'Eastern Asia Commercial Joint Stock Bank (DongA Bank)',
		label: 'DongA Bank',
	},
	{
		value: 'Vietnam Export-Import Commercial Joint Stock Bank (Eximbank)',
		label: 'Eximbank',
	},
	{
		value: 'Nam A Commercial Joint Stock Bank (Nam A Bank)',
		label: 'Nam A Bank',
	},
	{
		value: 'Vietnam Prosperity Joint Stock Commercial Bank (VP Bank)',
		label: 'VP Bank',
	},
	{
		value: 'Viet Nam Technological and Commercial Joint Stock Bank (Techcombank)',
		label: 'Techcombank',
	},
	{
		value: 'Military Commercial Joint Stock Bank (MB Bank)',
		label: 'MB Bank',
	},
	{
		value: 'Bac A Commercial Joint Stock Bank (Bac A Bank)',
		label: 'Bac A Bank',
	},
	{
		value: 'Vietnam International Commercial Joint Stock Bank (VIB)',
		label: 'VIB',
	},
	{
		value: 'Southeast Asia Commercial Joint Stock Bank (SeA Bank)',
		label: 'SeA Bank',
	},
	{
		value: 'Housing development Commercial Joint Stock Bank (HDBank)',
		label: 'HDBank',
	}
];

export default function BankForm() {
	const [formData, setFormData] = useState({
		bank: '',
		account: '',
		amount: '',
		note: '',
    })
	const {bank, account, note, amount} = formData;

	const onChange = (e) => 
    	setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		// console.log(formData);
		if (!isNaN(amount) && !isNaN(account)){
			console.log(formData);
			const newTransDetail = {
				bank,
				account,
				amount,
				note
			};

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
        <div className="form-container">
            <form className='login-form' onSubmit={onSubmit}
				style={{
                    borderRadius: "8px",
					minWidth: "256px"
                }}>
				<TextField fullWidth
					onChange={onChange}
					name='bank'
					value={bank}
					select
					label="Bank" 
					variant="outlined" 
					required 
				>
					<MenuItem value=""><em>None</em></MenuItem>
					{bankOptions.map((opt) => (
						<MenuItem value={opt.value} key={opt.label}>
							{opt.label}
						</MenuItem>
					))}
				</TextField>
                <TextField fullWidth 
					onChange={onChange}
					value={account}
					name='account'
					margin="normal"
					label="Account Number" 
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
					variant="standard"
					/>
				<Button fullWidth
					type='submit'
					sx={{m:3}}
					variant="contained"
					endIcon={<ArrowForwardIosIcon/>}
					>Confirm</Button>
			</form>
        </div>
    )
}