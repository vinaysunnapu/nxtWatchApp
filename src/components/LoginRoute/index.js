import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import {Button, ErrorMessage} from './styledComponents'

class LoginRoute extends Component {
  state = {
    isDarkTheme: false,
    errorMsg: '',
    username: '',
    password: '',
    showSubmitError: false,
    showPassword: false,
  }

  onSubmitSuccess = jwtToken => {
    console.log(jwtToken)
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {
      isDarkTheme,
      username,
      password,
      showSubmitError,
      showPassword,
      errorMsg,
    } = this.state

    const loginBgColorClassName = isDarkTheme
      ? 'login-bg-dark'
      : 'login-bg-light'

    const loginContainerBgClassName = isDarkTheme
      ? 'login-container-bg-dark'
      : 'login-container-bg-light'

    const NxtWatchLogoImageUrl = !isDarkTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

    const labelColorClassName = isDarkTheme
      ? 'label-light-color'
      : 'label-dark-color'

    const passwordType = showPassword ? 'text' : 'password'

    return (
      <div className={`login-background-container ${loginBgColorClassName}`}>
        <div className={`login-container ${loginContainerBgClassName}`}>
          <img
            src={NxtWatchLogoImageUrl}
            alt="website logo"
            className="website-logo-login-image"
          />
          <from className="login-form-container">
            <div>
              <label
                htmlFor="usernameId"
                className={`label-heading ${labelColorClassName}`}
              >
                USERNAME
              </label>
              <br />
              <input
                type="text"
                placeholder="Username"
                id="usernameId"
                className="login-input-element"
                value={username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div>
              <label
                htmlFor="passwordId"
                className={`label-heading ${labelColorClassName}`}
              >
                PASSWORD
              </label>
              <br />
              <input
                type={passwordType}
                placeholder="Password"
                id="passwordId"
                className="login-input-element"
                value={password}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="show-password-container">
              <input
                type="checkbox"
                id="login-checkbox"
                onClick={this.onClickShowPassword}
              />
              <label
                htmlFor="login-checkbox"
                className={`login-show-password ${labelColorClassName}`}
              >
                Show Password
              </label>
            </div>
            <Button type="submit" onClick={this.submitForm}>
              Login
            </Button>
            {showSubmitError && <ErrorMessage>{errorMsg}</ErrorMessage>}
          </from>
        </div>
      </div>
    )
  }
}

export default LoginRoute
