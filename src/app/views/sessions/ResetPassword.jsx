import React, { useState, useEffect } from 'react'
import { Card, Grid, Button } from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Header from './common/Header'
import Footer from './common/Footer'

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

const ResetPassword = () => {
    const [state, setState] = useState({})
    const classes = useStyles()

    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value)

            if (value !== state.password) {
                return false
            }
            return true
        })
        return () => ValidatorForm.removeValidationRule('isPasswordMatch')
    }, [state.password])

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }

    const handleFormSubmit = (event) => {
        console.log(state)
    }

    let { password, confirm_password } = state

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
                        <h4>RESET PASSWORD</h4>
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    size="small"
                                    value={password || ''}
                                    validators={['required']}
                                    errorMessages={[
                                        'this field is required'
                                    ]}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    type="password"
                                    name="confirm_password"
                                    size="small"
                                    value={confirm_password || ''}
                                    validators={['isPasswordMatch', 'required']}
                                    errorMessages={['password mismatch', 'this field is required']}
                                />
                                <div className="flex items-center">
                                    <Button className="signin"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Reset Password
                                    </Button>
                                    <span className="ml-4 mr-2">or</span>
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

export default ResetPassword
