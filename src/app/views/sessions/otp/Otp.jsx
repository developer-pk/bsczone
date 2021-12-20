import React, { useState } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    CircularProgress,
} from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import { makeStyles } from '@material-ui/core/styles'
import history from 'history.js'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux';
import {verifyOtp, resendOtp} from 'app/redux/actions/frontend/OtpActions'
import { ToastContainer, toast } from 'material-react-toastify';


const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: '#1A2038',
    },
    card: {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const Otp = ({ dispatch }) => {
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
        otp: '',
    })
    const [message, setMessage] = useState('')
    const { login } = useAuth();

    const classes = useStyles()

    const  resendOtpFunc = () => {
        console.log('resend');
        const params={type:'OTP_RESEND'};
        dispatch(resendOtp(params))
      };

    const handleChange = ({ target: { name, value } }) => {
        console.log(name,value,'handle change');
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    const handleFormSubmit = async (event,values) => {
        setLoading(true)
        try {
            console.log(userInfo,'login user info');//return false;
            dispatch(verifyOtp({otp:userInfo.otp}))
 
        } catch (e) {
            console.log(e)
            setMessage(e.message)
            setLoading(false)
        }
    }



    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen',
                classes.cardHolder
            )}
        >
            <ToastContainer position="top-right"
                                autoClose={3000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover />
            <Card className={classes.card}>
                <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div className="p-8 h-full bg-light-gray relative">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="OTP"
                                    placeholder="Enter OTP"
                                    onChange={handleChange}
                                    type="text"
                                    name="otp"
                                    value={userInfo.otp}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required'
                                    ]}
                                />

                                {message && (
                                    <p className="text-error">{message}</p>
                                )}

                                <div className="flex flex-wrap items-center mb-4">
                                    <div className="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Verify
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </div>
                                    <span className="mr-2 ml-5">or</span>
                                    <a
                                        className="capitalize"
                                        onClick={resendOtpFunc}
                                        href="#"
                                    >
                                        Resend OTP
                                    </a>
        
                                </div>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default connect()(Otp)
