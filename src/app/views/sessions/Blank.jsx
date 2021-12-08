import React, { useState, useEffect } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    CircularProgress,
} from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import { makeStyles } from '@material-ui/core/styles'
import history from 'history.js'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import { useSelector } from 'react-redux'
import { connect } from 'react-redux';
import TradingViewWidget, {Themes} from 'react-tradingview-widget';
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import './Home.css';
import axios from 'axios'
import {createAlert} from 'app/redux/actions/common/AlertActions'

const Blank = ({ dispatch }) => {

    const [state, setState] = useState({})
    const [ip, setIP] = useState('');

    //creating function to load ip address from the API
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        setIP(res.data.IPv4)
    }

    useEffect(() => {
       getData()
    }, [])


    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
    }
    const handleFormSubmit = (event) => {
        const params = {highPrice:state.highPrice,lowPrice:state.lowPrice,status:'active',currencySymbol:'SHIBUSDT',ip:ip};
        dispatch(createAlert(params));
        history.push('/home')
    
  }

  let { highPrice, lowPrice } = state
    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen'
            )}
        >
            <div className="home-wrapper">
                <div className="container-fluid">
            {/* Navigation */}
            <nav
                className="navbar navbar-expand-lg text-uppercase "
                id="mainNav"
            >
                
                    <a className="navbar-brand" href="#page-top">
                        Logo
                    </a>
                    <div className="search">
                        <input
                            type="text"
                            id="search"
                            placeholder="Search BY SYMBOL / ADDRESS ...."
                        />{' '}
                    </div>
                    <button
                        className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarResponsive"
                        aria-controls="navbarResponsive"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        Menu
                        <i className="fas fa-bars" />
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarResponsive"
                    >
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item mx-0 mx-lg-1">
                                <a
                                    className="nav-link py-3 px-0 px-lg-3 adervitising"
                                    href="/"
                                >
                                    Adervitising
                                </a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-1">
                                <a
                                    className="nav-link py-3 px-0 px-lg-3 icon"
                                    href="/"
                                >
                                    <img
                                        alt="img-text"
                                        src={process.env.PUBLIC_URL + "//images/pancake.png"}
                                    />
                                </a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-1">
                                <a
                                    className="nav-link py-3 px-0 px-lg-3 icon"
                                    href="/"
                                >
                                    <img
                                        alt="img-text"
                                        src={process.env.PUBLIC_URL + "/images/uniswap.png"}
                                    />
                                </a>
                            </li>
                            <li className="nav-item mx-0 mx-lg-1">
                                <button
                                    type="button"
                                    className="nav-link py-3 px-0 px-lg-3 button"
                                    data-toggle="modal"
                                    data-target="#add_alert2"
                                >
                                    Add Alert
                                </button>
                            </li>
                        </ul>
                    </div>
            </nav>
            <div className="content main-content">
                <div className="row">
                    <div className="col-md-2">
                        <nav className="sidebar sidebar-offcanvas" id="sidebar">
                            <div className="sidebar_div">
                                <h4>Token Info :</h4>
                                <ul className="nav">
                                    <li className="nav-item bnb">
                                        <a
                                            className="nav-link"
                                            href="index.html"
                                        >
                                            <img
                                                alt="img-text"
                                                src={process.env.PUBLIC_URL + "/images/cardano-ada-logo.png"}
                                            />{' '}
                                            <b>
                                                ADA/
                                                <span>BNB</span>
                                            </b>
                                        </a>
                                    </li>
                                </ul>
                                <ul className="nav">
                                    <li className="nav-item alert_icon">
                                        <a
                                            className="nav-link"
                                            href="index.html"
                                        >
                                            <i className="far fa-heart hide_hover" />
                                            <i className="fas fa-heart show_hover" />
                                        </a>
                                        <a
                                            className="nav-link"
                                            href="index.html"
                                        >
                                            <i className="far fa-bell hide_hover" />
                                            <i className="fas fa-bell show_hover" />
                                        </a>
                                    </li>
                                    <div className="price">
                                        <h5>
                                            PRICE: <span>$2.4226</span>
                                        </h5>
                                        <p>PRICE 24h CHANGE: +5%</p>
                                    </div>
                                    <div className="copy">
                                        0x3ee2......435d47{' '}
                                        <img
                                            alt="img-text"
                                            src={process.env.PUBLIC_URL + "/images/copy.png"}
                                        />
                                    </div>
                                    <div className="market_cap">
                                        <p>
                                            MARKET CAP:{' '}
                                            <span>$76,871,158,103</span>
                                        </p>
                                        <p>
                                            VOLUME 24H:{' '}
                                            <span>$4,832,839,159</span>
                                        </p>
                                        <p>
                                            TOTAL SUPPLY:{' '}
                                            <span>33,117,618,880</span>
                                        </p>
                                        <p>
                                            LIQUIDITY: <span>$500,000</span>
                                        </p>
                                    </div>
                                    <div className="pans">
                                        <p>
                                            PANCAKESWAP <a href="/">TRADE</a>
                                        </p>
                                        <p>
                                            <img
                                                alt="img-text"
                                                src={process.env.PUBLIC_URL + "/images/bscscan.png"}
                                            />{' '}
                                            BSC SCAN{' '}
                                            <a href="/">
                                                TRADE{' '}
                                                <img
                                                    alt="img-text"
                                                    src={process.env.PUBLIC_URL + "/images/down.png"}
                                                />
                                            </a>
                                        </p>
                                        <p>MEDIA</p>
                                        <p className="media_icon">
                                            <a href="/">
                                                <i className="fas fa-globe-africa" />
                                            </a>
                                            <a href="/">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a href="/">
                                                <i className="fab fa-telegram-plane" />
                                            </a>
                                            <a href="/">
                                                <i className="fab fa-reddit-alien" />
                                            </a>
                                        </p>
                                    </div>
                                </ul>
                            </div>
                            <div className="sidebar_div">
                                <div className="sise_title">
                                    <b className="ads">ADS</b> APP ADS -{' '}
                                    <span>
                                        <a href="/">Contact us!</a>
                                    </span>
                                </div>
                                <div
                                    id="carouselExampleSlidesOnly"
                                    className="carousel slide"
                                    data-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                        <div className="carousel-item">
                                            <div className="slide_box">
                                                slide 1
                                            </div>
                                        </div>
                                        <div className="carousel-item">
                                            <div className="slide_box">
                                                slide 2
                                            </div>
                                        </div>
                                        <div className="carousel-item active">
                                            <div className="slide_box">
                                                slide 3
                                            </div>
                                        </div>
                                        <a
                                            className="carousel-control-prev"
                                            href="#carouselExampleSlidesOnly"
                                            role="button"
                                            data-slide="prev"
                                        >
                                            <img
                                                alt="img-text"
                                                src={process.env.PUBLIC_URL + "/images/left.png"}
                                            />
                                        </a>
                                        <a
                                            className="carousel-control-next"
                                            href="#carouselExampleSlidesOnly"
                                            role="button"
                                            data-slide="next"
                                        >
                                            <img
                                                alt="img-text"
                                                src={process.env.PUBLIC_URL + "/images/right.png"}
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-12" id="cruncy-chart">
                                <TradingViewWidget
                                    symbol="SHIBUSDT"
                                    theme={Themes.DARK}
                                    locale="en"
                                    autosize
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8 col-xl-8 mb-12 mb-xl-0 pricing-table">
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>TYPE</th>
                                                <th>TOKEN</th>
                                                <th>PRICE</th>
                                                <th>PRICE/TOKEN</th>
                                                <th>TIME</th>
                                                <th>TX</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="buy">BUY</td>
                                                <td>0.001673169 ADA</td>
                                                <td>
                                                    0.05976700 WBNB |{' '}
                                                    <span>$24.22</span>
                                                </td>
                                                <td>
                                                    0.005940283 WBNB |{' '}
                                                    <span>$2.40712144</span>
                                                </td>
                                                <td>11:44:16</td>
                                                <td className="tx">
                                                    ...c9758aac9b
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="buy">BUY</td>
                                                <td>0.001673169 ADA</td>
                                                <td>
                                                    0.05976700 WBNB |{' '}
                                                    <span>$24.22</span>
                                                </td>
                                                <td>
                                                    0.005940283 WBNB |{' '}
                                                    <span>$2.40712144</span>
                                                </td>
                                                <td>11:44:16</td>
                                                <td className="tx">
                                                    ...c9758aac9b
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="sell">BUY</td>
                                                <td>0.001673169 ADA</td>
                                                <td>
                                                    0.05976700 WBNB |{' '}
                                                    <span>$24.22</span>
                                                </td>
                                                <td>
                                                    0.005940283 WBNB |{' '}
                                                    <span>$2.40712144</span>
                                                </td>
                                                <td>11:44:16</td>
                                                <td className="tx">
                                                    ...c9758aac9b
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="buy">BUY</td>
                                                <td>0.001673169 ADA</td>
                                                <td>
                                                    0.05976700 WBNB |{' '}
                                                    <span>$24.22</span>
                                                </td>
                                                <td>
                                                    0.005940283 WBNB |{' '}
                                                    <span>$2.40712144</span>
                                                </td>
                                                <td>11:44:16</td>
                                                <td className="tx">
                                                    ...c9758aac9b
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="sell">BUY</td>
                                                <td>0.001673169 ADA</td>
                                                <td>
                                                    0.05976700 WBNB |{' '}
                                                    <span>$24.22</span>
                                                </td>
                                                <td>
                                                    0.005940283 WBNB |{' '}
                                                    <span>$2.40712144</span>
                                                </td>
                                                <td>11:44:16</td>
                                                <td className="tx">
                                                    ...c9758aac9b
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="col-4 col-xl-4 mb-12 mb-xl-0">
                                <div className="promo_tab">
                                    <ul className="nav nav-tabs">
                                        <li>
                                            <a
                                                className="active"
                                                data-toggle="tab"
                                                href="#promoted"
                                            >
                                                promoted
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                data-toggle="tab"
                                                href="#trending"
                                            >
                                                Trending
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                data-toggle="tab"
                                                href="#listing"
                                            >
                                                New Listings 2
                                            </a>
                                        </li>
                                        <li>
                                            <a data-toggle="tab" href="#fav">
                                                Favourite
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div
                                            id="promoted"
                                            className="tab-pane fade in active show"
                                        >
                                            <ul>
                                                <li>
                                                    <span className="pro_check">
                                                        {' '}
                                                        <img
                                                            alt="img-text"
                                                            src={process.env.PUBLIC_URL + "/images/check.png"}
                                                        />
                                                    </span>{' '}
                                                    <span className="pro_title">
                                                        Token Name
                                                    </span>{' '}
                                                    |{' '}
                                                    <span className="pro_price">
                                                        Price
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="pro_check">
                                                        {' '}
                                                        <img
                                                            alt="img-text"
                                                            src={process.env.PUBLIC_URL + "/images/check.png"}
                                                        />
                                                    </span>{' '}
                                                    <span className="pro_title">
                                                        Token Name
                                                    </span>{' '}
                                                    |{' '}
                                                    <span className="pro_price">
                                                        Price
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="pro_check">
                                                        {' '}
                                                        <img
                                                            alt="img-text"
                                                            src={process.env.PUBLIC_URL + "/images/check.png"}
                                                        />
                                                    </span>{' '}
                                                    <span className="pro_title">
                                                        Token Name
                                                    </span>{' '}
                                                    |{' '}
                                                    <span className="pro_price">
                                                        Price
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="pro_check">
                                                        {' '}
                                                        <img
                                                            alt="img-text"
                                                            src={process.env.PUBLIC_URL + "/images/check.png"}
                                                        />
                                                    </span>{' '}
                                                    <span className="pro_title">
                                                        Token Name
                                                    </span>{' '}
                                                    |{' '}
                                                    <span className="pro_price">
                                                        Price
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="pro_check">
                                                        {' '}
                                                        <img
                                                            alt="img-text"
                                                            src={process.env.PUBLIC_URL + "/images/check.png"}
                                                        />
                                                    </span>{' '}
                                                    <span className="pro_title">
                                                        Token Name
                                                    </span>{' '}
                                                    |{' '}
                                                    <span className="pro_price">
                                                        Price
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="pro_check">
                                                        {' '}
                                                        <img
                                                            alt="img-text"
                                                            src={process.env.PUBLIC_URL + "/images/check.png"}
                                                        />
                                                    </span>{' '}
                                                    <span className="pro_title">
                                                        Token Name
                                                    </span>{' '}
                                                    |{' '}
                                                    <span className="pro_price">
                                                        Price
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div
                                            id="trending"
                                            className="tab-pane fade"
                                        >
                                            <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                </span>{' '}
                                                <span className="pro_title">
                                                    Token Name
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                    Price
                                                </span>
                                            </li>
                                            <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                </span>{' '}
                                                <span className="pro_title">
                                                    Token Name
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                    Price
                                                </span>
                                            </li>
                                        </div>
                                        <div
                                            id="listing"
                                            className="tab-pane fade"
                                        >
                                            <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                </span>{' '}
                                                <span className="pro_title">
                                                    Token Name
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                    Price
                                                </span>
                                            </li>
                                            <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                </span>{' '}
                                                <span className="pro_title">
                                                    Token Name
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                    Price
                                                </span>
                                            </li>
                                            <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                </span>{' '}
                                                <span className="pro_title">
                                                    Token Name
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                    Price
                                                </span>
                                            </li>
                                        </div>
                                        <div id="fav" className="tab-pane fade">
                                            <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                </span>{' '}
                                                <span className="pro_title">
                                                    Token Name
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                    Price
                                                </span>
                                            </li>
                                            <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                </span>{' '}
                                                <span className="pro_title">
                                                    Token Name
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                    Price
                                                </span>
                                            </li>
                                            <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                </span>{' '}
                                                <span className="pro_title">
                                                    Token Name
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                    Price
                                                </span>
                                            </li>
                                            <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                </span>{' '}
                                                <span className="pro_title">
                                                    Token Name
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                    Price
                                                </span>
                                            </li>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Left and right controls  */}
            </div>
            </div>
            <div
                className="modal fade"
                id="add_alert2"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="alert_text2 text-center">
                                <img alt="img-text" src={process.env.PUBLIC_URL + "/images/noti.png"} />
                                <h4>Set up an alarm</h4>
                                <ValidatorForm onSubmit={handleFormSubmit}>
                                    <ul>
                                        <li>
                                        <TextValidator
                                                className="mb-6 w-full"
                                                variant="outlined"
                                                size="small"
                                                label="High price"
                                                placeholder="High price...."
                                                onChange={handleChange}
                                                type="text"
                                                name="highPrice"
                                                value={highPrice || ''}
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                            />
                                            {/* <input
                                                type="text"
                                                placeholder="High price...."
                                            /> */}
                                             <Button
                                                className="capitalize clear"
                                                variant="contained"
                                                type="button"
                                            >
                                                CLEAR
                                            </Button>
                                        </li>
                                        <li>
                                        <TextValidator
                                                className="mb-6 w-full"
                                                variant="outlined"
                                                size="small"
                                                label="Low price"
                                                placeholder="Low price...."
                                                onChange={handleChange}
                                                type="text"
                                                name="lowPrice"
                                                value={lowPrice || ''}
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                            />
                                             <Button
                                                className="capitalize clear"
                                                variant="contained"
                                                type="button"
                                            >
                                                CLEAR
                                            </Button>
                                        </li>
                                        <li>
                                            <Button
                                                className="capitalize clear"
                                                variant="contained"
                                                type="button"
                                            >
                                                CLEAR
                                            </Button>
                                            <Button
                                                className="capitalize accept"
                                                variant="contained"
                                                type="submit"
                                            >
                                                ACCEPT
                                            </Button>
                                        </li>
                                    </ul>
                                </ValidatorForm>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default connect()(Blank)
