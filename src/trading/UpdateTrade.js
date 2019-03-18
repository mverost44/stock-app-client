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
      spinner: false
    }
  }

  handleSubmit = event => {
    event.preventDefault()

    // eslint-disable-next-line
    const { exitPrice, size, id } = this.state
    const { user } = this.props

    if (!size || !exitPrice) {
      return ''
    } else {
      updateTrade(user, exitPrice, size, id)
        .then(response => this.setState({ updatedTrade: response.trade }))
        .then(() => this.setState({ size: '', exitPrice: null }))
        .then(() => this.setState({ shouldRedirect: true }))
        .catch(console.error, this.setState({ size: '', exitPrice: null }))
    }
  }

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
      .then(data => this.setState({ exitPrice: data.latestPrice, company: data.companyName }))
      .catch(console.error)
  }

  render () {
    if (this.state.shouldRedirect) {
      return <Redirect to={{ pathname: '/dashboard/closed-trades', props: { updated: true } }} />
    }

    return (
      <Fragment>
        <UpdateForm
          symbol={this.state.symbol}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          confirmSymbol={this.confirmSymbol}
          company={this.state.company}
          exitPrice={this.state.exitPrice}
          size={this.state.size}
          maxSize={this.state.maxSize}
        />
        <ClosedTrades user={this.props.user} />
      </Fragment>
    )
  }
}

export default withRouter(UpdateTrade)
