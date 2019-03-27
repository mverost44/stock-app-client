import React from 'react'
import { Link } from 'react-router-dom'
import AccountDropdown from './../layout/AccountDropdown'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <AccountDropdown />
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link className="mr-3" to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
    <div className="navbar-brand col-sm-3 col-md-4 mr-0" to='/dashboard'><span className="lead">TradeStation</span></div>
    { user && <span className="text-white">Welcome, {user.email}</span> }
    { user ? authenticatedOptions : unauthenticatedOptions }
  </nav>
)

export default Header
