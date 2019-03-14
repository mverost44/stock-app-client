import React, { Component, Fragment } from 'react'
import TradeForm from './TradeForm'
import OpenTrades from './OpenTrades'
import { createTrade } from './api'

class MakeTrade extends Component {
  constructor (props) {
    super(props)

    this.state = {
      ticker_symbol: '',
      entry_price: null,
      size: '',
      open: '',
      action: 'Buy'
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    // eslint-disable-next-line
    const { ticker_symbol, entry_price, size } = this.state
    const { user } = this.props

    createTrade(user, ticker_symbol, entry_price, size)
      .then(response => <OpenTrades user={this.props.user} trades={response.trade}/>)
      .catch(console.error)
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState(updatedField)
  }

  confirmSymbol = event => {
    event.preventDefault()
    const stockUrl = `https://cloud.iexapis.com/beta/stock/${this.state.ticker_symbol}/quote?token=pk_1d307534ff3144d485a0da8430713ead`

    fetch(stockUrl)
      .then(function (response) {
        return response.json()
      })
      .then(data => this.setState({ entry_price: data.latestPrice }))
      .catch(console.error)
  }

  render () {
    return (
      <Fragment>
        <TradeForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          confirmSymbol={this.confirmSymbol}
        />
        <OpenTrades user={this.props.user}/>
      </Fragment>
    )
  }
}

export default MakeTrade
