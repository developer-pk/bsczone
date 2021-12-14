import React, { useState, useEffect } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    Icon,
} from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import { makeStyles } from '@material-ui/core/styles'
import history from 'history.js'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
import TradingViewWidget, { Themes } from 'react-tradingview-widget'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css'
import './Home.css'
import axios from 'axios'
import { createContactUs } from 'app/redux/actions/frontend/ContactUsActions'
import { ToastContainer, toast } from 'material-react-toastify'
import 'material-react-toastify/dist/ReactToastify.css'
import { getContactUs } from 'app/redux/actions/frontend/ContactUsActions'
import { RichTextEditor, Breadcrumb } from 'app/components'
import Header from './common/Header'
import Footer from './common/Footer'

const ContactUs = ({ dispatch }) => {
    const [state, setState] = useState({})
    const [content, setContent] = useState(
        `<h1>Matx | Matx Pro Admin Template</h1><p><a href="http://matx-react.ui-lib.com/" target="_blank"><strong>Matx</strong></a></p><p><br></p><p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>`
    )

    useEffect(() => {
        const params = { type: 'GET_CONTACT_US' }
        dispatch(getContactUs(params))
    }, [])

    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
        setContent(value)
    }
    const handleSubmit = (event) => {
        const params = {
            name: state.name,
            phoneNumber: state.phone,
            email: state.email,
            subject: state.subject,
            message: content,
            status: 'unread',
        }
        dispatch(createContactUs(params))
        history.push('/home')
    }

    let { name, email, subject, message, phone } = state
    return (
        <div>
            <Header />
            <div
                className={clsx(
                    'flex justify-center items-center  min-h-full-screen'
                )}
            >
                <div className="contact-us-wrapper container">
                    <h3 className="m-8">Feel Free to Contact Us</h3>
                    <Grid container>
                        <Grid item lg={5} md={5} sm={5} xs={12}>
                            <div className="contact_section">
                                <div className="heading">
                                    <h4>Contact Us</h4>
                                </div>
                                <div className="email_area contact_common">
                                    <i className="far fa-envelope"></i> Email :
                                    query@yopmail.com
                                </div>

                                <div className="contact_media">
                                    Follow Us on
                                </div>
                                <p className="media_icon">
                                    <a href="/" target="_blank">
                                        <i className="fas fa-globe-africa" />
                                    </a>
                                    <a
                                        href="https://twitter.com/"
                                        target="_blank"
                                    >
                                        <i className="fab fa-twitter" />
                                    </a>
                                    <a
                                        href="https://telegram.org/"
                                        target="_blank"
                                    >
                                        <i className="fab fa-telegram-plane" />
                                    </a>
                                    <a
                                        href="https://www.reddit.com/"
                                        target="_blank"
                                    >
                                        <i className="fab fa-reddit-alien" />
                                    </a>
                                </p>

                            <img
                                className="w-200"
                                src="/assets/images/illustrations/dreamer.svg"
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="">
                        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                        <TextValidator
                            variant="outlined"
                            className="mb-4 w-full"
                            label="Name"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={name || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            variant="outlined"
                            className="mb-4 w-full"
                            label="Email"
                            onChange={handleChange}
                            type="text"
                            name="email"
                            value={email || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            variant="outlined"
                            className="mb-4 w-full"
                            label="Phone"
                            onChange={handleChange}
                            type="text"
                            name="phone"
                            value={phone || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                         <TextValidator
                            variant="outlined"
                            className="mb-4 w-full"
                            label="Subject"
                            onChange={handleChange}
                            type="text"
                            name="subject"
                            value={subject || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />

                                    {/* <TextField
                            variant="outlined"
                            className="mb-4 w-full"
                            label="Message"
                            onChange={handleChange}
                            type="text"
                            name="message"
                            value={message || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        /> */}
                                    <textarea
                                        className="mb-4 w-full"
                                        variant="outlined"
                                        label="Message"
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="insert message here..."
                                        name="message"
                                        rows={5}
                                        cols={5}
                                    />

                                    {/* <RichTextEditor
                            content={content}
                            handleContentChange={(content) => setContent(content)}
                            placeholder="insert message here..."
                            name="message"
                         /> */}

                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        <Icon>send</Icon>
                                        <span className="pl-2 capitalize">
                                            Save
                                        </span>
                                    </Button>
                                </ValidatorForm>
                            </div>
                        </Grid>
                    </Grid>
                    {/* <div className="m-sm-30">
                <div className="mb-sm-30">
                    <Breadcrumb
                        routeSegments={[
                            { name: 'Contact Us', path: '/contact-us/list' },
                            { name: 'Feel Free to Contact Us' },
                        ]}
                    />
                </div>
                <Card className="px-6 pt-2 pb-4">
                <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextValidator
                            variant="outlined"
                            className="mb-4 w-full"
                            label="Name"
                            onChange={handleChange}
                            type="text"
                            name="name"
                            value={name || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            variant="outlined"
                            className="mb-4 w-full"
                            label="Email"
                            onChange={handleChange}
                            type="text"
                            name="email"
                            value={email || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                        <TextValidator
                            variant="outlined"
                            className="mb-4 w-full"
                            label="Phone"
                            onChange={handleChange}
                            type="text"
                            name="phone"
                            value={phone || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                         <TextValidator
                            variant="outlined"
                            className="mb-4 w-full"
                            label="Subject"
                            onChange={handleChange}
                            type="text"
                            name="subject"
                            value={subject || ''}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                          <RichTextEditor
                            content={content}
                            handleContentChange={(content) => setContent(content)}
                            placeholder="insert message here..."
                            name="message"
                    />
                    </Grid>
                </Grid>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Save</span>
                </Button>
            </ValidatorForm>
                </Card>
            </div> */}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default connect()(ContactUs)
