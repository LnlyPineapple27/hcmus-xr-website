import { React, useState } from 'react';
import {
	TextField,
	FormControl,
	Button,
	InputAdornment,
	IconButton,
	Alert,
	Collapse,
	CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import MuiPhoneNumber from 'material-ui-phone-number';
import axios from 'axios';
import { useDispatch } from 'react-redux';

// firebase config
import { authentication } from './firebase-conf';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import bg from '../../Index/imgs/home-pg.jpg';
import '../index.scss';
import { update } from '../../../redux/userSlice';

const homeBody = {
	backgroundImage: `url(${bg})`,
	backgroundPosition: 'center',
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover',
	height: '100vh',
};

const emailRegex =
	/^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

export default function Register() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [expandOTP, setExpandOTP] = useState(false); // false
	const [isVerified, setIsVerified] = useState(false); //false

	const [alert, setAlert] = useState(false);
	const [alertContent, setAlertContent] = useState('');
	const [alertType, setAlertType] = useState('error');

	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		phone: '',
		password: '',
		confirmPassword: '',
		name: '',
		email: '',
		dob: new Date().toJSON().slice(0, 10),

		OTP: '',
		showPwd: false,
	});

	const handleClickShowPassword = () => {
		setFormData({ ...formData, showPwd: !formData.showPwd });
	};

	// let navigate = useNavigate();
	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onDateChange = (date) => {
		setFormData({ ...formData, dob: convertDate(date) });
	};
	const onPhoneChange = (value) => {
		setFormData({ ...formData, phone: value });
	};

	const convertDate = (str) => {
		const date = new Date(str),
			mnth = ('0' + (date.getMonth() + 1)).slice(-2),
			day = ('0' + date.getDate()).slice(-2);
		return [date.getFullYear(), mnth, day].join('-');
	};
	function isEmailValid(email) {
		if (!email) return false;

		if (email.length > 254) return false;

		var valid = emailRegex.test(email);
		if (!valid) return false;

		// Further checking of some things regex can't handle
		var parts = email.split('@');
		if (parts[0].length > 64) return false;

		var domainParts = parts[1].split('.');
		if (
			domainParts.some(function (part) {
				return part.length > 63;
			})
		)
			return false;

		return true;
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		setAlert(false);

		if (formData.password === formData.confirmPassword)
			if (isEmailValid(formData.email))
				if (isVerified) {
					const phone = formData.phone,
						dob = formData.dob,
						email = formData.email,
						name = formData.name,
						password = formData.password;

					const URL = process.env.REACT_APP_BACKEND_URL;
					setLoading(true);
					await axios.post(
						`${URL}/register`,
						JSON.stringify({
							phone,
							password,
							name,
							email,
							dob,
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
						const accessToken = res.data.accessToken;
						// setUserSession(res.data.accessToken);
						dispatch(update({ name, accessToken }));

						setAlertContent('Register Success.');
						setAlertType('success');
						setAlert(true);

						navigate('/user');
						return;
					})
					.catch((err) => {
						setLoading(false);
						if (!err?.response)
							setAlertContent('No Server Response.');
						else if (err.response?.status === 400)
							setAlertContent(
								'Mobile Phone or Email has been registered.'
							);
						else setAlertContent('Registration Failed.');
					});
				} else setAlertContent('Please verify your mobile phone');
			else setAlertContent('Email is not valid');
		else setAlertContent('Password is not match');

		setAlertType('error');
		setAlert(true);
	};

	const generateRecaptcha = () => {
		window.recaptchaVerifier = new RecaptchaVerifier(
			'recaptcha-container',
			{
				size: 'invisible',
				callback: (response) => {
					// reCAPTCHA solved, allow signInWithPhoneNumber.
				},
			},
			authentication
		);
	};

	const requestOTP = (e) => {
		e.preventDefault();
		const phoneNum = formData.phone;
		if (phoneNum >= 12) {
			generateRecaptcha();
			let appVerifier = window.recaptchaVerifier;
			signInWithPhoneNumber(authentication, phoneNum, appVerifier)
				.then((confirmationResult) => {
					window.confirmationResult = confirmationResult;
				})
				.catch((error) => {
					alert(error);
				});
			setExpandOTP(true);
		} else {
			setAlertContent('Please Input Your Phone Number.');
			setAlertType('error');
			setAlert(true);
		}
	};

	const verifyOTP = (e) => {
		if (formData.OTP.length === 6) {
			let confirmationResult = window.confirmationResult;
			confirmationResult
				.confirm(formData.OTP)
				.then((result) => {
					// User signed in successfully.
					// const user = result.user;
					// ...

					setIsVerified(true);

					setAlertContent('Verify Sucess');
					setAlertType('success');
					setAlert(true);
				})
				.catch((error) => {
					setAlertContent('Wrong Validation Code.');
					setAlertType('error');
					setAlert(true);
				});
		}
	};

	return (
		<div style={homeBody}>
			<div style={{ height: '25px' }} />
			<div className="form-container">
				<form
					className="form"
					style={{
						marginTop: '64px',
						maxWidth: '500px',
					}}
				>
					<h1 className="form__element" xs={{ mb: 2 }}>
						Register
					</h1>

					<FormControl
						fullWidth
						style={{ flexDirection: 'row' }}
						sx={{ mb: 2 }}
					>
						<div id="recaptcha-container" />
						<MuiPhoneNumber
							required
							className="form__element"
							label={'Phone Number'}
							defaultCountry={'vn'}
							name="phone"
							value={formData.phone}
							onChange={onPhoneChange}
						/>
						<Button
							style={{ whiteSpace: 'nowrap', fontSize: '14px' }}
							variant="outlined"
							onClick={requestOTP}
						>
							Send OTP
						</Button>
					</FormControl>

					<TextField
						name="password"
						sx={{ mb: 2 }}
						required
						fullWidth
						label="Password"
						variant="standard"
						type={formData.showPwd ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										edge="end"
									>
										{formData.showPwd ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						onChange={onChange}
						value={formData.password}
					/>

					<TextField
						name="confirmPassword"
						required
						fullWidth
						sx={{ mb: 2 }}
						variant="standard"
						label="Confirm Password"
						type={formData.showPwd ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										edge="end"
									>
										{formData.showPwd ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
						onChange={onChange}
						value={formData.confirmPassword}
					/>

					<FormControl fullWidth sx={{ mb: 2 }}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								// className="form__element"
								label="Date of birth"
								type="date"
								value={formData.dob}
								inputFormat="MM/dd/yyyy"
								onChange={onDateChange}
								renderInput={(params) => (
									<TextField
										required
										variant="standard"
										{...params}
									/>
								)}
							/>
						</LocalizationProvider>
					</FormControl>

					<TextField
						name="name"
						required
						fullWidth
						sx={{ mb: 2 }}
						variant="standard"
						label="Name"
						onChange={onChange}
						value={formData.name}
					/>

					<TextField
						name="email"
						required
						fullWidth
						sx={{ mb: 2 }}
						variant="standard"
						label="Email"
						onChange={onChange}
						value={formData.email}
					/>

					{expandOTP === true ? (
						<FormControl
							fullWidth
							style={{
								flexDirection: 'row',
								justifyContent: 'center',
							}}
						>
							<TextField
								required
								variant="outlined"
								label="OTP"
								name="OTP"
								value={formData.OTP}
								onChange={onChange}
							/>
							<Button onClick={verifyOTP}>Verify</Button>
						</FormControl>
					) : null}

					<Button
						className="form__button"
						sx={{ mt: 2 }}
						onClick={onSubmit}
						disabled={loading}
					>
						{!loading ? (
							'Register'
						) : (
							<CircularProgress size="24px" />
						)}
					</Button>

					<div>
						<p className="form__text">
							Have account? <Link to="/">Login</Link>
						</p>
					</div>
				</form>
			</div>
			<div style={{ position: 'absolute', left: '16px', bottom: '16px' }}>
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
