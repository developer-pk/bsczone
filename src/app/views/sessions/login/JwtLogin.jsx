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
import Header from '../common/Header'
import Footer from '../common/Footer'

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

const JwtLogin = () => {
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    })
    // const [userInfo, setUserInfo] = useState({
    //     email: 'jason@ui-lib.com',
    //     password: 'dummyPass',
    // })
    const [message, setMessage] = useState('')
    const { login } = useAuth();

    const classes = useStyles()

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
            await login(userInfo.email, userInfo.password)
            const role = localStorage.getItem('userRole');
            // if(role == "admin"){

            //     history.push('/dashboard')
                
            // }else if(role == "user" && localStorage.getItem('step') == "1"){

            //     history.push('/session/signup-step-2')
                
            // }else if(role == "user" && localStorage.getItem('step') == "2"){

            //     history.push('/session/signup-step-3')

            // }else if(role == "user" && localStorage.getItem('step') == "3"){
            //     history.push('/session/signup-step-4')
            // }else if(role == "user" && localStorage.getItem('step') == "4"){
            //     history.push('/session/signup-step-5')
            // }else if(role == "user" && localStorage.getItem('step') == "5"){
            //     history.push('/session/signup-step-6')
            // }else{
                history.push('/dashboard')
            //}
            
        } catch (e) {
            console.log(e)
            setMessage(e.message)
            setLoading(false)
        }
    }

    return (
        <div>
            <Header />
       
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen',
                classes.cardHolder
            )}
        >
            <Card className={classes.card}>
                <Grid container>
                    
                    <Grid>
                        <div className="login_form">
                        <h4>LOGIN</h4>
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                />
                                <TextValidator
                                    className="mb-3 w-full"
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={userInfo.password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <FormControlLabel
                                    className="mb-3 min-w-288"
                                    name="agreement"
                                    onChange={handleChange}
                                    control={
                                        <Checkbox
                                            size="small"
                                            onChange={({
                                                target: { checked },
                                            }) =>
                                                handleChange({
                                                    target: {
                                                        name: 'agreement',
                                                        value: checked,
                                                    },
                                                })
                                            }
                                            checked={userInfo.agreement || true}
                                        />
                                    }
                                    label="Remeber me"
                                />

                                {message && (
                                    <p className="text-error">{message}</p>
                                )}

                                <div className="flex flex-wrap items-center mb-4 buton-css">
                                    <div className="relative">
                                        <Button className="signin"
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Sign in
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
                                    <Button
                                        className="capitalize"
                                        onClick={() =>
                                            history.push('/session/signup')
                                        }
                                    >
                                        Sign up
                                    </Button>
                                </div>
                                <Button
                                    className="text-primary"
                                    onClick={() =>
                                        history.push('/session/forgot-password')
                                    }
                                >
                                    Forgot password?
                                </Button>
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
        <Footer />
        </div>
    )
}

export default connect()(JwtLogin)
