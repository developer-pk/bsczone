import React, { useState } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    FormRow,

} from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import history from 'history.js'
import { Breadcrumb } from 'app/components'

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

const JwtRegisterNextStep2 = () => {
    const [state, setState] = useState({})
    const classes = useStyles()
    const { register } = useAuth()
    const [age, setAge] = React.useState('');
    const firstnameVal = localStorage.getItem('firstname');
    const lastnameVal = localStorage.getItem('lastname');
    const emailVal = localStorage.getItem('email');

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        });
        console.log(setAge(value));

    }

    const handleFormSubmit = (event) => {
        try {
            history.push('/session/signup-step-5')
        } catch (e) {
            console.log(e)
        }
    }

    let { hobbies, job_title, industry, business_owner, linkedin_profile, } = state
    const items = [];
    return (
        <div className="m-sm-30">
        <div className="mb-sm-30">
            <Breadcrumb
                routeSegments={[
                    { name: 'Profile Step - 4', path: '/' },
                    { name: 'Update Profile' },
                ]}
            />
        </div>
        <Card className="px-6 pt-2 pb-4">
        <ValidatorForm onSubmit={handleFormSubmit}>
                               <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Hobbies/Interests</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="hobbies"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">What product or service do you need that can help you with your career, business or personal life?</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name="service_need"
                                    value={age}
                                    onChange={handleChange}
                                    label="Enter Services/Products"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value={20}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">What product or service are you offering that we can help you promote?</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="Enter Services/Products"
                                    name="service_offer"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value={20}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                                
                               
                                <div className="flex items-center">
                                <Button
                                        className="capitalize"
                                        variant="contained"
                                        color="primary"
                                        type="button"
                                        onClick={history.goBack}
                                    >
                                        Previous
                                    </Button>
                                    <span className="mx-2 ml-5"></span>
                                    <Button
                                        className="capitalize"
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                       Next
                                    </Button>
                                </div>
                            </ValidatorForm>
        </Card>
    </div>
     
    )
}

export default JwtRegisterNextStep2
