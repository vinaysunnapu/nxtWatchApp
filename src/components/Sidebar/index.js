import {Link} from 'react-router-dom'
import './index.css'
import {AiFillHome, AiTwotoneSave} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import NxtWatchContext from '../../context/nxtWatchContext'

const Sidebar = () => (
  <NxtWatchContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      const sidebarBgColorClassName = isDarkTheme
        ? 'sidebar-bg-dark'
        : 'sidebar-bg-light'

      const subContentColorClassName = isDarkTheme
        ? 'sub-content-dark'
        : 'sub-content-light'

      const contactUsClassName = isDarkTheme
        ? 'contact-color-dark'
        : 'contact-color-light'

      return (
        <div className={`sidebar-container ${sidebarBgColorClassName}`}>
          <div className="contents-container">
            <Link to="/home">
              <div
                className={`sub-content-container ${subContentColorClassName}`}
              >
                <AiFillHome />
                <p className="sub-content-heading">Home</p>
              </div>
            </Link>
            <Link to="/trending">
              <div
                className={`sub-content-container ${subContentColorClassName}`}
              >
                <HiFire />
                <p className="sub-content-heading">Trending</p>
              </div>
            </Link>
            <Link to="/gaming">
              <div
                className={`sub-content-container ${subContentColorClassName}`}
              >
                <SiYoutubegaming />
                <p className="sub-content-heading">Gaming</p>
              </div>
            </Link>
            <Link to="/saved">
              <div
                className={`sub-content-container ${subContentColorClassName}`}
              >
                <AiTwotoneSave />
                <p className="sub-content-heading">Saved videos</p>
              </div>
            </Link>
          </div>
          <div className={`contact-section-container ${contactUsClassName}`}>
            <h1 className="contact-us-heading">CONTACT US</h1>
            <div className="contact-icons-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="contact-logo-image"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="contact-logo-image"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="contact-logo-image"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      )
    }}
  </NxtWatchContext.Consumer>
)

export default Sidebar
