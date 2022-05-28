import { React, useState } from 'react';
import {
	TextField,
	Button,
	FormControlLabel,
	Checkbox,
	InputAdornment,
	IconButton,
	Alert,
	Collapse,
	CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import MuiPhoneNumber from 'material-ui-phone-number';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import { setUserLocal } from '../../../Utils/Common';
import '../index.scss';
import { update } from '../../../redux/userSlice';



export default function LoginForm() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [keepLogin, setKeepLogin] = useState(true);
	const [isVerified, setIsVerfied] = useState(false);
	const [showPwd, setShowPwd] = useState(false);

	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');

	const [alert, setAlert] = useState(false);
	const [alertContent, setAlertContent] = useState('');
	const [alertType, setAlertType] = useState('success');
	const [loading, setLoading] = useState(false);


	const onSubmit = async (e) => {
		e.preventDefault();
		setAlert(false);

		if (isVerified)
			if (phone.length > 0 && password.length > 0) {
				const URL = process.env.REACT_APP_BACKEND_URL;
				setLoading(true);
				await axios.post(
					`${URL}/signin`, // /welcome
					JSON.stringify({
						phone,
						password,
					}),
					{
						headers: {
							'Content-Type': 'application/json',
						},
						withCredentials: true,
					}
				)
				.then((res) => {
					setLoading(false);
					const name = ';.;';
					console.log(res);
					
					//Cookies.get();
					// console.log(document.cookie);
					// const accessToken = res.data.accessToken;

					// setUserLocal(name, accessToken);
					dispatch(update({ name }));
					setAlertType('success');
					setAlertContent('LogIn Successfully.');
					setAlert(true);


					navigate('/user');
					return null;
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
					if (!err?.response) 
						setAlertContent('No Server Response.');
					else if (err.response?.status === 401)
						setAlertContent('Wrong Password');
					else if (err.response?.status === 402)
						setAlertContent('Phone Number has not been registered.')
					else setAlertContent('Login Failed'); 
				})
			}
			else setAlertContent('All fields must be filled');
		else setAlertContent('Please vertify to continue.');

		setAlertType('error');
		setAlert(true);
	};

	return (
		<div className="form-container">
			<form
				className="form"
				style={{
					minWidth: '240px',
					maxWidth: '400px',
				}}
			>
				<h1 className="form__element">Login</h1>
				<MuiPhoneNumber
					name="phone"
					required
					sx={{ mb: 2 }}
					className="form__element"
					label="Phone Number"
					defaultCountry={'vn'}
					value={phone}
					onChange={(value) => setPhone(value)}
				/>
				<TextField
					name="password"
					sx={{ mb: 2 }}
					required
					fullWidth
					label="Password"
					variant="standard"
					type={showPwd ? 'text' : 'password'}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPwd(!showPwd)}
									edge="end"
								>
									{showPwd ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						),
					}}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<FormControlLabel
					className="form__element"
					style={{ justifyContent: 'left', marginLeft: '8px' }}
					control={
						<Checkbox
							defaultChecked
							onChange={(e) => setKeepLogin(e.target.checked)}
						/>
					}
					label="Keep Login"
				/>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginBottom: '16px',
					}}
				>
					<ReCAPTCHA
						sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
						onChange={() => setIsVerfied(true)}
					/>
				</div>
				<Button
					startIcon={!loading ? <LoginIcon /> : null}
					className="form__button"
					onClick={onSubmit}
					disabled={loading}
				>
					{!loading ? 'Login' : <CircularProgress size="24px" />}
				</Button>
				<p className="form__text">
					No account? <Link to="/register">Register</Link>
				</p>
			</form>
			<div style={{ marginTop: '16px' }}>
				<Collapse in={alert}>
					<Alert
						severity={alertType}
						variant="filled"
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setAlert(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
						sx={{ mb: 2 }}
					>
						<strong>{alertContent}</strong>
					</Alert>
				</Collapse>
			</div>
		</div>
	);
}
