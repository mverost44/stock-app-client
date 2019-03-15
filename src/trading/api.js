import axios from 'axios'
import apiConfig from './../apiConfig'

// eslint-disable-next-line
export const createTrade = (user, ticker_symbol, entry_price, entry_size) => {
  return axios({
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
export const updateTrade = (user, exit_price, exit_size, id) => {
  return axios({
    method: 'patch',
    url: `${apiConfig}/trades/${id}`,
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

export const deleteATrade = (id, user) => {
  return axios({
    url: `${apiConfig}/trades/${id}`,
    method: 'delete',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const getClosedTrades = (user) => {
  return axios({
    url: apiConfig + '/closed-trades',
    method: 'get',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
