import React, { useState } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
} from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import history from 'history.js'
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
}))

const JwtRegister = () => {
    const [state, setState] = useState({})
    const classes = useStyles()
    const { register,login } = useAuth()

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = (event) => {
        try {
            register(state.email, state.firstname,state.lastname, state.password,'1')
           // login(state.email,state.password)
            history.push('/otp-verify')
            //history.push('/');
        } catch (e) {
            console.log(e)
        }
    }

    //let { username, email, password, agreement } = state
    let { firstname, lastname, email, password,agreement } = state

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
                    
                    <Grid item>
                        <div className="login_form">
                         <h4>REGISTER</h4>
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="firstname"
                                    value={firstname || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Last name"
                                    onChange={handleChange}
                                    type="text"
                                    name="lastname"
                                    value={lastname || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={email || ''}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                />
                                <TextValidator
                                    className="mb-4 w-full"
                                    placeholder="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <FormControlLabel
                                    className="mb-4"
                                    name="agreement"
                                    validators={['required']}
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: 'agreement',
                                                value: e.target.checked,
                                            },
                                        })
                                    }
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={agreement || false}
                                        />
                                    }
                                    label="I have read and agree to the terms of service."
                                />
                                <div className="flex items-center buton-css">
                                    <Button className="signin"
                                        className="capitalize"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Sign up
                                    </Button>
                                    <span className="mx-2 ml-5">or</span>
                                    <Link to="/session/signin">
                                        <Button className="capitalize">
                                            Sign in
                                        </Button>
                                    </Link>
                                </div>
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

export default JwtRegister
