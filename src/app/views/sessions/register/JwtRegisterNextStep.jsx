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
    NativeSelect
} from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'
import history from 'history.js'
import { Country, State, City } from 'country-state-city'
import { getCountry } from 'app/redux/actions/common/CountryActions'
import { getState } from 'app/redux/actions/common/StateActions'
import { getCity } from 'app/redux/actions/common/CityActions'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { Breadcrumb } from 'app/components'
import { createProfile } from 'app/redux/actions/common/UpdateProfileActions'

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

const JwtRegisterNextStep = ({ dispatch }) => {
    const [state, setState] = useState({})
    const classes = useStyles()
    const { register } = useAuth()
    const [age, setAge] = React.useState('')
    const firstnameVal = localStorage.getItem('firstname')
    const lastnameVal = localStorage.getItem('lastname')
    const emailVal = localStorage.getItem('email')

    const { country, states, city } = useSelector((state) => state)

    const [countryId, setCountryId] = React.useState('')
    const [stateId, setStateId] = React.useState('')
    const [countryVal, setCountryVal] = React.useState('')
    const [stateVal, setStateVal] = React.useState('')
    console.log(states, 'yes')
    
    useEffect(() => {
        dispatch(getCountry())
        console.log(countryVal,'how many time in country effect');
    }, [])

    useEffect(() => {
        dispatch(getCountry())
        dispatch(getState(countryId))
        console.log(countryVal,'how many time in state effect');
        
    }, [countryId])

    useEffect(() => {
        dispatch(getCountry())
        dispatch(getCity(stateId))
        console.log(countryVal,'how many time in city effect');
    }, [stateId])

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        });
       setCountryId(event.currentTarget.getAttribute('data-src'))
       setCountryVal(event.target.value);
       setStateVal(event.target.value);
        setStateId(event.currentTarget.getAttribute('data-src'))
        
    }

    const handleFormSubmit = async (event) => {
        try {
            console.log(state,'get submitted values');
            const profileData = {
                firstname:firstnameVal,
                lastname:lastnameVal,
                contact:state.phone,
                gender:state.gender,
                postalCode:state.pincode,
                countryId:state.country,
                stateId:state.state,
                cityId:state.city,
                steps:"2",

            };
           await dispatch(createProfile(profileData));
            history.push('/session/signup-step-3')
        } catch (e) {
            console.log(e)
        }
    }

    let {
        firstname,
        lastname,
        phone,
        gender,
        state_city,
        email,
        pincode,
    } = state

    return (
        <div className="m-sm-30">
        <div className="mb-sm-30">
            <Breadcrumb
                routeSegments={[
                    { name: 'Profile Step - 2', path: '/' },
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
                                    label="First Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="firstname"
                                    value={firstnameVal || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Last Name"
                                    onChange={handleChange}
                                    type="text"
                                    name="lastname"
                                    value={lastnameVal || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="text"
                                    name="email"
                                    value={emailVal || ''}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <TextValidator
                                    className="mb-4 w-full"
                                    label="Phone"
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                    name="phone"
                                    type="text"
                                />
                                 <TextValidator
                                    className="mb-4 w-full"
                                    label="Pincode"
                                    onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                    name="pincode"
                                    type="text"
                                />
                                <FormControl
                                    variant="outlined"
                                    className={
                                        classes.formControl + ' mb-4 w-full'
                                    }
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Gender
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="Gender"
                                        name="gender"
                                        onChange={handleChange}
                                        validators={['required']}
                                        errormessages={[
                                            'this field is required',
                                        ]}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={
                                        classes.formControl + ' mb-4 w-full'
                                    }
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Country
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={handleChange}
                                        label="Country"
                                        name="country"
                                        validators={['required']}
                                        errormessages={[
                                            'this field is required',
                                        ]}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        { country.map((val,index) => (
                                            <MenuItem
                                            key={index}
                                            data-src={val.id}
                                            value={val.id}
                                            >
                                            {val.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>

                                <FormControl
                                    variant="outlined"
                                    className={
                                        classes.formControl + ' mb-4 w-full'
                                    }
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        State
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={handleChange}
                                        label="State"
                                        name="state"
                                        validators={['required']}
                                        errormessages={[
                                            'this field is required',
                                        ]}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        { states.map((val) => (
                                            val.map((val1) => (
                                            <MenuItem
                                            key={val1.name}
                                            data-src={val._id}
                                            value={val1._id}
                                            >
                                            {val1.name}
                                            </MenuItem>
                                        ))  ))}
                                    </Select>
                                </FormControl>
                                <FormControl
                                    variant="outlined"
                                    className={
                                        classes.formControl + ' mb-4 w-full'
                                    }
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        City
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={handleChange}
                                        label="City"
                                        name="city"
                                        validators={['required']}
                                        errormessages={[
                                            'this field is required',
                                        ]}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        { city.map((val) => (
                                            val.map((val2) => (
                                            <MenuItem
                                            key={val2.name}
                                            data-src={val._id}
                                            value={val2._id}
                                            >
                                            {val2.name}
                                            </MenuItem>
                                        )) ))}
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
                                        className="capitalize "
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

export default connect()(JwtRegisterNextStep)
