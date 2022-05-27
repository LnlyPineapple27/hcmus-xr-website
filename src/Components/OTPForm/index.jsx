import { React, useContext, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import '../index.scss'
import { useNavigate } from "react-router-dom";
import LoginIcon from '@mui/icons-material/Login';
import accountAPI from '../../API';
// import { AuthContext } from '../../../Context/GlobalContext';


export default function OTPForm() {


    const [formData, setFormData] = useState({
        submited_OTP: '',
    })

    //const [, setAuth] = useContext(AuthContext)
    

    const handleChange = name => event => {
        //console.log(event.target.value)
        setFormData({ ...formData, [name]: event.target.value });
    }

    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

    const handleClick = async () => {
        if(formData.submited_OTP.length > 0){
            console.log("Sending OTP to server:",formData);
            //let resultAttempt = await accountAPI.login(formData);
            //console.log("Login attempt result:",resultAttempt);
            // const data = await resultAttempt.json()
            // if (resultAttempt.status === 200) {
            //     //console.log(data);
            //     console.log("Login success!");
            //     localStorage.setItem('token', data.accessToken);
            //     alert("Login success!");
            // }
            // else if(resultAttempt.status === 401) {
            //     console.log(data.message);
            //     alert('Invalid username or password');
            // }
            // else if(resultAttempt.status === 404) {
            //     console.log(data.message);
            //     alert('Some thing went wrong');
            // }
            //console.log('token is:' + localStorage.getItem('token'));
        }
        else alert('All fields must be filled');
    }
    const handleOTPChange = value => {
        if (value) {
            setFormData({ ...formData, submited_OTP: value });
        }
        console.log(formData.submited_OTP);
    }

    return (
        <div className="form-container">
            <FormControl className='login-form'>
                <h1 className='text-center login-form__element' style={{width:'100%', textAlign: 'center'}}>Enter OPT</h1>
            
                <TextField
                    required
                    variant="standard"
                    className='login-form__text-field login-form__element'
                    key={'tf_submited_OTP'}
                    id={'tf_submited_OTP'}
                    label={'Enter OTP here'}
                    type="Text"
                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                    value = {formData['submited_OTP']}
                    onChange={handleChange('submited_OTP')}
                />
                {/* {Object.keys(formData).map(key => (renderItems(key)))} */}

                {/* <div className="text-center">
                    <p className="login-form__register-text">
                        No account? <Link to='/register'>Register</Link>
                    </p>
                    <p className="login-form__register-text">
                        Forgot password? <Link to='/forgot/password'>Send email</Link>
                    </p>
                </div> */}
                <Button startIcon={<LoginIcon />} className='login-form__element login-form__button' type="button" onClick={handleClick}>Submit</Button>

            </FormControl>
        </div>
    )
}