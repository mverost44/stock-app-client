import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../api'
import messages from '../messages'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      spinner: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()
    this.setState({ spinner: true })

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(this.setState({ spinner: false }))
      .then(() => history.push('/dashboard'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', spinner: false })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password, spinner } = this.state

    const spin = (
      <div className="spinner-grow text-success ml-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )

    return (
      <form className='auth-form' onSubmit={this.onSignIn}>
        <h3>Sign In {spinner ? spin : ''}</h3>
        <label htmlFor="email">Email</label>
        <input
          required
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={this.handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          name="password"
          value={password}
          type="password"
          placeholder="Password"
          onChange={this.handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    )
  }
}

export default withRouter(SignIn)
