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

const JwtRegisterNextStep3 = () => {
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
            history.push('/session/signup-step-6')
        } catch (e) {
            console.log(e)
        }
    }

    let { company_revenue, college, hiring, career, company_size, } = state
    const items = [];
    return (
        <div className="m-sm-30">
        <div className="mb-sm-30">
            <Breadcrumb
                routeSegments={[
                    { name: 'Profile Step - 5', path: '/' },
                    { name: 'Update Profile' },
                ]}
            />
        </div>
        <Card className="px-6 pt-2 pb-4">
        <ValidatorForm onSubmit={handleFormSubmit}>
                            <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="College or University"
                                    onChange={handleChange}
                                    type="text"
                                    name="college"
                                    value={college || ''}
                                />
                               <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Are You Hiring?</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="hiring"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Are you looking for new career?</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name="career"
                                    value={age}
                                    onChange={handleChange}
                                    label="Are you looking for new career"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
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

export default JwtRegisterNextStep3
