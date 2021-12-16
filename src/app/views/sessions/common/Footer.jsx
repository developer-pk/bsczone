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
import '../../../../../node_modules/bootstrap/dist/css/bootstrap.css'
import '../Home.css'
import 'material-react-toastify/dist/ReactToastify.css'

const Footer = ({ dispatch }) => {

    return (
            <div className="common-footer-wrapper">
            footer
            </div>
    )
}

export default connect()(Footer)
