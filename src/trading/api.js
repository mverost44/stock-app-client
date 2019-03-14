import axios from 'axios'
import apiConfig from './../apiConfig'

// eslint-disable-next-line
export const createTrade = (user, ticker_symbol, entry_price, entry_size) => {
  axios({
    method: 'post',
    url: `${apiConfig}/trades`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      trade: {
        ticker_symbol: ticker_symbol,
        entry_price: entry_price,
        entry_size: entry_size
      }
    }
  })
}

// eslint-disable-next-line
export const updateTrade = (user, symbol, exit_price, exit_size,) => {
  axios({
    method: 'patch',
    url: `${apiConfig}/trades/${symbol}`,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      trade: {
        exit_price: exit_price,
        exit_size: exit_size
      }
    }
  })
}
