## TradeStation

TradeStation is a full stack web application that allows users to simulate stock trades (paper trade) by providing accurate stock prices and charts via a 3rd party API.  TradeStation saves user transactions and calculates a total profit/loss value when a trade is fully or partially closed.  Because all open and closed trades are recorded in a Rails API, users can easily test strategies and track results.

## TradeStation Client

The TradeStation client is responsible for rendering stock charts and trade information. Utilizing the trading station in the left sidebar, users can view open and closed trades, create and update trades, and delete trades that have been closed. The tradeStation client makes api requests to IEX in order to render stock charts and to grab a realtime price on a trade submission.

## Technologies Used

-React -JavaScript -axios -Bootstrap -Canvas.js -IEX Cloud (3rd party API)

## Planning & Process

The first step I took to build this client was creating a basic dashboard layout where the chart and trading apparatus would live.  Then I added a form using bootstrap to be used for creating and updating trades. Creating a fully functional form took the most time due to consistent testing and a dependency on a third party API response.  Once the form was functional, I added a chart by following the steps in the Canvas.js documentation. I handled issues by searching google, documentations, issue queues, and talking to other developers.

## Future Considerations

As TradeStation is further developed I will add multiple time frames in the chart, mobile friendly responsiveness, company information/news, and a realtime chart option.

## Deployed Sites

Client: https://mverost44.github.io/stock-app-client/

API: https://lit-reef-77205.herokuapp.com/

## Link to wireframe and User Stories

Wireframe: https://imgur.com/Bnpzif6

1. A user should be able to place trade with a specific size, trade type, and stock Symbol
2. A user should be able to view their open and closed trades
3. A user should be able to delete trades that have been completed

## Repos

API: https://github.com/mverost44/stock-app-api

Client: https://github.com/mverost44/stock-app-client

## Setup & Installation

1. Fork and Clone this repository
2. Run `npm install`
3. Change the homepage url in paackage.json to your project name
4. You can use `npm start` to view on localhost!

[Imgur](https://i.imgur.com/T44SqwJ.png)
