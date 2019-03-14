import React, { Component, Fragment } from 'react'
import TradeForm from './UpdateForm'
import ClosedTrades from './ClosedTrades'
import { updateTrade } from './api'

class UpdateTrade extends Component {
  constructor (props) {
    super(props)

    this.state = {
      exit_price: null,
      size: '',
      open: '',
      action: 'Sell'
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    // eslint-disable-next-line
    const { ticker_symbol, exit_price, exit_size } = this.state
    const { user } = this.props

    updateTrade(user, ticker_symbol, exit_price, exit_size)
      .then(response => <ClosedTrades user={this.props.user} trades={response.trade}/>)
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
      .then(data => this.setState({ exit_price: data.latestPrice }))
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
        <ClosedTrades user={this.props.user}/>
      </Fragment>
    )
  }
}

export default UpdateTrade
