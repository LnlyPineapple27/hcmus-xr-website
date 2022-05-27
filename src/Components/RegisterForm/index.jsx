import { React, useState } from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { FormControl, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import '../index.scss'
import MuiPhoneNumber from "material-ui-phone-number";
import { useNavigate } from "react-router-dom";
import accountAPI from '../../API';

import { authentication } from './firebase-conf';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';




export default function LoginForm() {
    const [expandOTP, setExpandOTP] = useState(false);
    const [OTP, setOTP] = useState('');


    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        confirmedPassword: '',
        name: '',
        email: '',
        dob: new Date().toJSON().slice(0,10),
    })

    let navigate = useNavigate()
    const handleChange = name => event => {
        setFormData({ ...formData, [name]: event.target.value });
    }
    const handleChangeDate = date => {
        setFormData({ ...formData, dob: convertDate(date) });
    }
    const handlePhoneChange = value => {
        if (value) {
            setFormData({ ...formData, phone: value });
        }
    }
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

    const convertDate = (str) => {
        const date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
    
    const emailRegex = /^[-!#$%&'*+/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    function isEmailValid(email) {
        if (!email)
            return false;

        if(email.length>254)
            return false;

        var valid = emailRegex.test(email);
        if(!valid)
            return false;

        // Further checking of some things regex can't handle
        var parts = email.split("@");
        if(parts[0].length>64)
            return false;

        var domainParts = parts[1].split(".");
        if(domainParts.some(function(part) { return part.length>63; }))
            return false;

        return true;
    }
    
    const handleRegister = async () =>{
        if (formData.phone.length > 0 && formData.password.length > 0 && formData.confirmedPassword.length > 0 && formData.name.length > 0 && formData.email.length > 0 && formData.dob.length > 0)
            if (formData.password === formData.confirmedPassword)
                // Proceed to register
                if(isEmailValid(formData.email)){
                    // console.log("Proceed to register:", formData);
                    // let resultAttempt = await accountAPI.register(formData);
                    // const data = await resultAttempt.json()
                    // if (resultAttempt.status === 200) {
                    //     //console.log(data);
                    //     console.log("Register success!");
                    //     localStorage.setItem('token', data.accessToken);
                    //     alert("Register success!");
                    // }
                    // else if(resultAttempt.status === 400) {
                    //     console.log(data.message);
                    //     alert(data.message);
                    // }
                    // else if(resultAttempt.status === 500) {
                    //     console.log(data.message);
                    //     alert('Server error');
                    // }
                    // if (resultAttempt.status === 200) {
                    //     //console.log(resultAttempt.data);
                    //     alert("Register Successful");
                    //     navigate("../login", { replace: true });
                    // }
                    // else if(resultAttempt.status === 409) {
                    //     alert('Account exist');
                    // }
                    // else if(resultAttempt.status === 404) {
                    //     alert('Some thing went wrong');
                    // }
                    // console.log('token is:' + localStorage.getItem('token')); 
                }
                else alert("Email is not valid");
            else alert('Password is not match');
        else alert('All fields must be filled');
    }

    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow signInWithPhoneNumber.

            }
        }, authentication);
    }

    const requestOTP = (e) => {
        e.preventDefault();
        const phoneNum = formData.phone;
        if (phoneNum >= 12) {
            generateRecaptcha();
            let appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication, phoneNum, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
            }).catch((error) => {
                alert(error);
            });
            setExpandOTP(true);
        }
    }


    const verifyOTP = (e) => {
        let otp = e.target.value;
        setOTP(otp);

        if (otp.length === 6){
            let confirmationResult = window.confirmationResult;
            confirmationResult.confirm(otp).then((result) => {
                // User signed in successfully.
                const user = result.user;
                // ...
              }).catch((error) => {
                alert('Wrong validation code.');
              });
        }
	}

    const renderItems = (keyitem) => {
        switch (keyitem) {
            case 'password':
            case 'confirmedPassword':
                return  <TextField 
                        required
                        variant="standard"
                        className='login-form__text-field login-form__element'
                        key={keyitem}
                        id={`tf_${keyitem}`}
                        label={capitalize(keyitem)}
                        type="password"
                        autoComplete="current-password"
                        value = {formData[keyitem]}
                        onChange={handleChange(keyitem)}
                    />;
            case 'dob':
                return <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        className='login-form__text-field login-form__element'
                        key={keyitem}
                        label="Date of birth"
                        id="tf_dob"
                        type="date"   
                        value={formData.dob}
                        inputFormat="MM/dd/yyyy"
                        onChange={handleChangeDate}
                        renderInput={(params) => 
                        <TextField  
                            required
                            variant="standard"
                            className='login-form__text-field login-form__element'
                            label="Date of birth"
                            id="tf_dob"
                            {...params} />}
                    />
                </LocalizationProvider>;
            case 'phone':
                return <FormControl fullWidth style={{ flexDirection: 'row' }}>
                    <div id='recaptcha-container'></div>
                    <MuiPhoneNumber required
                        className='login-form__text-field login-form__element'
                        name="phone"
                        placeholder='Enter phone number'
                        id={`tf_${keyitem}`}
                        label={capitalize(keyitem) + " number"}
                        defaultCountry={"vn"}
                        value={formData[keyitem]}
                        onChange={handlePhoneChange}
                    />
                    <Button style={{ whiteSpace: 'nowrap',
                                fontSize: '14px'}}
                        variant="outlined"
                        onClick={requestOTP}>Send OTP</Button>
                </FormControl>;
            default:
                return <TextField 
                        required
                        variant="standard"
                        className='login-form__text-field login-form__element'
                        key={keyitem}
                        id={`tf_${keyitem}`}
                        label={capitalize(keyitem)}
                        type="Text"
                        autoComplete={`Enter ${capitalize(keyitem)}`}
                        value = {formData[keyitem]}
                        onChange={handleChange(keyitem)}
                        />;
        }
    }

    return (
        <div className="form-container">
            <FormControl className='login-form'
                style={{
                    borderRadius: "8px",
					minWidth: "320px"
                }}>
                <h1 className='text-center login-form__element' style={{width:'100%', textAlign: 'center'}}>Register</h1>
                
                {Object.keys(formData).map(key => (renderItems(key)))}
                
                <div className="text-center">
                    <p className="login-form__register-text">
                        Have account? <Link to='/'>Login</Link>
                    </p>
                </div>
                { expandOTP === true ?
                    <TextField 
                        required
                        variant="outlined"
                        label={'OTP'}
                        value={OTP}
                        onChange={verifyOTP}
                    />
                    : null
                }

                <Button className='login-form__element login-form__button' type="button" onClick={handleRegister}
                    sx={{mt: 2}}>Register</Button>
            </FormControl>
        </div>
    )
}