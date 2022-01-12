import React, { useState, useEffect, useContext, useRef } from 'react'
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
import {createAlert} from 'app/redux/actions/common/AlertActions'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';
import {getAds, deleteAds} from 'app/redux/actions/admin/ads/AdsActions'
import { $CombinedState } from 'redux'
import { Modal, Form } from "react-bootstrap";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.css';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { SERVICE_URL, DEFAULT_SERVICE_VERSION } from "../../constants/utility"
import {getTokenBySymbol, getTokenInfo, getTokenTransferList, getTokenOtherInfo, getAlertTokenInfo, addTokenInFavourite, removeTokenFromFavourite, removeAlert, getFavouriteList, getTrends, getTcakeData } from 'app/redux/actions/frontend/TokenApiActions'
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
import { useQuery } from "react-query";
import Chart from './Chart';
import ThemeContext from '../../contexts/ThemeContext';
// import { TVChartContainer } from 'app/components/TVChartContainer/index';
import './responsive.css';
import  Identicon from 'identicon.js';

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

// function useOutsideAlerter(ref) {
//     useEffect(() => {
    
//       // Function for click event
//       function handleOutsideClick(event) {
//         if (ref.current && !ref.current.contains(event.target)) {
//           alert("you just clicked outside of box!");
//         }
//       }
    
//       // Adding click event listener
//       document.addEventListener("click", handleOutsideClick);
    
//     }, [ref]);
//   }

const Blank = ({ dispatch }) => {
  //  let ref = useRef(null);
    const ref = useRef(null);

    useOutsideAlerter(ref);
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const [page, setPage] = React.useState(0)
    const [state, setState] = useState({})
    const [searchKey, setSearchKey] = React.useState()
    const [searchArr, setSearchArr] = React.useState([])
    const [ip, setIP] = useState('');
    const [message, setMessage] = useState('')
    const {ads,symbols,tokeninfo,transfers,tokenotherinfo,alertoken,alert, favourite, trends, tcake} = useSelector(state=>state);
    const classes = useStyles()
    const [loading, setLoading] = useState(false)
    const { login, logout } = useAuth();
    const [open,setConfirmState] = React.useState(false)
    const [openRem,setConfirmRemoveState] = React.useState(false)
    const [openAlert,setRemoveAlertState] = React.useState(false)
    const [getSymbol, setSymbol] = React.useState('Tcake')
    const [getParam, setParam] = React.useState('string: $token, offset: $offset, limit: $limit')
    const [getAddress, setAddress] = React.useState('0x3b831d36ed418e893f42d46ff308c326c239429f')
    const bnbToken = '0x3b831d36ed418e893f42d46ff308c326c239429f';
    const { theme, toggle } = useContext(ThemeContext);
    const [showLoader, setLoader] = useState('hide')
    const [showList, setList] = useState()
    const [selectedSymbol, setSelectedSymbol] = useState()
    
    const {
        isAuthenticated,
        // user
    } = useAuth()

    let authenticated = isAuthenticated
    
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    })

   
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
        selector: (row,index) => row.tx_from,
        sortable: true,
        reorder: true,
        },
        {
        id: 3,
        name: "PRICE",
        selector: (row,index) => <span className='price-type'>{row.amount} </span>,
        sortable: true,
        right: true,
        reorder: true
        },
        {
            id: 4,
            name: "TIME",
            selector: (row,index) => row.tx_time,
            format: (row,index) => moment(row.tx_time).format('hh:mm:ss'),
            sortable: true,
            right: true,
            reorder: true
        },
        {
            id: 5,
            name: "TX",
            selector: (row,index) => <span className='tx_hash-type'>{row.tx_hash}</span>,
            sortable: true,
            right: true,
            reorder: true
        }
    ];
   const endpoint = "https://graphql.bitquery.io/";
    
        const clickMeFun = (value) =>{console.log(value,'search word');
        //if(value){
            setList('show');
            return fetch(endpoint, {
                method: "POST",
                headers: { 
                  "Content-Type": "application/json",
                  "X-API-KEY": "BQYAOLGxCUZFuXBEylRKEPm2tYHdi2Wu",
                  'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ query: `query SearchToken($token: String!, $limit: Int!, $offset: Int!) {
                    search(`+getParam+`) {
                        subject {
                          ... on Currency {
                            address
                            name
                            symbol
                            decimals
                            tokenId
                            tokenType
                          }
                        }
                      }
                }`,
                    variables: {"limit":10,"offset":0,"token":value},
                    mode: 'cors',

                }) // ({ QUERY })
              })
                .then((response) => {
                    
                  if (response.status >= 400) {
                    throw new Error("Error fetching data");
                  } else {
                    
                    return response.json();
                  }
                })
                .then((data) => {
                   console.log(data.data.search,'if no search',data.data.search.length)
                    var symbols1 = [];
                    if(data.data.search.length > 0){

                    
                    data.data.search.map((search) => {
                        //console.log(search.subject,'print symbol');
                 if (!!Object.keys(search.subject).length) {
                            if(search.subject.address){
                                symbols1.push(search.subject);
                                //dispatch(getTokenBySymbol([search.subject]));
                           }
                            
                        }else{
                            
                        }
                        // console.log(search,'yes there');
                        // if(search.subject != ""){
                        //     symbols1.push(search.subject);
                        // }
                        //console.log('print symbol123456',Object.keys(search.subject).length);
                     });
                    }
                    dispatch(getTokenBySymbol(symbols1));
                     setSearchArr(symbols1)
                });
        //}

        };
   // const { data, isLoading, error,refetch  } = useQuery(['monster',searchKey], () => clickMeFun(searchKey));
    const { data, isLoading, error,refetch  } = useQuery(['monster',searchKey], () => clickMeFun(searchKey));

    console.log(tokenotherinfo,'print symbol123',tcake);
    const trendingFunction = () =>{
        //if(value){
            return fetch(endpoint, {
                method: "POST",
                headers: { 
                  "Content-Type": "application/json",
                  "X-API-KEY": "BQYAOLGxCUZFuXBEylRKEPm2tYHdi2Wu",
                  'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({ query: `{
                    ethereum(network:ethereum) {
                      dexTrades(
                        options: {desc: "tradeAmount", limit: 10, limitBy: {each: "baseCurrency.address", limit: 1}}
                        date: {after: "2021-11-01"}
                      ) {
                        tradeAmount(calculate: sum, in: USDT)
                        baseCurrency {
                          address
                          name
                          symbol
                        }
                      }
                    }
                  }`,
                    mode: 'cors',

                }) // ({ QUERY })
              })
                .then((response) => {
                    
                  if (response.status >= 400) {
                    throw new Error("Error fetching data");
                  } else {
                    
                    return response.json();
                  }
                })
                .then((data) => {
                    console.log(data.data.ethereum.dexTrades,'print trending');
                   // var symbols1 = [];
                    // data.data.search.map((search) => {
                    //     // console.log(search,'yes there');
                        
                    //      symbols1.push(search.subject);
                    //  });
                      dispatch(getTrends(data.data.ethereum.dexTrades));
                    //  setSearchArr(symbols1)
                });
        //}

        };
        const { data1, isLoading1, error1,trendFetch  } = useQuery(['trend'], () => trendingFunction());
        const optionsDrop = []
        symbols.data.map((symbol) => {
            optionsDrop.push({value:symbol.address,label:symbol.name,symbol:symbol.symbol});
         });
       
    const [show, setShow] = useState(false);
    const [showLogin, setLoginShow] = useState(false);
    const [copied, setCopy] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLoginShow = (param) => {
        localStorage.setItem('icon-click', param)
        setLoginShow(true);
    }
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
        const tokenAddress =  (getAddress ? getAddress : '0x3b831d36ed418e893f42d46ff308c326c239429f');
        dispatch(removeTokenFromFavourite({currencytoken:tokenAddress}))
        dispatch(getAlertTokenInfo(tokenAddress));
        
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
        const tokenAddress =  (getAddress ? getAddress : '0x3b831d36ed418e893f42d46ff308c326c239429f');
        dispatch(removeAlert({currencytoken:tokenAddress}))
        dispatch(getAlertTokenInfo(tokenAddress));
        
        handleAlertRemoveClose();
      };
      const handleAlertRemoveDisagree = () => {
        console.log("I do not agree.");
        handleAlertRemoveClose();
      };
    

    const handleAgree = () => {
        const symbol =  (tokenotherinfo.data.symbol ? tokenotherinfo.data.symbol : 'Tcake');
        const tokenAddress =  (getAddress ? getAddress : '0x3b831d36ed418e893f42d46ff308c326c239429f');
        dispatch(addTokenInFavourite({currencySymbol:symbol,currencytoken:tokenAddress,status:'active'}))
        dispatch(getAlertTokenInfo(tokenAddress));
        
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
       // console.log(res.data);
        setIP(res.data.IPv4)
    }

    useEffect(() => {
        getData()
        const params={type:'GET_ADS'};
        dispatch(getAds(params));
        dispatch(getTokenInfo('0x3b831d36ed418e893f42d46ff308c326c239429f'));
        dispatch(getTcakeData());
        dispatch(getTokenOtherInfo('Tcake'));
        dispatch(getTokenTransferList('0x3b831d36ed418e893f42d46ff308c326c239429f'));
        if(authenticated){
            dispatch(getAlertTokenInfo('0x3b831d36ed418e893f42d46ff308c326c239429f'));
            dispatch(getFavouriteList());
        }

    }, [])
    //console.log(tcake,'print trending123');
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
         const symbol =  (tokenotherinfo.data.symbol ? tokenotherinfo.data.symbol : 'Tcake');
        const tokenAddress =  (getAddress ? getAddress : '0x3b831d36ed418e893f42d46ff308c326c239429f');
        const params = {highPrice:highPrice,lowPrice:lowPrice,status:'active',currencySymbol:symbol,ip:ip,currencytoken:tokenAddress};
        dispatch(createAlert(params));
        dispatch(getAlertTokenInfo(tokenAddress));
        
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

    const clearSymbol = () => {
        // setState({
        //     ...state,
        //     selectedSymbol:''
        // })
        setSelectedSymbol('');
      //  setSearchKey('');
      //      refetch();
        setList('show');
    }

    const handler = ({ target: { name, value } }) => { 
        setLoader('show');
        setSelectedSymbol(value);
        setList('show');
        if(value != undefined && value != null){
        //    dispatch(getTokenBySymbol(value));
         if(value.substr(0,2) == '0x'){
             value = value;
             setParam('string: $token, offset: $offset, limit: $limit')
         }else{
            
            if(value == 'BNB' || value == 'bnb'){
                value = value+'%';
                setParam('string: $token, offset: $offset, limit: $limit')
            }else{
                value = value+'%';
                setParam('string: $token, offset: $offset, limit: $limit, network: bsc')
            }
           
            
        }
            setSearchKey(value);
            refetch();
        }

     
    };
    
    const handleSymbolInfo = (address,symbol) => {
 console.log(symbol,address,'get new search icons');
        if(symbol == 'Tcake'){
            dispatch(getTcakeData());
        }
      dispatch(getTokenInfo(address));
      setSymbol(symbol);
      setAddress(address);
      if(!tokeninfo.data){
        dispatch(getTokenInfo(address));
      }
      setList('hide');
      setSelectedSymbol(symbol);
      //console.log(transfers,'get val');
      dispatch(getTokenOtherInfo(symbol));
      dispatch(getTokenTransferList(address));
    };

    const handleLoginFormSubmit = async (event,values) => {
            await login(userInfo.email, userInfo.password)
            const role = localStorage.getItem('userRole');
            const iconGet = localStorage.getItem('icon-click');
            setLoginShow(false);

            if(iconGet == 'alert'){
                setShow(true);
            }
            
           toast.success("You are logged in successfully.");
            if(tokeninfo.data.address){
                dispatch(getAlertTokenInfo(tokeninfo.data.address));
            }else{
                dispatch(getAlertTokenInfo('0x3b831d36ed418e893f42d46ff308c326c239429f'));
            }
            
    }

    const onFocus = () => {
        setList('show');
      };
      function useOutsideAlerter(ref) {
        useEffect(() => {
        
          // Function for click event
          function handleOutsideClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
             // alert("you just clicked outside of box!");
             console.log('you just clicked outside of box!');
             setLoader('hide');
             setList('hide')
            }
          }
        
          // Adding click event listener
          document.addEventListener("click", handleOutsideClick);
        
        }, [ref]);
      }
  let { highPrice, lowPrice, symbol } = state

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
                        <img src={process.env.PUBLIC_URL + '/images/logo-new.png'} alt="LOGO" />
                    </a>
                    <div className="search" ref={ref}>
                         <input
                            type="text"
                            id="search"
                            name="search"
                            placeholder="Search BY SYMBOL / ADDRESS ...."
                            value={selectedSymbol}
                            onChange={handler}
                            onFocus={ onFocus }
                        />
                        {selectedSymbol && symbols.data.length > 0 ? <i className="fas fa-times pull-right clearsearchIcon" onClick={clearSymbol} /> : ''}
                        
                        {/* <Select options={optionsDrop} 
                        onChange={(event,value) => value ? handleSymbolInfo(value.address,value.symbol): null} 
                        onInputChange={handler}
                        renderInput={(params) => <TextField {...params} placeholder="Search By Symbol" variant="outlined" />}
                        /> */}
                        {/* <Autocomplete
                            loading
                            id="combo-box-demo"
                            options={!loading ? symbols.data : []}
                            getOptionLabel={(option) => option.name || ""}
                            getOptionSelected={(option, value) => option.symbol === value.symbol}
                            renderOption={(option) => {
                                //display value in Popper elements
                                let errorflag=true;
                                return <div className="search_listing">
                                    <div className="list_img">
                                    <img src={"https://pancakeswap.finance/images/tokens/"+option.address+".png"}
                                    onError={(e)=>{ if (errorflag){ errorflag=false; e.target.src=process.env.PUBLIC_URL + '/images/logo-new.png'; } }}
                                    className="token-img-auto" />
                                    </div>
                                    <div className="list_text">
                                   <h5>{`${option.name} (${option.symbol})`}</h5>
                                        <h6>{`${option.address}`}</h6>
                                        </div></div>;
                              }}
                            style={{ width: 300 }}
                            onInputChange={handler}
                            onChange={(event,value) => value ? handleSymbolInfo(value.address,value.symbol): null}
                            renderInput={(params) => <TextField {...params} placeholder="Search By Symbol" variant="outlined" />}
                            /> */}
                         {((symbols.data.length > 0 )
                         ? 
                        ( <ul id="show-search-symbols" className={showList}>
                        { symbols.data.map((val,index) => (
                                            <li
                                            key={index}
                                            data-src={val.id}
                                            value={val.id}
                                            onClick={() => handleSymbolInfo(val.address,val.symbol)}
                                            >
                                    <div className="search_listing">
                                    <div className="list_img">
                                     {/* <img src={"https://pancakeswap.finance/images/tokens/"+val.address+".png"}
                                    className="token-img-auto" />  */}
                                     {/* <img
                                        src={`https://pancakeswap.finance/images/tokens/${val.address}.png`}
                                        onError={(e) => {
                                        e.target.onError = null;
                                        if (val.address.length >= 15) {
                                            val.symbol === 'Tcake'
                                            ? (e.target.src = process.env.PUBLIC_URL + '/images/logo-new.png')
                                            : (e.target.src = `data:image/png;base64,${new Identicon(
                                                val.address,
                                                '200',
                                                ).toString()}`);
                                        }
                                        }}
                                        alt={val.symbol} className="token-img-auto" 
                                /> */}
                                 <img
                                        src={`https://pancakeswap.finance/images/tokens/${val.address}.png`}
                                        onError={(e) => {
                                        e.target.onError = null;
                                        if (val.address.length >= 15) {
                                            val.symbol === 'Tcake'
                                            ? (e.target.src = process.env.PUBLIC_URL + '/images/logo-new.png')
                                            : (e.target.src = process.env.PUBLIC_URL + '/images/Emoji_Icon_-_Thinking_large.webp');
                                        }
                                        }}
                                        alt={val.symbol} className="token-img-auto" 
                                />
                                    </div>
                                    <div className="list_text">
                                   <h5>{`${val.name} (${val.symbol})`}</h5>
                                        <h6>{`${val.address}`}</h6>
                                        </div></div>
                                            </li>
                                        ))}
                        </ul>) : (<div className={"MuiPaper-root MuiAutocomplete-paper MuiPaper-elevation1 MuiPaper-rounded "+showLoader}><div className="MuiAutocomplete-loading">Loading…</div></div>)

                        )}
                        
                    </div>
                   {/* <button
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
                    </button>*/}
                    <div
                        className="collapse1 navbar-collapse"
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
                                    onClick={() => handleLoginShow('alert')}
                                        >
                                            Add Alert
                                        </button>

                                )}
                                
                            </li>
                            {(authenticated ? 
                            <li>

                            <a className="nav-link py-3 px-0 px-lg-3 icon" href="#" onClick={logout}>
                                    Logout
                                </a>
                            </li>:''
                            )}
                        </ul>
                    </div>
            </nav>
            <div className="mobile_area top_bar dropdown">
            <div className="Mobile_head">
            <ul>
                <li className="ada_logo"> 
                    <a className="nav-link" href="index.html">{(tokenotherinfo.data.images ? 
                        <img alt="img-text" src={tokenotherinfo.data.images['16x16']} />                                
                                        : <img alt='img-text' src={process.env.PUBLIC_URL + '/images/logo-new.png'} />) }
                        <b> <span>{(tokenotherinfo.data.symbol ? tokenotherinfo.data.symbol : (tcake.data.symbol ? tcake.data.symbol : 'Tcake'))}</span>
                        </b>
                    </a>
                </li>
                
                <li>
                <div className="price">
                    <h5>
                    PRICE: {(tokenotherinfo.data.values ? 
                       // tokenotherinfo[0].data.map((token, index) =>
                        <NumberFormat value={tokenotherinfo.data.values.USD.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={5} />
                    //)
                        : tcake.data ? 
                        <NumberFormat value={tcake.data.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={5} />
                         : <span>$2.4226</span>) }
                        {/* <span>$2.4226</span> */}
                    </h5>
                   
                
                </div>

            </li>
            <li>
                <p>24H { tokenotherinfo.data.values ? 
                        
                        tokenotherinfo.data.values.USD.percentChange24h > 0 ? 
                            <span className="positive-number">+{tokenotherinfo.data.values.USD.percentChange24h}%</span> 
                            : 
                            <span className="negative-number">{tokenotherinfo.data.values.USD.percentChange24h}%</span>
                        : <span>N/A</span> }
                        {/* <span>+5%</span> */}
                </p>
            </li>
            <li>
                <div className="token_info">
                    <h5>TOKEN INFO <a id="info" data-toggle="collapse" href="#myContent" role="button" aria-expanded="false" aria-controls="myContent"> 
                           <i className="fas fa-angle-down"></i>
                        </a></h5>
                


                        

                   
                </div>
            </li>
         </ul>

                  
                                
    </div>

     <div id="myContent" className="collapse multi-collapse" aria-labelledby="info">
     <h4>TOKEN INFO:</h4>
     <div className="copy_text token_infoo">
                                    <div className="copy left_side">
                                        {/* 0x3ee2......435d47{' '} */}
                                        {(getAddress ? getAddress.substring(0, 18)+'... ' : '0x3ee2......435d47')}
                                        {(getAddress) ? 
                                        <CopyToClipboard text={getAddress}
                                            onCopy={() => setCopy(true)}>
                                            <span><i className="far fa-copy"></i></span>
                                            </CopyToClipboard> : <CopyToClipboard text='0x3ee2f7d3d7f4s435d47 '
                                            onCopy={() => setCopy(true)}>
                                            <span><i className="far fa-copy"></i></span>
                                            </CopyToClipboard>
                                        }
                                            {copied ? <span style={{color: 'red'}}>Copied.</span> : null}
                                    
                                       
</div>
                                       <div className="right_side">
<ul className="nav">
                                    <li className="nav-item alert_icon">

                                             {(authenticated ? 
                                                (alertoken.length > 0 && alertoken[1].favorite == true ? 
                                                    <a className="nav-link" href="#" onClick={() => handleFavRemoveOpen()}>
                                                       <img className="heart-filled" src={process.env.PUBLIC_URL + "/images/heart.png"} />
                                                    </a> :
                                                    <a className="nav-link" href="#" onClick={() => handleClickOpen()}>
                                                        <i className="fas fa-heart" /> 
                                                    </a>
                                                )
                                                :
                                                (alertoken.length > 0 && alertoken[1].favorite == true? 
                                                    <a className="nav-link" href="#" onClick={() => handleLoginShow('heart')}> 
                                                       <img className="heart-filled" src={process.env.PUBLIC_URL + "/images/heart.png"} />
                                                    </a> :
                                                    <a className="nav-link" href="#" onClick={() => handleLoginShow('heart')}> 
                                                        <i className="fas fa-heart " />
                                                    </a>
                                                )
                                            )}
                                            
                                            
                                            
                                            {(authenticated ? 
                                                (alertoken.length > 0 && alertoken[1].alert == true? 
                                                    <a
                                                    className="nav-link"
                                                    href="#"
                                                    onClick={() => handleAlertRemoveOpen()}
                                                >  
                                                <img className="bell-filled" src={process.env.PUBLIC_URL + "/images/bell.png"} />
                                                </a> :
                                                <a
                                                className="nav-link"
                                                href="#"
                                                onClick={handleShow}
                                            >  <i className="fas fa-bell " />
                                            </a>
                                                )
                                                :
                                                (alertoken.length > 0 && alertoken[1].alert == true ? 
                                                    <a className="nav-link" href="#" onClick={() => handleLoginShow('alert')}> 
                                                        <img className="bell-filled" src={process.env.PUBLIC_URL + "/images/bell.png"} />
                                                    </a> :
                                                    <a className="nav-link" href="#" onClick={() => handleLoginShow('alert')}> 
                                                        <i className="fas fa-bell" />
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
                                                    {"Add "+(tokeninfo.data.symbol ? tokeninfo.data.symbol : 'BNB ')+ " To Favourites"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                    Are you sure you want to add it in your favourites?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleDisagree} color="primary">
                                                    No
                                                    </Button>
                                                    <Button onClick={handleAgree} color="primary" autoFocus>
                                                    Yes
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
                                                    {"Remove "+(tokeninfo.data.symbol ? tokeninfo.data.symbol : 'BNB ')+ " from Favourites"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                    {"Are you sure you want to remove token address "+(tokeninfo.data.address ? tokeninfo.data.address.substr(0,30)+'...' : bnbToken.substr(0,30)+'...')+" from your favourites?"}
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleFavRemoveDisagree} color="primary">
                                                    No
                                                    </Button>
                                                    <Button onClick={handleFavRemoveAgree} color="primary" autoFocus>
                                                    Yes
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
                                                    {"Remove Alert For "+(tokeninfo.data.symbol ? tokeninfo.data.symbol: 'BNB')}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                    {"Are you sure you want to remove alert for token "+(tokeninfo.data.address ? tokeninfo.data.address.substr(0,30)+'...' : bnbToken.substr(0,30)+'...')+ "?"}
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleAlertRemoveDisagree} color="primary">
                                                    No
                                                    </Button>
                                                    <Button onClick={handleAlertRemoveAgree} color="primary" autoFocus>
                                                    Yes
                                                    </Button>
                                                </DialogActions>
                                                </Dialog>
                                            {/* {(alertoken.alert == false  ? 
                                                <i className="far fa-bell hide_hover" /> :
                                                <i className="fas fa-bell show_hover" />
                                            )} */}
                                    </li>
                                </ul>
                                       </div>

                                    </div>
                                    <div className="market_cap token_infoo">
                                    <div className="left_side">
                                        <p>
                                            MARKET CAP:{' '}
                                            {tokenotherinfo.data.values ? 
                                               // tokenotherinfo[0].data.map((token, index) =>
                                                <NumberFormat value={tokenotherinfo.data.values.USD.marketCap} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
                                            //)
                                                : <span>$399,578.08</span> }
                                            
                                        </p>
                                        <p>
                                            VOLUME 24H:{' '}
                                            {tokenotherinfo.data.values ? 
                                                //tokenotherinfo[0].data.map((token, index) =>
                                                <NumberFormat value={tokenotherinfo.data.values.USD.volume24h} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            
                                                : <span>N/A</span> }
                                            {/* <span>$4,832,839,159</span> */}
                                        </p>
                                        </div>

                                    <div className="right_side">
                                        <p>
                                            TOTAL SUPPLY:{' '}
                                            {tokenotherinfo.data.totalSupply ? 
                                                //tokenotherinfo[0].data.map((token, index) =>
                                                <span className="number">{tokenotherinfo.data.totalSupply}</span>
                                            //)
                                                : <span><NumberFormat value='178,499,565.878013' displayType={'text'} thousandSeparator={true} decimalScale={2} /></span> }
                                            {/* <span>33,117,618,880</span> */}
                                        </p>
                                        <p>
                                            LIQUIDITY: <span>N/A</span>
                                        </p>
                                    </div>
                                    </div>

                                    <div className="pans">
                                    <div className="token_infoo">
                                    <div className="left_side">
                                        <p>
                                            PANCAKESWAP <a href={"https://pancakeswap.finance/swap#/swap?outputCurrency="+tokenotherinfo.data.tokenAddress ? tokenotherinfo.data.tokenAddress : "0x3b831d36ed418e893f42d46ff308c326c239429f"}>TRADE</a>
                                        </p>
                                        </div>

                                    <div className="right_side">
                                        <p className="tag_btn">
                                            <img
                                                alt="img-text"
                                                src={process.env.PUBLIC_URL + "/images/bscscan.png"}
                                            />{' '}
                                            BSC SCAN{' '}
                                            <div className="dropdown trade_sub">
                                                <a className="dropdown-toggle" id="dropdownMenuButton1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">VIEW{' '} <i className="fas fa-angle-down"></i>
                                                                                        </a>
                                            
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <a className="dropdown-item" target="_blank" href={"https://bscscan.com/txs?a="+(getAddress ? getAddress : "0x3b831d36ed418e893f42d46ff308c326c239429f")}>Transfers</a>
                                                <a className="dropdown-item" target="_blank" href={"https://bscscan.com/token/tokenholderchart/"+(getAddress ? getAddress : "0x3b831d36ed418e893f42d46ff308c326c239429f")}>Holders</a>
                                                <a className="dropdown-item" target="_blank" href={"https://bscscan.com/address/"+(getAddress ? getAddress : "0x3b831d36ed418e893f42d46ff308c326c239429f")}>Contracts</a>
                                            </div>
                                            </div>
                                            {/* <a href="https://bscscan.com/token/0x3b831d36ed418e893f42d46ff308c326c239429f">
                                                TRADE{' '}
                                                <i className="fas fa-angle-down"></i>
                                            </a> */}
                                        </p>
                                        </div>
                                        </div>
                                        <p className="media_icon">
                                            MEDIA
                                            <a href="https://twitter.com/tcake_official" target="_blank">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a href="https://t.me/tcake_announcements" target="_blank">
                                                <i className="fab fa-telegram-plane" />
                                            </a>
                                            <a href="https://t.me/tcake_official" target="_blank">
                                                <i className="fas fa-users" />
                                            </a>
                                            <a href="mailto:info@tcake.io" target="_blank">
                                                <i className="far fa-envelope" />
                                            </a>
                                            <a href="https://bscscan.com/token/0x3b831d36ed418e893f42d46ff308c326c239429f" target="_blank">
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjU5QzI5QzE4NzMwMTFFQjkyQzBBMjgxQzc2REREQTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjU5QzI5QzI4NzMwMTFFQjkyQzBBMjgxQzc2REREQTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGNTlDMjlCRjg3MzAxMUVCOTJDMEEyODFDNzZERERBNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGNTlDMjlDMDg3MzAxMUVCOTJDMEEyODFDNzZERERBNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhQBhOUAAANNSURBVHjaVJPLa1xVHMc/99x7596ZydyZZJKYpG2oNOLYltgiqLHVRQldiM2ilQhKRQQJqCv/CNfiyoULcWVKhYhuuogLSxGlD00bDcaMjybpmJnJZO487+scT1IFvXA4cDm/7+/3+z6s6s33+d9nGBdRcl7GcgZhDWKInjDtFWTnK5TxEal0oOo7qJ0KWDbWf0oPgfpUJdE5M3ME0/FQQQuRSudk3J+VoTtLVH0XkgUUX/9bJP65R/T5Vnc7p+IOhgrxHjnD0PHXyBWfQdU3kEkLw52cQsXLEM8jlZ72AMDYn/sLfY6gFMItEjR+pvXnNf3Lprn6GXHi64ehrmtjWGMYheFFMu4LRAmWjDtzMvRndHeszBi6FTJskqg9gs1bRP37iOExZL+rAVuongsDRdSAuSS6wYQQ9sDC4MkFckcvkPRr7AMVjr+JIQ0aax+TnXoRFUW4o0/iDJ0iPXKCwtE5vBOXB6Wt3hGFJ944pZo+2eHncIem0YBkxp/H8UqI/CjZw7M42WNkimeQ9W28qXmS7TWi7Z/2CZ63hOXlO/ev0a4sY/RjnMfOIps1jFjzoUy9jk/u0Yvsff8hkd3SIkh6jTvETqApSh0TKvT9VLFE0F4jFFVsZ5TWxhJmdkTbwHt4Z3LENBDpLJgCTwOmU1qQqO1YZnZ0p1/9cTz/+KuYtvaNlSY9eRYrdwizcY+wsQ5BgDf9Oq3yEmg+dm9/QCK62GahI2TYve1pvd1sCVn7CyOS+CuLJJ0aTqHEvlTNX69qY41ojk7rlVoMzrxHYfot/WZvxWjdvToYNstlFQcFafW01mnyXlXvO0m3qbQ1EkaLIX2Zw2+EWGkT09Qy+ruE9bWXRRhsNvrte3OJl2B4BVL5gOW7adbLDxg5HDM8FvLJl1vcWf0dTwNFVpde5Qa9P67fNMzU5yJRTZzx09dFT71CoPUuTlCrNelGKW7cqvLLbwETEwM4+QJkhhD1LqKlHpje+IX96YSh7aqMBNVuXUnK67ON8tbG5Uslnn5qnG5HaiA4f36K0pjN7g+rqFrlG1L2s7qychDegzjbGqReRW1tapksVznu2zjOS8Xh3MmgH7nNuu+bcfidIYxF7NQVHfmHEdTZ+VuAAQCJmHhk55Qy9wAAAABJRU5ErkJggg==" />
                                            </a>
                                        </p>
                                    </div> 
                    </div>

                    <nav>
                    <div className="tab-content" id="nav-tabContent">
  <div className="tab-pane fade show active" id="home_chart" role="tabpanel" aria-labelledby="home_chart_menu">
    <div id="cruncy-chart">
        <TradingViewWidget
        container_id="tradingview_b3e07"
            symbol={(tokenotherinfo.data.symbol ? tokenotherinfo.data.symbol : 'Tcake')}
            theme={Themes.DARK}
            locale="en"
            autosize /> 
    </div>
  </div>
  <div className="tab-pane fade" id="home_trade" role="tabpanel" aria-labelledby="home_trade_menu">
  <div className="pricing-table">
                            <Card>
                            {transfers.data ? 
                                    <DataTable
                                    columns={columns}
                                    data={(transfers.data ) ? transfers.data : []}
                                    defaultSortFieldId={1}
                                    sortIcon={<SortIcon />}
                                    pagination
                                    />
                            : <h5>There are not records to display.</h5>}
                                </Card>
                                </div>
  </div>
  <div className="tab-pane fade" id="home_promo" role="tabpanel" aria-labelledby="home_promo_menu">
<div className="promo_tab">
                                    <ul className="nav nav-tabs">
                                        <li>
                                            <a
                                                data-toggle="tab"
                                                href="#promoted"
                                            >
                                                promoted
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="active"
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
                                            className="tab-pane fade"
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
                                            className="tab-pane fade in active show"
                                        >
                                            {
                                            trends.data.length > 0 ? 
                                            trends.data.map((trend, index) =>
                                                <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    {
                                                        trend.baseCurrency.address ? 

                                                        <img
                                                        src={`https://pancakeswap.finance/images/tokens/${trend.baseCurrency.address}.png`}
                                                        onError={(e) => {
                                                        e.target.onError = null;
                                                        if (trend.baseCurrency.address.length >= 15) {
                                                            trend.baseCurrency.symbol === 'Tcake'
                                                            ? (e.target.src = process.env.PUBLIC_URL + '/images/logo-new.png')
                                                            : (e.target.src = process.env.PUBLIC_URL + '/images/Emoji_Icon_-_Thinking_large.webp');
                                                        }
                                                        }}
                                                        alt={trend.baseCurrency.symbol} className="trend-img"
                                                />
                                                        :
                                                        <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                    }
                                                    
                                                    
                                                </span>{' '}
                                                <span className="pro_title" title={trend.baseCurrency.name}>
                                                    {trend.baseCurrency.name}
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                <NumberFormat value={trend.tradeAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />

                                                </span>
                                            </li>
                                            ) : <h5>No Records Found.</h5>}

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

                                            { authenticated ? 
                                            (favourite[0] ? 
                                            favourite[0].data.map((fav, index) =>
                                                <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                </span>{' '}
                                                <span className="pro_title">
                                                    {fav.currencySymbol}
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                {fav.currencytoken.substr(0,32)+'...'}
                                                </span>
                                            </li>
                                            ) :  <h6>No Records.</h6> )
                                        : <div className="sise_title text-center"><span><a href="#" onClick={() => handleLoginShow()}>Login</a></span></div>
                                        }
                                        </div>
                                    </div>
                                </div>
  </div>
</div>
  <div className="nav nav-tabs chart_tab" id="nav-tab" role="tablist">
    <a className="nav-item nav-link active" id="home_chart_menu" data-toggle="tab" href="#home_chart" role="tab" aria-controls="home_chart" aria-selected="true">Chart</a>
    <a className="nav-item nav-link" id="home_trade_menu" data-toggle="tab" href="#home_trade" role="tab" aria-controls="nav-profile" aria-selected="false">Trades</a>
    <a className="nav-item nav-link" id="home_promo_menu" data-toggle="tab" href="#home_promo" role="tab" aria-controls="nav-contact" aria-selected="false">Prometed</a>
  </div>
</nav>

<div className="sidebar_div mobile_add">
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
</div>
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
                                            {(tokenotherinfo.data.images ? 
                                               
                                                <img
                                                alt="img-text"
                                                src={tokenotherinfo.data.images['16x16']}
                                            />
                                            
                                                : <img alt='img-text' src={process.env.PUBLIC_URL + '/images/logo-new.png'} />) }

                                            <b>
                                            {/* {(tokeninfo.data.symbol ? '' : 'ADA/')} */}
                                                <span>{(tokenotherinfo.data.symbol ? tokenotherinfo.data.symbol : (tcake.data.symbol ? tcake.data.symbol : 'Tcake'))}</span>
                                            </b>
                                        </a>
                                    </li>
                                </ul>
                                <ul className="nav">
                                    <li className="nav-item alert_icon">

                                             {(authenticated ? 
                                                (alertoken.length > 0 && alertoken[1].favorite == true ? 
                                                    <a className="nav-link" href="#" onClick={() => handleFavRemoveOpen()}>
                                                       <img className="heart-filled" src={process.env.PUBLIC_URL + "/images/heart.png"} />
                                                    </a> :
                                                    <a className="nav-link" href="#" onClick={() => handleClickOpen()}>
                                                        <i className="fas fa-heart" /> 
                                                    </a>
                                                )
                                                :
                                                (alertoken.length > 0 && alertoken[1].favorite == true? 
                                                    <a className="nav-link" href="#" onClick={() => handleLoginShow('heart')}> 
                                                       <img className="heart-filled" src={process.env.PUBLIC_URL + "/images/heart.png"} />
                                                    </a> :
                                                    <a className="nav-link" href="#" onClick={() => handleLoginShow('heart')}> 
                                                        <i className="fas fa-heart " />
                                                    </a>
                                                )
                                            )}
                                            
                                            
                                            {/* {(authenticated ? 
                                                (alert.length > 0 && alert[0].alert == true ? 
                                                    <a
                                                    className="nav-link"
                                                    href="#"
                                                    onClick={() => handleAlertRemoveOpen()}
                                                >  
                                                <img className="bell-filled" src={process.env.PUBLIC_URL + "/images/bell.png"} />
                                                </a> :
                                                <a
                                                className="nav-link"
                                                href="#"
                                                onClick={handleShow}
                                            >  <i className="fas fa-bell " />
                                            </a>
                                                )
                                                :
                                                (alert.length > 0 && alert[0].alert == true ? 
                                                    <a className="nav-link" href="#" onClick={handleLoginShow}> 
                                                        <img className="bell-filled" src={process.env.PUBLIC_URL + "/images/bell.png"} />
                                                    </a> :
                                                    <a className="nav-link" href="#" onClick={handleLoginShow}> 
                                                        <i className="fas fa-bell" />
                                                    </a>
                                                )
                                                
                                            )} */}
                                            {(authenticated ? 
                                                (alertoken.length > 0 && alertoken[1].alert == true? 
                                                    <a
                                                    className="nav-link"
                                                    href="#"
                                                    onClick={() => handleAlertRemoveOpen()}
                                                >  
                                                <img className="bell-filled" src={process.env.PUBLIC_URL + "/images/bell.png"} />
                                                </a> :
                                                <a
                                                className="nav-link"
                                                href="#"
                                                onClick={handleShow}
                                            >  <i className="fas fa-bell " />
                                            </a>
                                                )
                                                :
                                                (alertoken.length > 0 && alertoken[1].alert == true ? 
                                                    <a className="nav-link" href="#" onClick={() => handleLoginShow('alert')}> 
                                                        <img className="bell-filled" src={process.env.PUBLIC_URL + "/images/bell.png"} />
                                                    </a> :
                                                    <a className="nav-link" href="#" onClick={() => handleLoginShow('alert')}> 
                                                        <i className="fas fa-bell" />
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
                                                    {"Add "+(tokeninfo.data.symbol ? tokeninfo.data.symbol : 'BNB ')+ " To Favourites"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                    Are you sure you want to add it in your favourites?
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleDisagree} color="primary">
                                                    No
                                                    </Button>
                                                    <Button onClick={handleAgree} color="primary" autoFocus>
                                                    Yes
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
                                                    {"Remove "+(tokeninfo.data.symbol ? tokeninfo.data.symbol : 'BNB ')+ " from Favourites"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                    {"Are you sure you want to remove token address "+(tokeninfo.data.address ? tokeninfo.data.address.substr(0,30)+'...' : bnbToken.substr(0,30)+'...')+" from your favourites?"}
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleFavRemoveDisagree} color="primary">
                                                    No
                                                    </Button>
                                                    <Button onClick={handleFavRemoveAgree} color="primary" autoFocus>
                                                    Yes
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
                                                    {"Remove Alert For "+(tokeninfo.data.symbol ? tokeninfo.data.symbol: 'BNB')}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                    {"Are you sure you want to remove alert for token "+(tokeninfo.data.address ? tokeninfo.data.address.substr(0,30)+'...' : bnbToken.substr(0,30)+'...')+ "?"}
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleAlertRemoveDisagree} color="primary">
                                                    No
                                                    </Button>
                                                    <Button onClick={handleAlertRemoveAgree} color="primary" autoFocus>
                                                    Yes
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
                                            PRICE: {(tokenotherinfo.data.values ? 
                                               // tokenotherinfo[0].data.map((token, index) =>
                                                <NumberFormat value={tokenotherinfo.data.values.USD.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={5} />
                                            //)
                                                : tcake.data ? 
                                                <NumberFormat value={tcake.data.price} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={5} />
                                                 : <span>$2.4226</span>) }
                                                {/* <span>$2.4226</span> */}
                                        </h5>
                                        <p>PRICE 24h CHANGE: { tokenotherinfo.data.values ? 
                                                
                                                tokenotherinfo.data.values.USD.percentChange24h > 0 ? 
                                                    <span className="positive-number">+{tokenotherinfo.data.values.USD.percentChange24h}%</span> 
                                                    : 
                                                    <span className="negative-number">{tokenotherinfo.data.values.USD.percentChange24h}%</span>
                                                : <span>N/A</span> }
                                                {/* <span>+5%</span> */}
                                                </p>
                                    </div>
                                    <div className="copy">
                                        {/* 0x3ee2......435d47{' '} */}
                                        {(getAddress ? getAddress.substring(0, 18)+'... ' : '0x3ee2......435d47')}
                                        {(getAddress) ? 
                                        <CopyToClipboard text={getAddress}
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
                                            {tokenotherinfo.data.values ? 
                                               // tokenotherinfo[0].data.map((token, index) =>
                                                <NumberFormat value={tokenotherinfo.data.values.USD.marketCap} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />
                                            //)
                                                : <span>$399,578.08</span> }
                                            
                                        </p>
                                        <p>
                                            VOLUME 24H:{' '}
                                            {tokenotherinfo.data.values ? 
                                                //tokenotherinfo[0].data.map((token, index) =>
                                                <NumberFormat value={tokenotherinfo.data.values.USD.volume24h} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            
                                                : <span>N/A</span> }
                                            {/* <span>$4,832,839,159</span> */}
                                        </p>
                                        <p>
                                            TOTAL SUPPLY:{' '}
                                            {tokenotherinfo.data.totalSupply ? 
                                                //tokenotherinfo[0].data.map((token, index) =>
                                                <span className="number">{tokenotherinfo.data.totalSupply}</span>
                                            //)
                                                : <span> <NumberFormat value='178,499,565.878013' displayType={'text'} thousandSeparator={true} decimalScale={2} /></span> }
                                            {/* <span>33,117,618,880</span> */}
                                        </p>
                                        <p>
                                            LIQUIDITY: <span>N/A</span>
                                        </p>
                                    </div>
                                    <div className="pans">
                                        <p>
                                            PANCAKESWAP <a target="_blank" href={"https://pancakeswap.finance/swap#/swap?outputCurrency="+(getAddress ? getAddress : "0x3b831d36ed418e893f42d46ff308c326c239429f")}>TRADE</a>
                                        </p>
                                        <p className="tag_btn">
                                            <img
                                                alt="img-text"
                                                src={process.env.PUBLIC_URL + "/images/bscscan.png"}
                                            />{' '}
                                            BSC SCAN{' '}
                                            <div class="dropdown trade_sub">
                                                <a className="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">VIEW{' '} <i className="fas fa-angle-down"></i>
                                                                                        </a>
                                            
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item"  href={"https://bscscan.com/txs?a="+(getAddress ? getAddress : "0x3b831d36ed418e893f42d46ff308c326c239429f")} target="_blank">Transfers</a>
                                                <a className="dropdown-item"  href={"https://bscscan.com/token/tokenholderchart/"+(getAddress ? getAddress : "0x3b831d36ed418e893f42d46ff308c326c239429f")} target="_blank">Holders</a>
                                                <a className="dropdown-item" href={"https://bscscan.com/address/"+(getAddress ? getAddress : "0x3b831d36ed418e893f42d46ff308c326c239429f")} target="_blank" >Contracts</a>
                                            </div>
                                            </div>
                                            {/* <a href="https://bscscan.com/token/0x3b831d36ed418e893f42d46ff308c326c239429f">
                                                TRADE{' '}
                                                <i className="fas fa-angle-down"></i>
                                            </a> */}
                                        </p>
                                        <p>MEDIA</p>
                                        <p className="media_icon">
                                            
                                            <a href="https://twitter.com/tcake_official" target="_blank">
                                                <i className="fab fa-twitter" />
                                            </a>
                                            <a href="https://t.me/tcake_announcements" target="_blank">
                                                <i className="fab fa-telegram-plane" />
                                            </a>
                                            <a href="https://t.me/tcake_official" target="_blank">
                                                <i className="fas fa-users" />
                                            </a>
                                            <a href="mailto:info@tcake.io" target="_blank">
                                                <i className="far fa-envelope" />
                                            </a>
                                            <a href="https://bscscan.com/token/0x3b831d36ed418e893f42d46ff308c326c239429f" target="_blank">
                                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjU5QzI5QzE4NzMwMTFFQjkyQzBBMjgxQzc2REREQTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjU5QzI5QzI4NzMwMTFFQjkyQzBBMjgxQzc2REREQTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpGNTlDMjlCRjg3MzAxMUVCOTJDMEEyODFDNzZERERBNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpGNTlDMjlDMDg3MzAxMUVCOTJDMEEyODFDNzZERERBNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhQBhOUAAANNSURBVHjaVJPLa1xVHMc/99x7596ZydyZZJKYpG2oNOLYltgiqLHVRQldiM2ilQhKRQQJqCv/CNfiyoULcWVKhYhuuogLSxGlD00bDcaMjybpmJnJZO487+scT1IFvXA4cDm/7+/3+z6s6s33+d9nGBdRcl7GcgZhDWKInjDtFWTnK5TxEal0oOo7qJ0KWDbWf0oPgfpUJdE5M3ME0/FQQQuRSudk3J+VoTtLVH0XkgUUX/9bJP65R/T5Vnc7p+IOhgrxHjnD0PHXyBWfQdU3kEkLw52cQsXLEM8jlZ72AMDYn/sLfY6gFMItEjR+pvXnNf3Lprn6GXHi64ehrmtjWGMYheFFMu4LRAmWjDtzMvRndHeszBi6FTJskqg9gs1bRP37iOExZL+rAVuongsDRdSAuSS6wYQQ9sDC4MkFckcvkPRr7AMVjr+JIQ0aax+TnXoRFUW4o0/iDJ0iPXKCwtE5vBOXB6Wt3hGFJ944pZo+2eHncIem0YBkxp/H8UqI/CjZw7M42WNkimeQ9W28qXmS7TWi7Z/2CZ63hOXlO/ev0a4sY/RjnMfOIps1jFjzoUy9jk/u0Yvsff8hkd3SIkh6jTvETqApSh0TKvT9VLFE0F4jFFVsZ5TWxhJmdkTbwHt4Z3LENBDpLJgCTwOmU1qQqO1YZnZ0p1/9cTz/+KuYtvaNlSY9eRYrdwizcY+wsQ5BgDf9Oq3yEmg+dm9/QCK62GahI2TYve1pvd1sCVn7CyOS+CuLJJ0aTqHEvlTNX69qY41ojk7rlVoMzrxHYfot/WZvxWjdvToYNstlFQcFafW01mnyXlXvO0m3qbQ1EkaLIX2Zw2+EWGkT09Qy+ruE9bWXRRhsNvrte3OJl2B4BVL5gOW7adbLDxg5HDM8FvLJl1vcWf0dTwNFVpde5Qa9P67fNMzU5yJRTZzx09dFT71CoPUuTlCrNelGKW7cqvLLbwETEwM4+QJkhhD1LqKlHpje+IX96YSh7aqMBNVuXUnK67ON8tbG5Uslnn5qnG5HaiA4f36K0pjN7g+rqFrlG1L2s7qychDegzjbGqReRW1tapksVznu2zjOS8Xh3MmgH7nNuu+bcfidIYxF7NQVHfmHEdTZ+VuAAQCJmHhk55Qy9wAAAABJRU5ErkJggg==" />
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
                                    container_id="tradingview_b3e06"
                                    symbol={(tokenotherinfo.data.symbol ? tokenotherinfo.data.symbol : 'Tcake')}
                                    theme={Themes.DARK}
                                    locale="en"
                                    autosize
                                /> 

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8 col-xl-8 mb-12 mb-xl-0 pricing-table">
                            <Card>
                            {transfers.data ? 
                                    <DataTable
                                    columns={columns}
                                    data={(transfers.data ) ? transfers.data : []}
                                    defaultSortFieldId={1}
                                    sortIcon={<SortIcon />}
                                    pagination
                                    />
                            : <h5>There are not records to display.</h5>}
                                </Card>
                                
                            </div>
                            <div className="col-4 col-xl-4 mb-12 mb-xl-0">
                                <div className="promo_tab">
                                    <ul className="nav nav-tabs">
                                        <li>
                                            <a
                                                
                                                data-toggle="tab"
                                                href="#promoted1"
                                            >
                                                promoted
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="active"
                                                data-toggle="tab"
                                                href="#trending1"
                                            >
                                                Trending
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                data-toggle="tab"
                                                href="#listing1"
                                            >
                                                New Listings 2
                                            </a>
                                        </li>
                                        <li>
                                            <a data-toggle="tab" href="#fav1">
                                                Favourite
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div
                                            id="promoted1"
                                            className="tab-pane fade"
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
                                            id="trending1"
                                            className="tab-pane fade in active show"
                                        >
                                            {
                                            trends.data.length > 0 ? 
                                            trends.data.map((trend, index) =>
                                                <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    {
                                                        trend.baseCurrency.address ? 
                                                        <img
                                                        src={`https://pancakeswap.finance/images/tokens/${trend.baseCurrency.address}.png`}
                                                        onError={(e) => {
                                                        e.target.onError = null;
                                                        if (trend.baseCurrency.address.length >= 15) {
                                                            trend.baseCurrency.symbol === 'Tcake'
                                                            ? (e.target.src = process.env.PUBLIC_URL + '/images/logo-new.png')
                                                            : (e.target.src = process.env.PUBLIC_URL + '/images/Emoji_Icon_-_Thinking_large.webp');
                                                        }
                                                        }}
                                                        alt={trend.baseCurrency.symbol} className="trend-img"
                                                />
                                                        :
                                                        <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                    }
                                                    
                                                    
                                                </span>{' '}
                                                <span className="pro_title" title={trend.baseCurrency.name}>
                                                    {trend.baseCurrency.name}
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                <NumberFormat value={trend.tradeAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} decimalScale={2} />

                                                </span>
                                            </li>
                                            ) : <h5>No Records Found.</h5>}

                                        </div>
                                        <div
                                            id="listing1"
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
                                        <div id="fav1" className="tab-pane fade">

                                            { authenticated ? 
                                            (favourite[0] ? 
                                            favourite[0].data.map((fav, index) =>
                                                <li>
                                                <span className="pro_check">
                                                    {' '}
                                                    <img
                                                        alt="img-text"
                                                        src={process.env.PUBLIC_URL + "/images/check.png"}
                                                    />
                                                </span>{' '}
                                                <span className="pro_title">
                                                    {fav.currencySymbol}
                                                </span>{' '}
                                                |{' '}
                                                <span className="pro_price">
                                                {fav.currencytoken.substr(0,32)+'...'}
                                                </span>
                                            </li>
                                            ) :  <h6>No Records.</h6> )
                                        : <div className="sise_title text-center"><span><a href="#" onClick={() => handleLoginShow()}>Login</a></span></div>
                                        }
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
                                <h4>Set up an alarm For {(tokeninfo.data.symbol ? '('+tokeninfo.data.symbol+')' : '(BNB)'  )}</h4>
                                <h5>{(tokeninfo.data.address ? tokeninfo.data.address : '')}</h5>
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
