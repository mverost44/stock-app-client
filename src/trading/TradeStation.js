import React, { Component, Fragment } from 'react'
import MakeTrade from './MakeTrade'
import UpdateTrade from './UpdateTrade'
import ClosedTrades from './ClosedTrades'
import { Route } from 'react-router-dom'

class TradeStation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      trade: {
        ticker_symbol: '',
        entry_price: '',
        exit_price: '',
        entry_size: '',
        exit_size: '',
        open: ''
      }
    }
  }

  render () {
    return (
      <Fragment>
        <Route exact path='/dashboard' render={() => <MakeTrade user={this.props.user} />}/>
        <Route exact path='/dashboard/update-trade' render={() => <UpdateTrade user={this.props.user} />}/>
        <Route exact path='/dashboard/closed-trades' render={() => <ClosedTrades user={this.props.user} />}/>

      </Fragment>
    )
  }
}

export default TradeStation
