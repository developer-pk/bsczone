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

const JwtRegisterNextStep4 = () => {
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
            console.log(localStorage.getItem('accessToken'),'local storage');return false;
            register(state.email, state.username, state.password)
            history.push('/')
        } catch (e) {
            console.log(e)
        }
    }

    let { job_title_to_connected_with, industries_to_connected_with, companies_to_connected_with, company_revenue, company_size, locations} = state
    const items = [];
    return (
        <div className="m-sm-30">
        <div className="mb-sm-30">
            <Breadcrumb
                routeSegments={[
                    { name: 'Profile Step - 6', path: '/' },
                    { name: 'Update Profile' },
                ]}
            />
        </div>
        <Card className="px-6 pt-2 pb-4">
        <ValidatorForm onSubmit={handleFormSubmit}>
                               <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Job Titles of people you want to be connected with</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="job_title_to_connected_with"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Industries of professionals you want to be connected with</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name="industries_to_connected_with"
                                    value={age}
                                    onChange={handleChange}
                                    label="Industries of professionals you want to be connected with"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Companies of professionals you want to connect with (Optional)</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="Companies of professionals you want to connect with (Optional)"
                                    name="companies_to_connected_with"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value={20}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Company Size (Optional)?</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="Company Size (Optional)?"
                                    name="company_size"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value={20}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Company Revenue (Optional)?</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="Company Revenue (Optional)?"
                                    name="company_revenue"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value={20}>Female</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Select in which locations you would like to do business. Example: AL - Birmingham, AR - Little Rock, CA - Oakland</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="Select in which locations you would like to do business. Example: AL - Birmingham, AR - Little Rock, CA - Oakland"
                                    name="locations"
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
                                       Submit
                                    </Button>
                                </div>
                            </ValidatorForm>
        </Card>
    </div>
    )
}

export default JwtRegisterNextStep4
