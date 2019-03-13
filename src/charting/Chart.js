import React, { Component } from 'react'
// eslint-disable-next-line
import { CanvasJS, CanvasJSChart } from './canvasjs.react'

class Chart extends Component {
  constructor () {
    super()

    this.state = {
      dataPoints: []
    }
  }

  componentDidMount () {
    setInterval(this.updateChart, 1500)
  }

  updateChart () {
    const chart = this.chart

    fetch('https://cloud.iexapis.com/beta/tops?token=pk_1d307534ff3144d485a0da8430713ead&symbols=aapl')
      .then(function (response) {
        return response.json()
      })
      .then(function (data) {
        console.log(data[0].bidPrice)
        console.log(data[0].lastSalePrice)
        console.log(data)
        this.state.dataPoints.push({
          label: data[0].lastUpdated,
          y: data[0].lastSalePrice
        })
        chart.render()
      })
  }

  render () {
    const options = {
      animationEnabled: true,
      zoomEnabled: true,
      title: {
        text: 'AAPL - March 2019 2019'
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
        type: 'line',
        name: 'Microsoft Corporation Price',
        showInLegend: true,
        yValueFormatString: '$##0.00',
        dataPoints: this.state.dataPoints
      }]
    }

    return (
      <div>
        <CanvasJSChart options = {options}
          // eslint-disable-next-line
          onRef={ref => this.chart = ref}
        />
      </div>
    )
  }
}

// data[i].high,
// data[i].low,
// data[i].close

export default Chart
