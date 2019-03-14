import React, { Component } from 'react'
// eslint-disable-next-line
import { CanvasJS, CanvasJSChart } from './canvasjs.react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

class Chart extends Component {
  constructor () {
    super()
    this.state = {
      dataPoints: [],
      ticker_symbol: ''
    }
  }

handleSubmit = event => {
  event.preventDefault()
  this.setState({ dataPoints: [] })

  const chart = this.chart
  const stockUrl = `https://cloud.iexapis.com/beta/stock/${this.state.ticker_symbol}/chart/1d?token=pk_1d307534ff3144d485a0da8430713ead`

  fetch(stockUrl)
    .then(function (response) {
      return response.json()
    })
    .then(data => {
      for (let i = 0; i < data.length; i++) {
        this.state.dataPoints.push({
          label: data[i].minute,
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
      name: this.state.ticker_symbol,
      showInLegend: true,
      yValueFormatString: '$##0.00',
      dataPoints: this.state.dataPoints
    }]
  }

  return (
    <div>
      <Form.Label>Symbol</Form.Label>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Symbol"
          name="ticker_symbol"
          onChange={this.handleChange}
        />
        <InputGroup.Append>
          <Button onClick={this.handleSubmit} variant="outline-secondary">Search</Button>
        </InputGroup.Append>
      </InputGroup>
      <CanvasJSChart options = {options} onRef = {
        // eslint-disable-next-line
        ref => this.chart = ref}
      />
    </div>
  )
}
}

export default Chart
