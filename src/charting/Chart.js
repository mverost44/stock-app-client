import React, { Component, Fragment } from 'react'
// eslint-disable-next-line
import { CanvasJS, CanvasJSChart } from './canvasjs.react'

import Form, { Col } from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './chart.scss'

class Chart extends Component {
  constructor () {
    super()
    this.state = {
      dataPoints: [],
      tickerSymbol: '',
      timeFrame: ''
    }
  }

handleSubmit = event => {
  const { tickerSymbol, timeFrame } = this.state
  event.preventDefault()
  this.setState({ dataPoints: [] })

  const chart = this.chart
  const stockUrl = `https://cloud.iexapis.com/beta/stock/${tickerSymbol}/chart/${timeFrame}?token=pk_1d307534ff3144d485a0da8430713ead`

  fetch(stockUrl)
    .then(function (response) {
      return response.json()
    })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        this.state.dataPoints.push({
          label: data[i].minute || data[i].label,
          y: [
            data[i].open,
            data[i].high,
            data[i].low,
            data[i].close
          ]
        })
      }
      chart.render()
    })
}

handleChange = event => {
  const updatedField = { [event.target.name]: event.target.value }
  this.setState(updatedField)
}

// componentDidMount () {
//   const chart = this.chart

//   fetch('https://cloud.iexapis.com/beta/stock/spy/chart/1d?token=pk_1d307534ff3144d485a0da8430713ead')
//     .then(function (response) {
//       return response.json()
//     })
//     .then(data => {
//       for (let i = 0; i < data.length; i++) {
//         console.log(data[i].label)
//         console.log(data[i].open)
//         this.state.dataPoints.push({
//           label: data[i].minute,
//           y: [
//             data[i].open,
//             data[i].high,
//             data[i].low,
//             data[i].close
//           ]
//         })
//       }
//       chart.render()
//     })
// }

render () {
  const options = {
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: this.props.title
    },
    axisX: {
      title: 'Time'
    },
    axisY: {
      title: 'Price',
      includeZero: false,
      prefix: '$'
    },
    data: [{
      type: 'candlestick',
      name: this.state.tickerSymbol,
      showInLegend: true,
      yValueFormatString: '$##0.00',
      dataPoints: this.state.dataPoints
    }]
  }

  return (
    <Fragment>
      <Form.Row className="mb-3 ml-5">
        <Form.Group as={Col}>
          <Form.Label>Search Stocks</Form.Label>
          <Form.Control
            placeholder="Symbol"
            name="tickerSymbol"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Time Frame</Form.Label>
          <Form.Control onChange={this.handleChange} name="timeFrame" as="select" required>
            <option>ytd</option>
            <option>5y</option>
            <option>2y</option>
            <option>1y</option>
            <option>6m</option>
            <option>3m</option>
            <option>1m</option>
            <option>1d</option>
          </Form.Control>
        </Form.Group>
        <Form.Group as={Col} className="align-self-end">
          <Button onClick={this.handleSubmit} className="chart-btn" variant="outline-secondary">Search</Button>
        </Form.Group>
      </Form.Row>

      <CanvasJSChart
        options={options}
        // eslint-disable-next-line
        onRef={ref => this.chart = ref}
      />
    </Fragment>
  )
}
}

export default Chart
