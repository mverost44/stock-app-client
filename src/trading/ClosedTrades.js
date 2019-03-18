import React, { Fragment, Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { getClosedTrades, deleteATrade } from './api'

class ClosedTrades extends Component {
  constructor () {
    super()
    this.state = {
      closedTrades: [],
      spinner: false
    }
  }

  deleteTrade = (id) => {
    const { user } = this.props
    this.setState({ spinner: true })

    deleteATrade(id, user)
      .then(response => getClosedTrades(user))
      .then(response => this.setState({ closedTrades: response.data.trades }))
      .then(this.setState({ spinner: false }))
      .catch(() => this.setState({ spinner: false }))
  }

  componentDidMount () {
    const { user } = this.props
    this.setState({ spinner: true })

    getClosedTrades(user)
      .then(response => this.setState({ closedTrades: response.data.trades }))
      .then(this.setState({ spinner: false }))
      .catch(console.error, this.setState({ spinner: false }))
  }

  render () {
    const { deleteTrade } = this
    const { spinner, closedTrades } = this.state

    // if (this.props.location.updated) {
    //   getClosedTrades(this.props.user)
    //   .then(response => this.setState({ closedTrades: response.data.trades }))
    //   .then(this.setState({ updated: false }))
    //   .catch(console.error)
    // }

    const tradeHeading = (
      <Fragment>
        <hr className="mx-4 mt-2"/>
        <div className="mt-3 mx-3 d-flex justify-content-between">
          <span className="display h2">Closed Trades</span>
          <Link className="align-self-center" to='/dashboard'>
            See Open Trades
          </Link>
        </div>
      </Fragment>
    )

    const spin = (
      <div className="spinner-grow text-success ml-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )

    const noTrades = (
      <div className="mt-3 mx-3">
        <p className="lead">You don&apos;t have any closed trades</p>
      </div>
    )

    if (closedTrades.length < 1) {
      return (
        <Fragment>
          {spinner ? spin : tradeHeading}
          {noTrades}
        </Fragment>
      )
    }

    return (
      <Fragment>
        {spinner ? spin : tradeHeading}
        {closedTrades.map(trade => (
          <div className="card mx-2 mt-3" key={trade.id}>
            <div className="card-header">Total Profit/Loss: <span className="lead">{trade.total_profit_loss}</span></div>
            <div className="card-body">
              <p className="lead">{trade.ticker_symbol}</p>
              <p className="card-text">Entry Price: {trade.entry_price}</p>
              <p className="card-text">Exit Price: {trade.exit_price}</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-primary" onClick={() => deleteTrade(trade.id)}>Delete</button>
            </div>
          </div>
        ))}
      </Fragment>
    )
  }
}

export default withRouter(ClosedTrades)
