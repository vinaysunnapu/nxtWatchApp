import {Link, withRouter} from 'react-router-dom'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'

import './index.css'
import Cookies from 'js-cookie'

import NxtWatchContext from '../../context/nxtWatchContext'

const Header = props => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value

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

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <div className={`header-container ${headerBgColorClassName}`}>
          <div className="header-content">
            <Link to="/">
              <img
                src={nxtWatchLogoImageUrl}
                alt="website logo"
                className="header-logo-image"
              />
            </Link>
            <div className="logout-container">
              <button
                type="button"
                className="header-theme-button"
                data-testid="theme"
              >
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
              <div className="pop-up-container">
                <Popup
                  modal
                  trigger={
                    <button
                      type="button"
                      className={`logout-button ${logoutButtonClassName}`}
                    >
                      Logout
                    </button>
                  }
                  className="popup-content"
                >
                  {close => (
                    <>
                      <div>
                        <p className="popup-contents">
                          Are you sure, you want to logout?
                        </p>
                      </div>
                      <div>
                        <button
                          type="button"
                          className="cancel-button"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="confirm-button"
                          onClick={onClickLogout}
                        >
                          Confirm
                        </button>
                      </div>
                    </>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)
export default withRouter(Header)
