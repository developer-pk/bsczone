import React, { useState, useEffect } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    Icon
} from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import { makeStyles } from '@material-ui/core/styles'
import history from 'history.js'
import clsx from 'clsx'
import { connect } from 'react-redux'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './Home.css'
import 'material-react-toastify/dist/ReactToastify.css'

const TermsAndCondition = ({ dispatch }) => {

    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen'
            )}
        >
            <div className="terms-and-condition-wrapper container">
                <h3 className="m-8">Terms and Condition</h3>
            </div>
        </div>
    )
}

export default connect()(TermsAndCondition)
