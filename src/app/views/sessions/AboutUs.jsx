import React, { useState, useEffect } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    Icon
} from '@material-ui/core'
import clsx from 'clsx'
import { connect } from 'react-redux'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './Home.css'
import 'material-react-toastify/dist/ReactToastify.css'

const AboutUs = ({ dispatch }) => {

    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen'
            )}
        >
            <div className="about-us-wrapper">
                    <h3>About Us</h3>
            </div>
        </div>
    )
}

export default connect()(AboutUs)
