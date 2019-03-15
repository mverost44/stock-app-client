import React, { Fragment, Component } from 'react'
// import { Link } from 'react-router-dom'

class ClosedTrades extends Component {
  constructor (props) {
    super(props)
    this.state = {
      symbol: this.props.symbol,
      id: this.props.id,
      entryPrice: this.props.entryPrice,
      exitPrice: this.props.exitPrice,
      profitLoss: this.props.profitLoss
    }
  }
  render () {
    const { profitLoss, entryPrice, exitPrice, symbol, id } = this.state
    const { deleteTrade } = this.props
    return (
      <Fragment>
        <div className="card mx-2 mt-3">
          <div className="card-header">Total Profit/Loss: <span className="lead">{profitLoss}</span></div>
          <div className="card-body">
            <p className="lead">{symbol}</p>
            <p className="card-text">Entry Price: {entryPrice}</p>
            <p className="card-text">Exit Price: {exitPrice}</p>
          </div>
          <div className="card-footer">
            <button className="btn btn-primary" onClick={() => deleteTrade(id)}>Delete</button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default ClosedTrades
