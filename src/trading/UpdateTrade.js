import React, { Component, Fragment } from 'react'
import UpdateForm from './UpdateForm'
import { deleteATrade, updateTrade, getClosedTrades } from './api'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import ClosedTrades from './ClosedTrades'

class UpdateTrade extends Component {
  constructor (props) {
    super(props)

    this.state = {
      symbol: this.props.location.state,
      id: this.props.location.id,
      exit_price: '',
      size: '',
      action: 'Sell',
      closedTrades: [],
      shouldRedirect: false
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    // eslint-disable-next-line
    const { exit_price, size, id } = this.state
    const { user } = this.props

    updateTrade(user, exit_price, size, id)
      .then(response => this.setState({ closedTrades: [response.data.trade, ...this.state.closedTrades] }))
      .then(this.setState({ size: '' }))
      .catch(console.error)
  }
  // .then(response => <OpenTrades user={this.props.user} trades={response.data.trade}/>)

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState(updatedField)
  }

  confirmSymbol = event => {
    event.preventDefault()
    const stockUrl = `https://cloud.iexapis.com/beta/stock/${this.state.symbol}/quote?token=pk_1d307534ff3144d485a0da8430713ead`

    fetch(stockUrl)
      .then(function (response) {
        return response.json()
      })
      .then(data => this.setState({ exit_price: data.latestPrice }))
      .catch(console.error)
  }

  deleteTrade = (id) => {
    const { user } = this.props
    deleteATrade(id, user)
      .then(response => getClosedTrades(user))
      .then(response => this.setState({ closedTrades: response.data.trades }))
      .catch(() => this.setState({ shouldRedirect: true }))
  }

  componentDidMount () {
    const { user } = this.props
    getClosedTrades(user)
      .then(response => this.setState({ closedTrades: response.data.trades }))
      .catch(console.error)
  }

  render () {
    if (this.state.shouldRedirect) {
      return <Redirect to='/dashboard' />
    }

    return (
      <Fragment>
        <UpdateForm
          symbol={this.state.symbol}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          confirmSymbol={this.confirmSymbol}
        />
        {this.state.closedTrades.map(trade => (
          <ClosedTrades
            key={trade.id}
            id={trade.id}
            symbol={trade.ticker_symbol}
            entryPrice={trade.entry_price}
            exitPrice={trade.exit_price}
            profitLoss={trade.total_profit_loss}
            deleteTrade={this.deleteTrade}
          />
        ))}
      </Fragment>
    )
  }
}

export default withRouter(UpdateTrade)
