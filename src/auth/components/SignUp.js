import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../api'
import messages from '../messages'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      spinner: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()
    this.setState({ spinner: true })

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(this.setState({ spinner: false }))
      .then(() => history.push('/dashboard'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '', spinner: false })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { email, password, passwordConfirmation, spinner } = this.state

    const spin = (
      <div className="spinner-grow text-success ml-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )

    return (
      <form className='auth-form' onSubmit={this.onSignUp}>
        <h3>Sign Up {spinner ? spin : ''}</h3>

        <label htmlFor="email">Email</label>
        <input
          required
          name="email"
          value={email}
          type="email"
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
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          required
          name="passwordConfirmation"
          value={passwordConfirmation}
          type="password"
          placeholder="Confirm Password"
          onChange={this.handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    )
  }
}

export default withRouter(SignUp)
