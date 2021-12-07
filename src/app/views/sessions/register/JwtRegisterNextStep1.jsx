import React, { useState, useEffect } from 'react'
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
import { useSelector } from 'react-redux'
import { connect } from 'react-redux';
import {getIndustry} from 'app/redux/actions/admin/industry/IndustryActions'
import {getJobTitle} from 'app/redux/actions/admin/jobtitle/JobTitleActions'
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

const JwtRegisterNextStep1 = ({ dispatch }) => {
    const [state, setState] = useState({})
    const classes = useStyles()
    const { register } = useAuth()
    const [age, setAge] = React.useState('');
    const firstnameVal = localStorage.getItem('firstname');
    const lastnameVal = localStorage.getItem('lastname');
    const emailVal = localStorage.getItem('email');

    const {industry,jobtitle} = useSelector(state=>state);

    useEffect(() => {
        dispatch(getIndustry())
        dispatch(getJobTitle())
    }, [])

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        });
        setAge(value);

    }

    const handleFormSubmit = (event) => {
        try {

            history.push('/session/signup-step-4')
        } catch (e) {
            console.log(e)
        }
    }

    let { out_from_usa, job_title, industryField, business_owner, linkedin_profile, } = state
    const items = [];
    return (
        <div className="m-sm-30">
        <div className="mb-sm-30">
            <Breadcrumb
                routeSegments={[
                    { name: 'Profile Step - 3', path: '/' },
                    { name: 'Update Profile' },
                ]}
            />
        </div>
        <Card className="px-6 pt-2 pb-4">
        <ValidatorForm onSubmit={handleFormSubmit}>
                            <FormControlLabel
                                    className="mb-4"
                                    name="out_from_usa"
                                    onChange={(e) =>
                                        handleChange({
                                            target: {
                                                name: 'out_from_usa',
                                                value: e.target.checked,
                                            },
                                        })
                                    }
                                    control={
                                        <Checkbox
                                            size="small"
                                            checked={out_from_usa || false}
                                        />
                                    }
                                    label="If you are out from USA."
                                />
                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Job Title</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    name="job_title"
                                    value={age}
                                    onChange={handleChange}
                                    label="Job Title"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    { jobtitle.map((val) => (
                                            <MenuItem
                                            key={val.name}
                                            data-src={val.id}
                                            value={val.name}
                                            >
                                            {val.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Industry</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="Industry"
                                    name="industryField"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    { industry.map((val) => (
                                            <MenuItem
                                            key={val.name}
                                            data-src={val.id}
                                            value={val.name}
                                            >
                                            {val.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Are You a Business Owner?</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="business_owner"
                                    >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Linkedin Profile"
                                    onChange={handleChange}
                                    type="text"
                                    name="linkedin_profile"
                                    value={linkedin_profile || ''}
                                />
                                <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                                 <InputLabel id="demo-simple-select-outlined-label">Company Name</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={age}
                                    onChange={handleChange}
                                    label="Company Name"
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

export default connect()(JwtRegisterNextStep1)
