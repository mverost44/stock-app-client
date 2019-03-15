import React, { Fragment, Component } from 'react'
import { Link } from 'react-router-dom'

class OpenTrades extends Component {
  constructor (props) {
    super(props)
    this.state = {
      symbol: this.props.symbol,
      id: this.props.id,
      entryPrice: this.props.entryPrice,
      entrySize: this.props.entrySize
    }
  }
  render () {
    const { entryPrice, entrySize, symbol, id } = this.state
    return (
      <Fragment>
        <div className="card mx-2 mt-3">
          <div className="card-header">Open Trade</div>
          <div className="card-body">
            <p className="lead">{symbol}</p>
            <p className="card-text">Entry Price {entryPrice}</p>
            <p className="card-text">Share Size {entrySize}</p>
          </div>
          <div className="card-footer">
            <Link to={{ pathname: '/dashboard/update-trade', state: symbol, id }}><button className="btn btn-primary">Trade</button></Link>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default OpenTrades
