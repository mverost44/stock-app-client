import React, { Fragment } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom'

const AccountDropdown = () => (
  <Fragment>
    <DropdownButton id="dropdown-basic-button" title="Account">
      <Dropdown.Item><Link to="/sign-out">Sign Out</Link></Dropdown.Item>
      <Dropdown.Item><Link to="/change-password">Change Password</Link></Dropdown.Item>
    </DropdownButton>
  </Fragment>
)

export default AccountDropdown
