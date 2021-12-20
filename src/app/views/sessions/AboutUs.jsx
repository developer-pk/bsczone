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
import Header from './common/Header'
import Footer from './common/Footer'

const AboutUs = ({ dispatch }) => {

    return (
        <div>
            <Header />
       
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen'
            )}
        >

 
  



            <div className="AboutUs">
                <div className="about-us-wrapper">
                    <div className="container">
                    <div className="col-12">
                    <div className="about_text">
                    <h2>About Us</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing 
                    and typesetting industry. Lorem Ipsum has been the i
                    ndustry's standard dummy text ever since the 1500s, 
                    when an unknown printer took a galley of type and 
                    scrambled it to make a type specimen book. 
                    </p>
                    <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    )
}

export default connect()(AboutUs)
