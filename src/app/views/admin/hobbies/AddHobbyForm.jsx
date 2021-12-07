import React, { useState, useEffect } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    Checkbox,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/core/styles'
import { SERVICE_URL, DEFAULT_SERVICE_VERSION } from "../../../constants/utility"
import axios from 'axios'
import history from 'history.js'
import {createHobby} from 'app/redux/actions/admin/hobby/HobbyActions'
import { connect } from 'react-redux';

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
const AddHobbyForm = ({ dispatch }) => {
    const [state, setState] = useState({
        date: new Date(),
    })
    const [status, setStatus] = React.useState('');
    const classes = useStyles()

    const handleSubmit = (event) => {
        
          const params = {name:state.hobby_name,status:state.Status};
          dispatch(createHobby(params));
          history.push('/hobby/list')
      
    }

    const handleChange = (event) => {
        event.persist()
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
        setStatus(event.target.value)
    }

    const handleDateChange = (date) => {
        setState({ ...state, date })
    }

    const {
        hobby_name,
        Status,
    } = state

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                        variant="outlined"
                            className="mb-4 w-full"
                            label="Hobby Name"
                            onChange={handleChange}
                            type="text"
                            name="hobby_name"
                            value={hobby_name || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <FormControl variant="outlined" className={classes.formControl+" mb-4 w-full"}>
                         <InputLabel id="demo-simple-select-outlined-label">Status</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={status}
                            onChange={handleChange}
                            label="Status"
                            name="Status"
                            >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="active">Active</MenuItem>
                            <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Save</span>
                </Button>
            </ValidatorForm>
        </div>
    )
}

export default connect()(AddHobbyForm)
