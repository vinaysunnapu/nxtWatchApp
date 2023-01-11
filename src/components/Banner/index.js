import './index.css'
import {GrFormClose} from 'react-icons/gr'

const Banner = props => {
  const {isDarkTheme} = props
  const bannerLogoUrl =
    'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  return (
    <div className="banner-container">
      <div className="banner-section">
        <img src={bannerLogoUrl} alt="nxt watch logo" className="banner-logo" />
        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
        <button type="button" className="get-it-now-button">
          GET IT NOW
        </button>
      </div>
      <button type="button" className="banner-close-button">
        <GrFormClose size="30px" />
      </button>
    </div>
  )
}
export default Banner
