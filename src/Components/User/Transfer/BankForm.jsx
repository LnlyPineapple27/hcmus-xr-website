import { React, useState } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';
import { bankOptions } from './BankData';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';

const homeBody = {
	backgroundColor: '#FFFFF0',
	height: '100vh',
	width: '100%',
};

export default function BankForm() {
	const [formData, setFormData] = useState({
		bank: '',
		account: '',
		amount: '',
		note: '',
	});

	const [alert, setAlert] = useState(false);
	const [alertContent, setAlertContent] = useState('');
	const [alertType, setAlertType] = useState('error');
	const [loading, setLoading] = useState(false);

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		setAlert(false);
		// console.log(formData);
		if (!isNaN(formData.amount) && !isNaN(formData.account)) {
			const bank = formData.bank,
				account = formData.account,
				amount = formData.amount,
				note = formData.note;

			// Call to backend
			setLoading(true);
			await axios.post(
				`${process.env.BACKEND_URL}/transaction`,
				JSON.stringify({
					bank, account, amount, note
				}),
				{
					headers: {
						'Content-Type': 'application/json',
					},
					withCredentials: true,
				})
			.then((res) => {
				setLoading(false);
				setAlertContent('LogIn Success.');
				setAlertType('success');
				setAlert(true);
				return;
			})
			.catch((err) => {
				setLoading(false);
				if (!err?.response) 
					setAlertContent('No Server Response.');
				else if (err.response?.status === 401)
					setAlertContent('Wrong Password');
				else if (err.response?.status === 402)
					setAlertContent('Phone Number has not been registered.')
				else setAlertContent('Login Failed');
			})

			setAlertType('error');
			setAlert(true);
		}
	};

	return (
		<div style={homeBody}>
			<div style={{ height: '56px' }} />
			<div
				className="form-container"
				style={{
					alignContent: 'center',
					justifyContent: 'center',
					height: '80%',
				}}
			>
				<form
					className="form"
					style={{
						minWidth: '256px',
						maxWidth: '512px',
						width: '50%',
					}}
				>
					<TextField
						name="bank"
						autoFocus
						fullWidth
						onChange={onChange}
						value={formData.bank}
						select
						label="Bank"
						variant="outlined"
						required
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						{bankOptions.map((opt) => (
							<MenuItem 
								value={opt.value} 
								key={opt.label}
							>
								<img
									src={opt.img}
									alt="bank-logo"
									height="32px"
									width="40px"
									style={{ borderRadius: '8px' }}
								/>
								<span
									style={{
										paddingLeft: '16px',
									}}
								>
									{opt.label}
								</span>
							</MenuItem>
						))}
					</TextField>
					<TextField
						name="account"
						fullWidth
						onChange={onChange}
						value={formData.account}
						margin="normal"
						label="Account Number"
						variant="outlined"
						required
					/>
					<TextField
						name="amount"
						fullWidth
						onChange={onChange}
						value={formData.amount}
						margin="normal"
						label="Amount"
						variant="outlined"
						required
					/>
					<TextField
						name="note"
						fullWidth
						onChange={onChange}
						value={formData.note}
						margin="normal"
						label="Note"
						placeholder="Input your note"
						multiline
						variant="standard"
					/>
					<div
						style={{
							display: 'flex',
							alignContent: 'center',
							justifyContent: 'center',
						}}
					>
						<Button
							fullWidth
							onClick={onSubmit}
							sx={{ m: 3 }}
							variant="contained"
							endIcon={<ArrowForwardIosIcon />}
						>
							Confirm
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}
