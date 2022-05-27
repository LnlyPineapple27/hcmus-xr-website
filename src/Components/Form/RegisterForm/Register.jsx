import { React, useState } from 'react';
import {
	TextField,
	FormControl,
	Button,
	InputAdornment,
	IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import MuiPhoneNumber from 'material-ui-phone-number';
import axios from 'axios';

// firebase config
import { authentication } from './firebase-conf';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import bg from '../../Home/imgs/home-pg.jpg';
import '../../index.scss';

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
	const [expandOTP, setExpandOTP] = useState(true); // false
	const [verify, setVerify] = useState(true); //false

	const [sucess, setSucess] = useState(false);

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

	const handleRegister = async () => {
		if (
			formData.phone.length > 0 &&
			formData.password.length > 0 &&
			formData.confirmedPassword.length > 0 &&
			formData.name.length > 0 &&
			formData.email.length > 0 &&
			formData.dob.length > 0
		)
			if (formData.password === formData.confirmedPassword)
				if (isEmailValid(formData.email))
					if (verify) {
						// Proceed to register
						// console.log("Proceed to register:", formData);
						const phone = formData.phone,
							dob = formData.dob,
							email = formData.email,
							name = formData.name,
							password = formData.password;

						try {
							const response = await axios.post(
								process.env.BACKEND_URL + '/register',
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
							);
							console.log(response);
						} catch (err) {
							if (!err?.response) {
								alert('No Server Response.');
							} else if (err.response?.status === 400) {
								alert('Mobile Phone has been registered.');
							} else {
								alert('Registration Failed');
							}
							// errRef.current.focus();
						}
					} else alert('Please verify your mobile phone');
				else alert('Email is not valid');
			else alert('Password is not match');
		else alert('All fields must be filled');
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
			alert('Please input your phone number.');
		}
	};

	const verifyOTP = (e) => {
		// let otp = e.target.value;
		// setOTP(otp);
		console.log(formData.OTP);

		if (formData.OTP.length === 6) {
			let confirmationResult = window.confirmationResult;
			confirmationResult
				.confirm(formData.OTP)
				.then((result) => {
					// User signed in successfully.
					// const user = result.user;
					// ...
					alert('Verify Sucess.');
					setVerify(true);
				})
				.catch((error) => {
					alert('Wrong validation code.');
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
					onSubmit={handleRegister}
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
						sx={{ mb: 2 }}
						required
						fullWidth
						label="Password"
						name="password"
						variant="standard"
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
						value={formData.password}
						onChange={onChange}
					/>

					<TextField
						required
						fullWidth
						sx={{ mb: 2 }}
						name="confirmPassword"
						variant="standard"
						label={'Confirm Password'}
						type="password"
						value={formData.confirmPassword}
						onChange={onChange}
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
								value={formData['OTP']}
								onChange={onChange}
							/>
							<Button onClick={verifyOTP}>Verify</Button>
						</FormControl>
					) : null}

					<Button
						className="form__element form__button"
						type="submit"
						sx={{ mt: 2 }}
					>
						Register
					</Button>

					<div>
						<p className="form__register-text">
							Have account? <Link to="/">Login</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
