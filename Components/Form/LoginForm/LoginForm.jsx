import { React, useContext, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import '../../index.scss'
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import MuiPhoneNumber from "material-ui-phone-number";
import accountAPI from '../../../API';
// import { AuthContext } from '../../../Context/GlobalContext';
import ReCAPTCHA from "react-google-recaptcha";


export default function LoginForm() {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
        keepLogin: false,
        isVerifiedByCapt: false,
    })

    const navigate = useNavigate()

    const handleChange = name => event => {
        //console.log(event.target.value)
        setFormData({ ...formData, [name]: event.target.value });
    }

    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

    const handleSubmit = async () => {
        if(formData.isVerifiedByCapt)
            if(formData.phone.length > 0 && formData.password.length > 0){
                //console.log("Sending login data:",formData);
                let resultAttempt = await accountAPI.login(formData);
                //console.log("Login attempt result:",resultAttempt);
                const data = await resultAttempt.json()
                if (resultAttempt.status === 200) {
                    //console.log(data);
                    console.log("Login success!");
                    localStorage.setItem('token', data.accessToken);
                    alert("Login success!");
                }
                else if(resultAttempt.status === 401) {
                    console.log(data.message);
                    alert('Invalid username or password');
                }
                else if(resultAttempt.status === 404) {
                    console.log(data.message);
                    alert('Some thing went wrong');
                }
                //console.log('token is:' + localStorage.getItem('token'));
            }
            else alert('All fields must be filled');
        else alert('Please vertify to continue.');
    }
    const handleKeepLogin = (event) => {
        setFormData({ ...formData, keepLogin: event.target.checked });
    }
    const handlePhoneChange = value => {
        if (value) {
            setFormData({ ...formData, phone: value });
        }
    }
    const renderItems = (keyitem) => {
        switch (keyitem) {
            case 'phone':
                return <MuiPhoneNumber
                    required
                    className='login-form__text-field login-form__element'
                    name="phone"
                    placeholder='Enter phone number'
                    id={`tf_${keyitem}`}
                    label={capitalize(keyitem) + " number"}
                    defaultCountry={"vn"}
                    value={formData[keyitem]}
                    onChange={handlePhoneChange}
                />;
            case 'password':
                return <TextField 
                    required
                    variant="standard"
                    className='login-form__text-field login-form__element'
                    key={keyitem}
                    id={`tf_${keyitem}`}
                    label={capitalize(keyitem)}
                    type="password"
                    autoComplete="current-password"
                    value={formData[keyitem]}
                    onChange={handleChange(keyitem)}
                />;
            case 'keepLogin':
                return <FormControlLabel key={keyitem} className='login-form__element' style={{marginBottom:'16px'}}
                    control={<Checkbox onChange={handleKeepLogin}/>} label="Keep Login" 
                    />;
            default:
                return ;
            
        }
    }

    const onCaptChange = (e) => {
        setFormData({ ...formData, isVerifiedByCapt: true});
    }

    return (
        <div className="form-container">
            <form className='login-form'
                style={{
                    borderRadius: "8px",
					minWidth: "280px",
                    maxWidth: '400px',
                    minHeight: '460px'
                }}>
                <h1 style={{width:'100%', textAlign: 'center', marginBottom:'16px'}}>Login</h1>
            
                {Object.keys(formData).map(key => (renderItems(key)))}

                <div style={{ display: 'flex', 
                            alignContent: 'center', 
                            justifyContent: 'center',
                            marginBottom:'16px' }}>
                    <ReCAPTCHA
                        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                        onChange={onCaptChange}/>
                </div>

                <p style={{ fontSize: '14px',
                        width:'100%', 
                        textAlign: 'center', 
                        marginTop: '24px' }}>
                    No account? <Link to='/register'>Register</Link>
                </p>
                {/* <p className="login-form__register-text">
                    Forgot password? <Link to='/forgot/password'>Send email</Link>
                </p> */}

                <Button startIcon={<LoginIcon />} 
                    style={{ width:'100%', 
                        backgroundColor: 'hsl(162, 48%, 46%)',
                        color: 'white',
                        marginTop: '8px' }}
                    type="submit"
                    onClick={handleSubmit}
                    >Login</Button>

            </form>
        </div>
    )
}