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
import useAuth from 'app/hooks/useAuth'

const Header = ({ dispatch }) => {
  const { logout, user } = useAuth();
  const { isAuthenticated } = useAuth();
  let authenticated = isAuthenticated


    return (

            <div className="common-header-wrapper">
  
           
    
            <nav className="navbar navbar-expand-lg header">
 <div className="container">
               <div className="row"> <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
    <span className="navbar-toggler-icon"></span>
    <span className="navbar-toggler-icon"></span>
  </button>  <div className="col-md-3 col-sm-12">
   <a className="navbar-brand" href="#"><img src={process.env.PUBLIC_URL + '/images/logo-new.png'} alt="LOGO" /></a>
 
</div>
<div className="col-md-9 col-sm-12">
  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">

          
      <li className="nav-item active">
        <a className="nav-link" href="/home">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/about-us">About Us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/contact-us">Contact Us</a>
      </li>
      {(authenticated ? 
      <li className="nav-item dropdown user_profile">
            <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">{user.firstname.substr(0,1).toUpperCase()} {user.lastname.substr(0,1).toUpperCase()}</a>
         <div className="dropdown-menu sub_menu">
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={logout}>Logout</a>
            </li>
          </div>
           </li>


         
         :
         <li className="nav-item">
          <a className="nav-link" href="/session/signin">Login</a>
          </li>

      )}
      
      {/*
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>*/}
    </ul>
  </div>
            </div>
            </div>
            </div>
</nav>
            </div>
    )
}

export default connect()(Header)
