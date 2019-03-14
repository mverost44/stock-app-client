import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import apiConfig from './../apiConfig'
import axios from 'axios'

class OpenTrades extends Component {
  constructor (props) {
    super(props)

    this.state = {
      openTrades: []
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.trades !== prevProps.trades) {
      this.setState({ openTrades: [...this.state.openTrades, this.props.trades] })
    }
  }

  componentDidMount () {
    const { user } = this.props
    axios({
      url: apiConfig + '/trades',
      method: 'get',
      headers: {
        'Authorization': `Token token=${user.token}`
      }
    })
      .then(response => this.setState({ openTrades: response.data.trades }))
      .catch(console.error)
  }

  // handleSubmit = event => {
  //   event.preventDefault()

  //   // eslint-disable-next-line
  //   const { ticker_symbol, entry_price, entry_size } = this.state
  //   const { user } = this.props

  // closeTrade(user)
  //   .then(response => this.setState({ trade: response.data.trade.id }))
  //   .catch(console.error)
  // }

  // handleChange = event => {
  //   const updatedField = { [event.target.name]: event.target.value }
  //   this.setState(updatedField)
  // }
  //
  // confirmSymbol = event => {
  //   event.preventDefault()
  //   const stockUrl = `https://cloud.iexapis.com/beta/stock/${this.state.ticker_symbol}/quote?token=pk_1d307534ff3144d485a0da8430713ead`
  //
  //   fetch(stockUrl)
  //     .then(function (response) {
  //       return response.json()
  //     })
  //     .then(data => this.setState({ entry_price: data.latestPrice }))
  //     .catch(console.error)
  // }

  render () {
    const { openTrades } = this.state
    return (
      <div>
        {openTrades.map(trade => (
          <Fragment key={trade.id}>
            <div className="card mx-2 mt-3">
              <div className="card-header">Open Trade</div>
              <div className="card-body">
                <p className="lead">{trade.ticker_symbol}</p>
                <p className="card-text">Entry Price {trade.entry_price}</p>
                <p className="card-text">Share Size {trade.entry_size}</p>
              </div>
              <div className="card-footer">
                <Link to='/dashboard/update-trade' ><button className="btn btn-primary">Trade</button></Link>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    )
  }
}

export default OpenTrades
