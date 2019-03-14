import React, { Fragment, Component } from 'react'
import SideNav from './SideNav'
import Chart from './../charting/Chart'
// import { Route } from 'react-router-dom'

import './Dashboard.scss'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      // code
    }
  }

  render () {
    return (
      <Fragment>
        <SideNav user={this.props.user} />
        <div className="container-fluid">
          <div className="row">
            <main role="main" className="col-md-9 ml-sm-auto col-lg-8 px-4">

              <div className="my-4 w-100" id="dashFeed" width="900" height="380">
                <Chart />
              </div>
            </main>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Dashboard
