import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../api'
import messages from '../messages'

class SignOut extends Component {
  componentDidMount () {
    const { alert, history, clearUser, user } = this.props

    signOut(user)
      .finally(() => alert(messages.signOutSuccess, 'success'))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
