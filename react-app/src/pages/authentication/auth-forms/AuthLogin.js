import React, { useState } from 'react';
import axios from 'axios';
import api from '../../api'
import {
    Button,
    Alert,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import AnimateButton from '../../../components/@extended/AnimateButton';
import { useNavigate } from 'react-router-dom';

const AuthLogin = () => {
    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');
    const [message, setMessage] = useState('');
    
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleSendOtp = async () => {
        setErrorMsg('');
        setMessage('');
        try {
            const response = await axios.get(api+'api/commons/otp/generate/' + mobileNumber);
            setMessage(response.data.message);
            // console.log(response.data.message);
            setIsOtpSent(true);
        } catch (error) {
            // <Alert severity="error">{error.response.data.message}</Alert>
            setErrorMsg(error.response.data.message);
            console.error(error.response.data.message);
        }
    };

    const handleVerifyOtp = async () => {
        setErrorMsg('');
        setMessage('');

        try {
            const response = await axios.post(api+'api/commons/login', {"mobileNo": mobileNumber,"otp": otp });
            // <Alert severity="success">{response.data.message}</Alert>
            // const { token } = response.data;
            console.log(response);
            const token = response.headers.authtoken;
            localStorage.clear();
            localStorage.setItem('token', token);
            console.log('token',token);
            localStorage.setItem('userdata', JSON.stringify(response.data.data));
            navigate('/');

            setMessage(response.data.message);
        } catch (error) {
            setErrorMsg(error.response.data.message);
            console.error(error.response.data.message);
        }
    };

    return (
        <div style={{gap: 10, display: 'inline-grid',width: '100%'}}>
            <InputLabel htmlFor="mobileNumber">Mobile Number:</InputLabel>
            <OutlinedInput
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
            />
            {errorMsg!=='' && <Alert severity="error">{errorMsg}</Alert>}
            {message!=='' && <Alert severity="success">{message}</Alert>}
            <div id='ApiResponse'></div>
            {isOtpSent ? (
                <>
                    {/* <label>{response.data.message}</label> */}
                    <InputLabel htmlFor="otp">Enter OTP:</InputLabel>
                    <OutlinedInput
                        type="text"
                        id="otp"
                        name="otp"
                        value={otp}
                        onChange={handleOtpChange}
                    />
                    {/* <button onClick={handleVerifyOtp}>Verify OTP</button> */}
                    <AnimateButton>
                        <Button
                            disableElevation
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={handleVerifyOtp}
                        >
                            Verify OTP
                        </Button>
                    </AnimateButton>
                </>
            ) : (
                // <button onClick={handleSendOtp}>Send OTP</button>
                <AnimateButton>
                    <Button
                        disableElevation
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleSendOtp}
                    >
                        Send OTP
                    </Button>
                </AnimateButton>
            )}
        </div>
    );
};

export default AuthLogin;