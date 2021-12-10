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
import './Home.css';
import axios from 'axios'
import {createAlert} from 'app/redux/actions/common/AlertActions'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {getAds, deleteAds} from 'app/redux/actions/admin/ads/AdsActions'
import { $CombinedState } from 'redux'
import { Modal, Form } from "react-bootstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const Blank = ({ dispatch }) => {

    const [state, setState] = useState({})
    const [ip, setIP] = useState('');
    const [message, setMessage] = useState('')
    const {ads} = useSelector(state=>state);
   // const [show, setShow] = useState({})

    const [show, setShow] = useState(false);
    const [copied, setCopy] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


    //creating function to load ip address from the API
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        console.log(res.data);
        setIP(res.data.IPv4)
    }

    useEffect(() => {
       getData()
       const params={type:'GET_ADS'};
       dispatch(getAds(params));
    }, [])


    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
       // sethighPrice(value);
      //  setlowPrice(value);
    }
    const handleFormSubmit = (event) => {
        const params = {highPrice:highPrice,lowPrice:lowPrice,status:'active',currencySymbol:'SHIBUSDT',ip:ip};
        console.log(params,'get it');
        dispatch(createAlert(params));
        toast.success("Alert added successfully.");
        setState({highPrice:'',lowPrice:''});
        setShow(false);
        //history.push('/home')
        //$("#add_alert2").modal('hide');
  }

  const clearHighPrice = (event) => {
       //console.log(event,'asdsadasd');
       setState({
           ...state,
        highPrice:'',
    })
    }

    const clearLowPrice = (event) => {
        //console.log(event,'asdsadasd');
        setState({
            ...state,
         lowPrice:'',
     })
     }

  const clearPrice = () => {
        setState({
            highPrice:'',
            lowPrice:''
        })
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
                <ToastContainer position="top-right"
                                autoClose={3000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover />
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
                                    // data-toggle="modal"
                                    // data-target="#add_alert2"
                                    onClick={handleShow}
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
                                        <p>PRICE 24h CHANGE: <span>+5%</span></p>
                                    </div>
                                    <div className="copy">
                                        0x3ee2......435d47{' '}
                                        <CopyToClipboard text="0x3ee2f7d3d7f4s435d47"
                                            onCopy={() => setCopy(true)}>
                                            <span><i className="far fa-copy"></i></span>
                                            </CopyToClipboard>
                                            {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                                       
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
                                        <p className="tag_btn">
                                            <img
                                                alt="img-text"
                                                src={process.env.PUBLIC_URL + "/images/bscscan.png"}
                                            />{' '}
                                            BSC SCAN{' '}
                                            <a href="/">
                                                TRADE{' '}
                                                <i className="fas fa-angle-down"></i>
                                            </a>
                                        </p>
                                        <p>MEDIA</p>
                                        <p className="media_icon">
                                            <a href="/" target="_blank">
                                                <i className="fas fa-globe-africa" />
                                            </a>
                                            <a href="https://twitter.com/" target="_blank">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a href="https://telegram.org/" target="_blank">
                                                <i className="fab fa-telegram-plane" />
                                            </a>
                                            <a href="https://www.reddit.com/" target="_blank">
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
                                        <a href="/contact-us" target="_blank">Contact us!</a>
                                    </span>
                                </div>
                                <div
                                    id="carouselExampleSlidesOnly"
                                    className="carousel slide"
                                    data-ride="carousel"
                                >
                                    <div className="carousel-inner">
                                    {ads.map((add, index) => (
                                        <div className={"carousel-item " + (index == 0 ? 'active' : '')} key={index}> 
                                            <div className="slide_box">
                                                <a href={add.title} target="_blank"><img src={add.ads} /></a>
                                            </div>
                                        </div>
                                 
                                    ))}
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
            <Modal id="add_alert2" show={show} onHide={handleClose}>
            
                <Modal.Body>
                <i className="fas fa-times pull-right" onClick={handleClose} />
                {/* <Modal.Header closeButton>
               
               </Modal.Header> */}
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
                                                placeholder="High price...."
                                                onChange={handleChange}
                                                type="text"
                                                name="highPrice"
                                                value={highPrice || ''}
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                onInput={(e)=>{ 
                                                    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1') 
                                                    //Math.max(0, e.target.value ).toString().slice(0,9)
                                                }}
                                            />
                                            {/* <input
                                                type="text"
                                                placeholder="High price...."
                                            /> */}
                                             <Button
                                                className="capitalize clear"
                                                variant="contained"
                                                type="button"
                                                onClick={clearHighPrice}
                                            >
                                                CLEAR
                                            </Button>
                                        </li>
                                        <li>
                                        <TextValidator
                                                className="mb-6 w-full"
                                                variant="outlined"
                                                size="small"
                                                placeholder="Low price...."
                                                onChange={handleChange}
                                                type="text"
                                                name="lowPrice"
                                                value={lowPrice || ''}
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                onInput={(e)=>{ 
                                                    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1') 
                                                    //Math.max(0, e.target.value ).toString().slice(0,9)
                                                }}
                                            />
                                             <Button
                                                className="capitalize clear"
                                                variant="contained"
                                                type="button"
                                                onClick={clearLowPrice}
                                            >
                                                CLEAR
                                            </Button>
                                        </li>
                                        <li>
                                            <Button
                                                className="capitalize clear"
                                                variant="contained"
                                                type="button"
                                                onClick={clearPrice}
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

                                            {message && (
                                                    <p className="text-success">{message}</p>
                                                )}
                                        </li>
                                    </ul>
                                </ValidatorForm>
                            </div>
                </Modal.Body>
            </Modal>
            <div
                className="modal fade "
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
                                                placeholder="High price...."
                                                onChange={handleChange}
                                                type="text"
                                                name="highPrice"
                                                value={highPrice || ''}
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                onInput={(e)=>{ 
                                                    e.target.value = Math.max(0, e.target.value ).toString().slice(0,9)
                                                }}
                                            />
                                            {/* <input
                                                type="text"
                                                placeholder="High price...."
                                            /> */}
                                             <Button
                                                className="capitalize clear"
                                                variant="contained"
                                                type="button"
                                                onClick={clearHighPrice}
                                            >
                                                CLEAR
                                            </Button>
                                        </li>
                                        <li>
                                        <TextValidator
                                                className="mb-6 w-full"
                                                variant="outlined"
                                                size="small"
                                                placeholder="Low price...."
                                                onChange={handleChange}
                                                type="text"
                                                name="lowPrice"
                                                value={lowPrice || ''}
                                                validators={['required']}
                                                errorMessages={['this field is required']}
                                                onInput={(e)=>{ 
                                                    e.target.value = Math.max(0, e.target.value ).toString().slice(0,9)
                                                }}
                                            />
                                             <Button
                                                className="capitalize clear"
                                                variant="contained"
                                                type="button"
                                                onClick={clearLowPrice}
                                            >
                                                CLEAR
                                            </Button>
                                        </li>
                                        <li>
                                            <Button
                                                className="capitalize clear"
                                                variant="contained"
                                                type="button"
                                                onClick={clearPrice}
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

                                            {message && (
                                                    <p className="text-success">{message}</p>
                                                )}
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
