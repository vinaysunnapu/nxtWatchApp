import './index.css'
import Cookies from 'js-cookie'

import NxtWatchContext from '../../context/nxtWatchContext'

const Header = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const nxtWatchLogoImageUrl = !isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

      const themeImageURL = isDarkTheme
        ? 'https://assets.ccbp.in/frontend/react-js/light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/dark-theme-img.png'

      const logoutButtonClassName = isDarkTheme
        ? 'logout-dark-color'
        : 'logout-light-color'

      const headerBgColorClassName = isDarkTheme
        ? 'header-bg-dark'
        : 'header-bg-light'

      return (
        <div className={`header-container ${headerBgColorClassName}`}>
          <div className="header-content">
            <img
              src={nxtWatchLogoImageUrl}
              alt="website logo"
              className="header-logo-image"
            />
            <div className="logout-container">
              <button type="button" className="header-theme-button">
                <img
                  src={themeImageURL}
                  alt="theme"
                  className="header-theme-image"
                />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="header-profile-image"
              />
              <button
                type="button"
                className={`logout-button ${logoutButtonClassName}`}
                onClick={onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)
export default Header
