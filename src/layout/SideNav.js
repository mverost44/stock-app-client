import React, { Fragment } from 'react'
import TradeStation from './../trading/TradeStation'

const SideNav = ({ user }) => (
  <Fragment>
    <nav className="col-md-4 d-none d-md-block bg-light sidebar">
      <div className="sidebar-sticky">
        <TradeStation user={user}/>
      </div>
    </nav>
  </Fragment>
)

export default SideNav
