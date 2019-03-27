import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import TradeForm from './TradeForm'
import OpenTrades from './OpenTrades'
import { createTrade } from './api'
import axios from 'axios'
import apiConfig from './../apiConfig'

class MakeTrade extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tickerSymbol: '',
      entryPrice: null,
      size: 1,
      action: 'Buy',
      company: null,
      openTrades: [],
      spinner: false,
      isBuy: true,
      accountBalance: ''
    }
  }

  // Runs when Trade button is clicked
  handleSubmit = event => {
    event.preventDefault()

    const { tickerSymbol, entryPrice, size, accountBalance } = this.state
    const { user } = this.props

    // Verify if form has been completely filled.
    if ((!size || !entryPrice) || (size * entryPrice > accountBalance)) {
      return ''
    } else {
      // POST a trade, Show new trade + open trades, and clear form.
      createTrade(user, tickerSymbol, entryPrice, size)
        .then(response => this.setState({ openTrades: [response.data, ...this.state.openTrades], accountBalance: response.data.account_balance }))
        .then(this.setState({ size: '', tickerSymbol: '', company: null, entryPrice: null }))
        .catch(console.error)
    }
  }

  // Set state to value of input field being changed
  // .replace(/\+|-/, '')
  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState(updatedField)
  }

  // Toggle positive/negative size when state of action is changed
  // Toggle min/max attribute values of the size input to appropriately reflect the state of action
  handleActionChange = event => {
    const { size, isBuy } = this.state
    this.handleChange(event)

    this.setState(function () {
      return {
        size: -size,
        isBuy: !isBuy
      }
    })
  }

  // GET current stock price from IEX API. Necessary to create a trade.
  confirmSymbol = event => {
    event.preventDefault()
    const stockUrl = `https://cloud.iexapis.com/beta/stock/${this.state.tickerSymbol}/quote?token=pk_1d307534ff3144d485a0da8430713ead`

    fetch(stockUrl)
      .then(function (response) {
        return response.json()
      })
      .then(data => this.setState({ entryPrice: data.latestPrice, company: data.companyName }))
      .catch(console.error)
  }

  // GET current users open trades on page load
  componentDidMount () {
    const { user } = this.props
    // initiate spinner while waiting for response from API
    this.setState({ spinner: true })

    return axios({
      url: apiConfig + '/trades',
      method: 'get',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(response => this.setState({ openTrades: response.data.trades, accountBalance: response.data.account_balance }))
      .then(this.setState({ spinner: false }))
      .catch(console.error, this.setState({ spinner: false }))
  }

  render () {
    const { openTrades, size, tickerSymbol, company, entryPrice, spinner, isBuy, accountBalance } = this.state

    // Loading Spinner
    const spin = (
      <div className="spinner-grow text-success ml-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
    // Heading describes open or closed trades below
    const tradeHeading = (
      <Fragment>
        <hr className="mx-4 mt-2"/>
        <div className="mt-3 mx-3 d-flex justify-content-between">
          <span className="display h2">Open Trades</span>
          <Link className="align-self-center" to='/dashboard/closed-trades'>
            See Closed Trades
          </Link>
        </div>
      </Fragment>
    )
    // Message if there are no current open trades
    const noTrades = (
      <div className="mt-3 mx-3">
        <p className="lead">You don&apos;t have any open trades</p>
      </div>
    )
    // List of open trades
    const tradeList = (
      <Fragment>
        {openTrades.map(trade => (
          <OpenTrades
            key={Math.random()}
            id={trade.id}
            symbol={trade.ticker_symbol}
            entryPrice={trade.entry_price}
            entrySize={trade.entry_size}
            accountBalance={accountBalance}
          />
        ))}
      </Fragment>
    )

    const tradeForm = (
      <Fragment>
        <TradeForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          confirmSymbol={this.confirmSymbol}
          handleActionChange={this.handleActionChange}
          shareSize={size}
          symbol={tickerSymbol}
          companyName={company}
          entryPrice={entryPrice}
          isBuy={isBuy}
          accountBalance={accountBalance}
        />
      </Fragment>
    )

    const balance = (
      <Fragment>
        <nav className="navbar navbar-dark bg-dark sticky-top py-3 justify-content-center flex-md-nowrap">
          <span className="pr-3 text-white">Account Balance: <span className="pl-3 text-success">${accountBalance}</span></span>
        </nav>
      </Fragment>
    )

    // Renders Trade Form and no trade message if there are no open trades. Displays spinner while waiting for API response
    if (openTrades.length < 1) {
      return (
        <Fragment>
          {balance}
          {tradeForm}
          {spinner ? spin : tradeHeading}
          {noTrades}
        </Fragment>
      )
    }

    // Renders Trade Form and determines whether to show spinner or trade heading and open trade list
    return (
      <Fragment>
        {balance}
        {tradeForm}
        {spinner ? spin : tradeHeading}
        {tradeList}
      </Fragment>
    )
  }
}

export default MakeTrade
