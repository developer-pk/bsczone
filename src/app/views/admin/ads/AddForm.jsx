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
import {createAds} from 'app/redux/actions/admin/ads/AdsActions'
import { connect } from 'react-redux';
import { RichTextEditor, Breadcrumb } from 'app/components'

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
const AddForm = ({ dispatch }) => {
    const [state, setState] = useState({
        date: new Date(),
    })
    const [status, setStatus] = React.useState('');
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

    const handleSubmit = (event) => {
        
          const params = {title:state.industry_name,ads:state.ads,status:state.Status};
          dispatch(createAds(params));
          history.push('/ads/list')
      
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
        industry_name,
        Status,
        ads
    } = state

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                        variant="outlined"
                            className="mb-4 w-full"
                            label="Ads Title"
                            onChange={handleChange}
                            type="text"
                            name="industry_name"
                            value={industry_name || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <RichTextEditor
                        onChange={handleChange}
                        content=""
                        placeholder="insert text here..."
                        name="ads"
                        value={ads || ''}
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

export default connect()(AddForm)
