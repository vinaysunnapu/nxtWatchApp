import './index.css'
import {GrFormClose} from 'react-icons/gr'
import {BannerContainer, BannerSection} from './styledComponents'

const Banner = props => {
  const {isDarkTheme, onRemoveBanner} = props
  const bannerLogoUrl =
    'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

  const onClickRemoveBanner = () => {
    onRemoveBanner()
  }

  return (
    <BannerContainer data-testid="banner">
      <BannerSection data-testid="banner">
        <img src={bannerLogoUrl} alt="nxt watch logo" className="banner-logo" />
        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
        <button type="button" className="get-it-now-button">
          GET IT NOW
        </button>
      </BannerSection>
      <button
        type="button"
        className="banner-close-button"
        onClick={onClickRemoveBanner}
        data-testid="close"
      >
        <GrFormClose size="30px" />
      </button>
    </BannerContainer>
  )
}
export default Banner
