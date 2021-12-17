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
            <div className="footer">
            <div className="container">
                <ul>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms & Conditions</a></li>
                </ul>
                <div className="footer_bottom">&copy; all right reserved.</div>
            </div>
            </div>
            </div>
    )
}

export default connect()(Footer)
