import React, { useState, useEffect } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Button,
    CircularProgress
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
import {createAlert, removeAlert} from 'app/redux/actions/common/AlertActions'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {getAds, deleteAds} from 'app/redux/actions/admin/ads/AdsActions'
import { $CombinedState } from 'redux'
import { Modal, Form } from "react-bootstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { SERVICE_URL, DEFAULT_SERVICE_VERSION } from "../../constants/utility"
import {getTokenBySymbol, getTokenInfo, getTokenTransferList, getTokenOtherInfo, getAlertTokenInfo, addTokenInFavourite, removeTokenFromFavourite} from 'app/redux/actions/frontend/TokenApiActions'
import Moment from 'react-moment';
import moment from 'moment';
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import NumberFormat from 'react-number-format';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

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

const Blank = ({ dispatch }) => {
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [state, setState] = useState({})
    const [ip, setIP] = useState('');
    const [message, setMessage] = useState('')
    const {ads,symbols,tokeninfo,transfers,tokenotherinfo,alertoken} = useSelector(state=>state);
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const { login } = useAuth();
    const [open,setConfirmState] = React.useState(false)
    const [openRem,setConfirmRemoveState] = React.useState(false)
    const [openAlert,setRemoveAlertState] = React.useState(false)
    const {
        isAuthenticated,
        // user
    } = useAuth()

    let authenticated = isAuthenticated

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    })

    console.log(authenticated,'is auth');
    const columns = [
        {
        id: 1,
        name: "TYPE",
        selector: (row) => <span className='buy-type'>Buy</span>,
        sortable: true,
        reorder: true,
        },
        {
        id: 2,
        name: "TOKEN",
        selector: (row) => row.tx_from,
        sortable: true,
        reorder: true,
        },
        {
        id: 3,
        name: "PRICE",
        selector: (row) => <span className='price-type'>{row.amount} </span>,
        sortable: true,
        right: true,
        reorder: true
        },
        {
            id: 4,
            name: "TIME",
            selector: (row) => row.tx_time,
            format: (row) => moment(row.tx_time).format('hh:mm:ss'),
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 5,
            name: "TX",
            selector: (row) => <span className='tx_hash-type'>{row.tx_hash}</span>,
            sortable: true,
            right: true,
            reorder: true
        }
    ];

    const [show, setShow] = useState(false);
    const [showLogin, setLoginShow] = useState(false);
    const [copied, setCopy] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLoginShow = () => setLoginShow(true);
    const handleLoginClose = () => setLoginShow(false);
    
    const start = moment().add(-4, 'm');
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const  handleClickOpen = () => {
        setConfirmState(true);
      };
    const  handleConfirmClose = () => {
        setConfirmState(false);
    };

    //Remove Fav
    const  handleFavRemoveOpen = () => {
        setConfirmRemoveState(true);
      };
      const  handleFavRemoveClose = () => {
        setConfirmRemoveState(false);
    };

    const handleFavRemoveAgree = () => {
        const tokenAddress =  (tokeninfo.length > 0 ? tokeninfo[0].address : '0xb8c77482e45f1f44de1745f52c74426c631bdd52');
        dispatch(removeTokenFromFavourite({currencytoken:tokenAddress}))
        handleFavRemoveClose();
      };
      const handleFavRemoveDisagree = () => {
        console.log("I do not agree.");
        handleFavRemoveClose();
      };

      //Remove Alert
    const  handleAlertRemoveOpen = () => {
        setRemoveAlertState(true);
      };
      const  handleAlertRemoveClose = () => {
        setRemoveAlertState(false);
    };

    const handleAlertRemoveAgree = () => {
        const tokenAddress =  (tokeninfo.length > 0 ? tokeninfo[0].address : '0xb8c77482e45f1f44de1745f52c74426c631bdd52');
        dispatch(removeAlert({currencytoken:tokenAddress}))
        handleAlertRemoveClose();
      };
      const handleAlertRemoveDisagree = () => {
        console.log("I do not agree.");
        handleAlertRemoveClose();
      };
    

    const handleAgree = () => {
        const symbol =  (tokeninfo.length > 0 ? tokeninfo[0].symbol : 'BNB');
        const tokenAddress =  (tokeninfo.length > 0 ? tokeninfo[0].address : '0xb8c77482e45f1f44de1745f52c74426c631bdd52');
        dispatch(addTokenInFavourite({currencySymbol:symbol,currencytoken:tokenAddress,status:'active'}))
        handleConfirmClose();
      };
      const handleDisagree = () => {
        console.log("I do not agree.");
        handleConfirmClose();
      };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
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
        dispatch(getTokenInfo('0xb8c77482e45f1f44de1745f52c74426c631bdd52'));
        dispatch(getTokenOtherInfo('BNB'));
        dispatch(getTokenTransferList('0xb8c77482e45f1f44de1745f52c74426c631bdd52'));
        if(authenticated){
            dispatch(getAlertTokenInfo('0xb8c77482e45f1f44de1745f52c74426c631bdd52'));
            
        }
    }, [])


    const handleChange = ({ target: { name, value } }) => {
        setState({
            ...state,
            [name]: value,
        })
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp);
    }
    const handleFormSubmit = (event) => {
         const symbol =  (tokeninfo.length > 0 ? tokeninfo[0].symbol : 'BNB');
        const tokenAddress =  (tokeninfo.length > 0 ? tokeninfo[0].address : '0xb8c77482e45f1f44de1745f52c74426c631bdd52');
        const params = {highPrice:highPrice,lowPrice:lowPrice,status:'active',currencySymbol:symbol,ip:ip,token:tokenAddress};
        dispatch(createAlert(params));
        toast.success("Alert added successfully.");
        setState({highPrice:'',lowPrice:''});
        setShow(false);
  }

  const clearHighPrice = (event) => {
       setState({
           ...state,
        highPrice:'',
    })
    }

    const clearLowPrice = (event) => {
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

    const handler = ({ target: { name, value } }) => {
      dispatch(getTokenBySymbol(value));
    };
    
    const handleSymbolInfo = (address,symbol) => {
      dispatch(getTokenInfo(address));
      dispatch(getTokenOtherInfo(symbol));
      dispatch(getTokenTransferList(address));
    };

    const handleLoginFormSubmit = async (event,values) => {
            await login(userInfo.email, userInfo.password)
            const role = localStorage.getItem('userRole');

            setLoginShow(false);
            setShow(true);
           toast.success("You are logged in successfully.");
            if(tokeninfo.length > 0){
                dispatch(getAlertTokenInfo(tokeninfo[0].address));
            }else{
                dispatch(getAlertTokenInfo('0xb8c77482e45f1f44de1745f52c74426c631bdd52'));
            }
            
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
                        {/* <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Search BY SYMBOL / ADDRESS ...."
                            onChange={handler}
                        /> */}
                        <Autocomplete
                            id="combo-box-demo"
                            options={symbols}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 300 }}
                            onInputChange={handler}
                            onChange={(event,value) => handleSymbolInfo(value.address)}
                            renderInput={(params) => <TextField {...params} placeholder="Search By Symbol" variant="outlined" />}
                            />
                        {/* {((symbols.length > 0 )
                         ? 
                        ( <ul id="show-search-symbols">
                        { symbols.map((val,index) => (
                                            <li
                                            key={index}
                                            data-src={val.id}
                                            value={val.id}
                                            onClick={() => handleSymbolInfo(val.address)}
                                            >
                                            {val.name}
                                            </li>
                                        ))}
                        </ul>) : ('')

                        )} */}
                        
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
                                {(authenticated ? 
                                    <button
                                    type="button"
                                    className="nav-link py-3 px-0 px-lg-3 button"
                                    // data-toggle="modal"
                                    // data-target="#add_alert2"
                                    onClick={handleShow}
                                        >
                                            Add Alert
                                        </button>
                                        :
                                        <button
                                    type="button"
                                    className="nav-link py-3 px-0 px-lg-3 button login"
                                    onClick={handleLoginShow}
                                        >
                                            Add Alert
                                        </button>

                                )}
                                
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
                                            {(tokenotherinfo.length > 0 ? 
                                                tokenotherinfo[0].data.map((token, index) =>
                                                <img
                                                alt="img-text"
                                                src={token.images['16x16']}
                                            />
                                            )
                                                : "<img alt='img-text' src={process.env.PUBLIC_URL + '/images/cardano-ada-logo.png'} />") }

                                            <b>
                                            {(tokeninfo.length > 0 ? '' : 'ADA/')}
                                                <span>{(tokeninfo.length > 0 ? tokeninfo[0].symbol : 'BNB')}</span>
                                            </b>
                                        </a>
                                    </li>
                                </ul>
                                <ul className="nav">
                                    <li className="nav-item alert_icon">

                                             {(authenticated ? 
                                                (alertoken.length > 0 && alertoken[0].favorite == true ? 
                                                    <a className="nav-link" href="#" onClick={() => handleFavRemoveOpen()}>
                                                        <i className="fas fa-heart show_hover " /> 
                                                        <i className="fas fa-heart hide_hover " />
                                                    </a> :
                                                    <a className="nav-link" href="#" onClick={() => handleClickOpen()}>
                                                        <i className="fas fa-heart hide_hover " />
                                                        <i className="fas fa-heart show_hover " /> 
                                                    </a>
                                                )
                                                :
                                                (alertoken.length > 0 && alertoken[0].favorite == true? 
                                                    <a className="nav-link" href="#" onClick={handleLoginShow}> 
                                                        <i className="fas fa-heart hide_hover " />
                                                        <i className="fas fa-heart show_hover "  />
                                                    </a> :
                                                    <a className="nav-link" href="#" onClick={handleLoginShow}> 
                                                        <i className="fas fa-heart hide_hover " />
                                                        <i className="fas fa-heart show_hover "  />
                                                    </a>
                                                )
                                            )}
                                            
                                        
                                            {(authenticated ? 
                                                (alertoken.length > 0 && alertoken[0].alert == true ? 
                                                    <a
                                                    className="nav-link"
                                                    href="#"
                                                    onClick={() => handleAlertRemoveOpen()}
                                                >  
                                                <i className="fas fa-bell show_hover " />
                                                <i className="fas fa-bell hide_hover " />
                                                </a> :
                                                <a
                                                className="nav-link"
                                                href="#"
                                                onClick={handleShow}
                                            >  <i className="fas fa-bell hide_hover " />
                                            <i className="fas fa-bell show_hover " />
                                            </a>
                                                )
                                                :
                                                (alertoken.length > 0 && alertoken[0].alert == true? 
                                                    <a className="nav-link" href="#" onClick={handleLoginShow}> 
                                                        <i className="fas fa-bell show_hover "  />
                                                        <i className="fas fa-bell hide_hover " />
                                                    </a> :
                                                    <a className="nav-link" href="#" onClick={handleLoginShow}> 
                                                        <i className="fas fa-bell hide_hover " />
                                                        <i className="fas fa-bell show_hover "  />
                                                    </a>
                                                )
                                                
                                            )}

                                        <Dialog
                                                open={open}
                                                onClose={handleConfirmClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Add To Favourites"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                    Are you sure you want to add it in your favourites?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleDisagree} color="primary">
                                                    Cancel
                                                    </Button>
                                                    <Button onClick={handleAgree} color="primary" autoFocus>
                                                    Ok
                                                    </Button>
                                                </DialogActions>
                                                </Dialog>

                                                <Dialog
                                                open={openRem}
                                                onClose={handleFavRemoveClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Remove from Favourites"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                    Are you sure you want to remove this from your favourites?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleFavRemoveDisagree} color="primary">
                                                    Cancel
                                                    </Button>
                                                    <Button onClick={handleFavRemoveAgree} color="primary" autoFocus>
                                                    Ok
                                                    </Button>
                                                </DialogActions>
                                                </Dialog>

                                                <Dialog
                                                open={openAlert}
                                                onClose={handleAlertRemoveClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                                >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Remove Alert"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                    Are you sure you want to remove alert?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleAlertRemoveDisagree} color="primary">
                                                    Cancel
                                                    </Button>
                                                    <Button onClick={handleAlertRemoveAgree} color="primary" autoFocus>
                                                    Ok
                                                    </Button>
                                                </DialogActions>
                                                </Dialog>
                                            {/* {(alertoken.alert == false  ? 
                                                <i className="far fa-bell hide_hover" /> :
                                                <i className="fas fa-bell show_hover" />
                                            )} */}
                                    </li>
                                    <div className="price">
                                        <h5>
                                            PRICE: {(tokenotherinfo.length > 0 ? 
                                                tokenotherinfo[0].data.map((token, index) =>
                                                <NumberFormat value={token.values.USD.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
                                            )
                                                : '<span>$2.4226</span>') }
                                                {/* <span>$2.4226</span> */}
                                        </h5>
                                        <p>PRICE 24h CHANGE: {(tokenotherinfo.length > 0 ? 
                                                tokenotherinfo[0].data.map((token, index) =>
                                                (token.values.USD.percentChange24h > 0 ? <span className="positive-number">+{token.values.USD.percentChange24h}%</span> : <span className="negative-number">{token.values.USD.percentChange24h}%</span>)
                                                
                                            )
                                                : '<span>+5%</span>>') }
                                                {/* <span>+5%</span> */}
                                                </p>
                                    </div>
                                    <div className="copy">
                                        {/* 0x3ee2......435d47{' '} */}
                                        {(tokeninfo.length > 0 ? tokeninfo[0].address.substring(0, 18)+'... ' : '0x3ee2......435d47')}
                                        {(tokeninfo.length > 0) ? 
                                        <CopyToClipboard text={tokeninfo[0].address}
                                            onCopy={() => setCopy(true)}>
                                            <span><i className="far fa-copy"></i></span>
                                            </CopyToClipboard> : <CopyToClipboard text='0x3ee2f7d3d7f4s435d47 '
                                            onCopy={() => setCopy(true)}>
                                            <span><i className="far fa-copy"></i></span>
                                            </CopyToClipboard>
                                        }
                                            {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                                    
                                       
                                    </div>
                                    <div className="market_cap">
                                        <p>
                                            MARKET CAP:{' '}
                                            {(tokenotherinfo.length > 0 ? 
                                                tokenotherinfo[0].data.map((token, index) =>
                                                <NumberFormat value={token.values.USD.marketCap} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
                                            )
                                                : '<span>$76,871,158,103</span>') }
                                            
                                        </p>
                                        <p>
                                            VOLUME 24H:{' '}
                                            {(tokenotherinfo.length > 0 ? 
                                                tokenotherinfo[0].data.map((token, index) =>
                                                <NumberFormat value={token.values.USD.volume24h} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            )
                                                : '<span>$4,832,839,159</span>') }
                                            {/* <span>$4,832,839,159</span> */}
                                        </p>
                                        <p>
                                            TOTAL SUPPLY:{' '}
                                            {(tokenotherinfo.length > 0 ? 
                                                tokenotherinfo[0].data.map((token, index) =>
                                                <span className="number">{token.totalSupply}</span>
                                            )
                                                : '<span>33,117,618,880</span>') }
                                            {/* <span>33,117,618,880</span> */}
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
                                                <a href={add.title} target="_blank"><img src={SERVICE_URL+"/uploads/"+add.ads} /></a>
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
                                    symbol={(tokeninfo.length > 0 ? tokeninfo[0].symbol : 'BNB')}
                                    theme={Themes.DARK}
                                    locale="en"
                                    autosize
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8 col-xl-8 mb-12 mb-xl-0 pricing-table">
                            <Card>
                                    <DataTable
                                    columns={columns}
                                    data={transfers}
                                    defaultSortFieldId={1}
                                    sortIcon={<SortIcon />}
                                    pagination
                                    />
                                </Card>
                                {/* <div className="table-responsive">
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
                                </div> */}
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
            <Modal id="add_alert2" className="modal-popup-class" show={show} onHide={handleClose}>
            
                <Modal.Body>
                <i className="fas fa-times pull-right" onClick={handleClose} />
                {/* <Modal.Header closeButton>
               
               </Modal.Header> */}
                <div className="alert_text2 text-center">
                                <img alt="img-text" src={process.env.PUBLIC_URL + "/images/noti.png"} />
                                <h4>Set up an alarm For {(tokeninfo.length > 0 ? '('+tokeninfo[0].symbol+')' : '(BNB)'  )}</h4>
                                <h5>{(tokeninfo.length > 0 ? tokeninfo[0].address : '')}</h5>
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

            <Modal id="add_alert3" className="modal-popup-class" show={showLogin} onHide={handleLoginClose}>
            
                <Modal.Body>
                <i className="fas fa-times pull-right" onClick={handleLoginClose} />
                {/* <Modal.Header closeButton>
               
               </Modal.Header> */}
                <div className="alert_text2 text-center">
                <h4>LOGIN</h4>
                <ValidatorForm onSubmit={handleLoginFormSubmit}>
                                <TextValidator
                                    className="mb-3 w-full"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                />
                                <TextValidator
                                    className="mb-3 w-full"
                                    placeholder="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={userInfo.password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <FormControlLabel
                                    className="mb-3 min-w-288"
                                    name="agreement"
                                    onChange={handleChange}
                                    control={
                                        <Checkbox
                                            size="small"
                                            onChange={({
                                                target: { checked },
                                            }) =>
                                                handleChange({
                                                    target: {
                                                        name: 'agreement',
                                                        value: checked,
                                                    },
                                                })
                                            }
                                            checked={userInfo.agreement || true}
                                        />
                                    }
                                    label="Remeber me"
                                />

                                {message && (
                                    <p className="text-error">{message}</p>
                                )}

                                <div className="flex flex-wrap items-center mb-4">
                                    <div className="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Sign in
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </div>
                                    <span className="mr-2 ml-5">or</span>
                                    <Button
                                        className="capitalize"
                                        onClick={() =>
                                            history.push('/session/signup')
                                        }
                                    >
                                        Sign up
                                    </Button>
                                </div>
                                <Button
                                    className="text-primary"
                                    onClick={() =>
                                        history.push('/session/forgot-password')
                                    }
                                >
                                    Forgot password?
                                </Button>
                            </ValidatorForm>
                            </div>
                </Modal.Body>
            </Modal>

        </div>
        </div>
    )
}

export default connect()(Blank)
