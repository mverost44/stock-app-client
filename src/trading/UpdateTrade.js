import React, { Component, Fragment } from 'react'

import UpdateForm from './UpdateForm'
import { updateTrade } from './api'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router'
import ClosedTrades from './ClosedTrades'

class UpdateTrade extends Component {
  constructor (props) {
    super(props)

    this.state = {
      symbol: this.props.location.state,
      id: this.props.location.id,
      exitPrice: null,
      maxSize: this.props.location.entrySize,
      size: '',
      action: 'Sell',
      company: '',
      shouldRedirect: false,
      spinner: false,
      accountBalance: this.props.location.accountBalance
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    // eslint-disable-next-line
    const { exitPrice, size, id, accountBalance } = this.state
    const { user } = this.props

    if ((!size || !exitPrice) || size * exitPrice > accountBalance) {
      return ''
    } else {
      updateTrade(user, exitPrice, size, id)
        .then(() => this.setState({ size: '', exitPrice: null }))
        .then(() => this.setState({ shouldRedirect: true }))
        .catch(console.error, this.setState({ size: '', exitPrice: null }))
    }
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value.replace(/\+|-/, '') }
    this.setState(updatedField)
  }

  confirmSymbol = event => {
    event.preventDefault()
    const stockUrl = `https://cloud.iexapis.com/beta/stock/${this.state.symbol}/quote?token=pk_1d307534ff3144d485a0da8430713ead`

    fetch(stockUrl)
      .then(response => response.json())
      .then(data => this.setState({ exitPrice: data.latestPrice, company: data.companyName }))
      .catch(console.error)
  }

  render () {
    if (this.state.shouldRedirect) {
      return <Redirect to={{ pathname: '/dashboard/closed-trades' }} />
    }

    const { symbol, company, exitPrice, size, maxSize, accountBalance } = this.state

    const balance = (
      <Fragment>
        <nav className="navbar navbar-dark bg-dark sticky-top py-3 justify-content-center flex-md-nowrap">
          <span className="pr-3 text-white">Account Balance: <span className="pl-3 text-success">${accountBalance}</span></span>
        </nav>
      </Fragment>
    )

    return (
      <Fragment>
        {balance}
        <UpdateForm
          symbol={symbol}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          confirmSymbol={this.confirmSymbol}
          company={company}
          exitPrice={exitPrice}
          size={size}
          maxSize={maxSize}
          accountBalance={accountBalance}
        />
        <ClosedTrades user={this.props.user} />
      </Fragment>
    )
  }
}

export default withRouter(UpdateTrade)
